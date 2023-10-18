import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../model/ticket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiketServiceService {

  private URL = 'http://localhost:8080/tickets';

  constructor(private httpClient: HttpClient) { }



  public getTickets(): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(this.URL +'/list');
  }

  public findTicket(id: number): Observable<Ticket>{
    return this.httpClient.get<Ticket>(this.URL + `/unticket/${id}`);
  } 

  public saveTicket(tic: Ticket): Observable<any>{
    return this.httpClient.post<any>(this.URL + '/crear', tic);
  }

  public editTicket(id: number, tic: Ticket): Observable<any>{
    return this.httpClient.put<any>(this.URL + `/edit/${id}`, tic);
  }

  public deleteTicket(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.URL + `/borrar/${id}`);
  }
  
}
