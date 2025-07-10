export interface AdventurePlanRequest {
  adventureType: string;
  location: string;
  timeFrame: string;
  userPreferences?: string;
  weatherInfo?: string;
}

export interface FollowUpRequest {
  originalAdventure: string;
  location: string;
  followUpQuestion: string;
  weatherInfo?: string;
}

export interface AIResponse {
  response: string;
}

export interface ErrorResponse {
  error: string;
  details?: string;
}
