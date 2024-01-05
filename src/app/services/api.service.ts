import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertaTicket } from '../model/alerta-ticket';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';

  constructor(private httpClient: HttpClient) { }



  public getData(): Observable<AlertaTicket[]> {
    return this.httpClient.get<AlertaTicket[]>(this.URL);
  }
  
}




