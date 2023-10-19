import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TelegramBotService {

  private apiUrl = `https://api.telegram.org/bot6695797280:AAHT98unTAJrlffGdc97l01diWtmE-j5LOY/sendMessage`; // Reemplaza 'TU_TOKEN_DEL_BOT' con el token real de tu bot

  constructor(private http: HttpClient) { }

  sendMessage(chatId: string, message: string): void {
    const url = `${this.apiUrl}?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    this.http.get(url).subscribe(
      response => {
        console.log('Mensaje enviado:', response);
      },
      error => {
        console.error('Error al enviar el mensaje:', error);
      }
    );
  }
}
