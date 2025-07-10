import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    // API key from environment
    const apiKey = 'AIzaSyCY_-AlkICTyi-ihkZ5hT4JSwYDgOczjns';
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('AI Error:', error);
      throw new Error('AI-სთან კავშირის პრობლემა');
    }
  }
}
