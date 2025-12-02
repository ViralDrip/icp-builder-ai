import { GoogleGenAI, Chat, FunctionDeclaration, Type, Tool } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { getErrorMessage } from "../utils/errorHandler";

// Define the tool for updating the ICP
const updateICPFunctionDeclaration: FunctionDeclaration = {
  name: "updateICP",
  description: "Updates the Ideal Customer Profile (ICP) with new or refined information gathered from the conversation.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      role: { type: Type.STRING, description: "The job title or role of the target persona (e.g., CTO, VP of Sales)." },
      industry: { type: Type.STRING, description: "The target industry or vertical." },
      companySize: { type: Type.STRING, description: "Size of the target company (e.g., 50-200 employees, Enterprise)." },
      geography: { type: Type.STRING, description: "Target geographic location." },
      painPoints: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of problems or pains the customer faces." },
      goals: { type: Type.ARRAY, items: { type: Type.STRING }, description: "What the customer wants to achieve." },
      objections: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Reasons why they might say no." },
      purchaseTriggers: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Events that cause them to look for a solution." },
      techStack: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Tools or software they likely use." },
    },
  },
};

const tools: Tool[] = [{ functionDeclarations: [updateICPFunctionDeclaration] }];

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

// Timeout wrapper for promises
const withTimeout = <T,>(promise: Promise<T>, timeoutMs: number): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('TimeoutError')), timeoutMs)
    )
  ]);
};

export const initializeChat = (userApiKey: string, history?: any[]) => {
  if (!userApiKey) {
    throw new Error("API key is required to initialize chat");
  }

  genAI = new GoogleGenAI({ apiKey: userApiKey });

  // Convert chat messages to Content format for history
  const formattedHistory = history?.slice(1).map(msg => ({
    role: msg.role === 'model' ? 'model' : 'user',
    parts: [{ text: msg.text }]
  }));

  chatSession = genAI.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: tools,
    },
    history: formattedHistory || [],
  });
};

export const sendMessageToGemini = async (
  message: string,
  onToolCall: (args: any) => void
): Promise<string> => {
  if (!chatSession) {
    throw new Error("Chat session not initialized. Please refresh the page and try again.");
  }

  try {
    // Wrap the entire conversation flow with timeout (30 seconds)
    const conversationPromise = (async () => {
      let response = await chatSession!.sendMessage({
        message: message
      });

      // Loop to handle potential multiple tool calls or subsequent text generation
      // The library handles the history, but we need to intercept tool calls to update our React state
      // and then send the result back to the model.
      let iterations = 0;
      const MAX_ITERATIONS = 10; // Prevent infinite loops

      while (
        response.candidates?.[0]?.content?.parts?.some(p => p.functionCall) &&
        iterations < MAX_ITERATIONS
      ) {
        const functionCallPart = response.candidates[0].content.parts.find(p => p.functionCall);

        if (functionCallPart && functionCallPart.functionCall) {
          const { name, args, id } = functionCallPart.functionCall;

          if (name === 'updateICP') {
            // Execute the side effect in React
            onToolCall(args);

            // Send response back to model
            // We just say "success" so the model knows it worked and can continue chatting
            // For function responses, we need to pass message with the function response part
            response = await chatSession!.sendMessage({
              message: [{
                functionResponse: {
                  name: name,
                  id: id,
                  response: { result: "ICP Updated successfully." }
                }
              }]
            });
          }
        }

        iterations++;
      }

      // After tool handling loop, return the final text
      return response.text || "Got it! What else would you like to add?";
    })();

    return await withTimeout(conversationPromise, 30000); // 30 second timeout

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    console.error("Error details:", {
      message: error.message,
      status: error.status,
      name: error.name,
      stack: error.stack
    });
    const userFriendlyMessage = getErrorMessage(error);
    throw new Error(userFriendlyMessage);
  }
};
