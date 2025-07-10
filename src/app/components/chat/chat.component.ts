import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AiService } from '../../services/ai.service';

export interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  messages = signal<Message[]>([]);
  currentMessage = signal('');
  isLoading = signal(false);

  constructor(private aiService: AiService) {}

  async sendMessage() {
    const message = this.currentMessage().trim();
    if (!message || this.isLoading()) return;

    // Add user message
    this.messages.update((msgs) => [
      ...msgs,
      {
        text: message,
        isUser: true,
        timestamp: new Date(),
      },
    ]);

    this.currentMessage.set('');
    this.isLoading.set(true);

    try {
      // Get AI response
      const response = await this.aiService.generateResponse(message);

      // Add AI response
      this.messages.update((msgs) => [
        ...msgs,
        {
          text: response,
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      // Add error message
      this.messages.update((msgs) => [
        ...msgs,
        {
          text: 'სამწუხაროდ პასუხის მიღება ვერ მოხერხდა. თავიდან სცადეთ.',
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      this.isLoading.set(false);
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
