import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private apiUrl = '/api/chat';

  constructor(private http: HttpClient) {}

  async generateResponse(prompt: string): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.http.post<{ response: string }>(this.apiUrl, { prompt })
      );

      return response.response || '';
    } catch (error) {
      console.error('AI Error:', error);
      throw new Error('AI-სთან კავშირის პრობლემა');
    }
  }
}
