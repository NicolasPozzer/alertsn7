import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertaTicket } from '../model/alerta-ticket';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private URL = 'https://api.wazirx.com/sapi/v1/tickers/24hr';

  constructor(private httpClient: HttpClient) { }



  public getData(): Observable<AlertaTicket[]> {
    return this.httpClient.get<AlertaTicket[]>(this.URL);
  }
  
}




