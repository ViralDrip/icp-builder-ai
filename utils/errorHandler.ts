export enum GeminiErrorType {
  NETWORK = 'NETWORK',
  AUTH = 'AUTH',
  RATE_LIMIT = 'RATE_LIMIT',
  TIMEOUT = 'TIMEOUT',
  UNKNOWN = 'UNKNOWN'
}

export const errorMessages: Record<GeminiErrorType, string> = {
  [GeminiErrorType.NETWORK]: "Connection issue. Check your internet and try again.",
  [GeminiErrorType.AUTH]: "Authentication failed. Please refresh the page.",
  [GeminiErrorType.RATE_LIMIT]: "Too many requests. Please wait a moment and try again.",
  [GeminiErrorType.TIMEOUT]: "Request took too long. Please try again.",
  [GeminiErrorType.UNKNOWN]: "Something went wrong. Please try again."
};

export const classifyError = (error: any): GeminiErrorType => {
  // Network errors
  if (error.message?.includes('fetch') || error.message?.includes('network') || error.message?.includes('Failed to fetch')) {
    return GeminiErrorType.NETWORK;
  }

  // Authentication errors
  if (error.status === 401 || error.status === 403) {
    return GeminiErrorType.AUTH;
  }

  // Rate limiting
  if (error.status === 429) {
    return GeminiErrorType.RATE_LIMIT;
  }

  // Timeout
  if (error.name === 'TimeoutError' || error.message?.includes('timeout')) {
    return GeminiErrorType.TIMEOUT;
  }

  return GeminiErrorType.UNKNOWN;
};

export const getErrorMessage = (error: any): string => {
  const errorType = classifyError(error);
  return errorMessages[errorType];
};
