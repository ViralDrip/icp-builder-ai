export interface ICPData {
  role: string;
  industry: string;
  companySize: string;
  geography: string;
  painPoints: string[];
  goals: string[];
  objections: string[];
  purchaseTriggers: string[];
  techStack: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export enum TabView {
  CHAT = 'CHAT',
  ICP = 'ICP'
}
