import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertaTicket } from 'src/app/model/alerta-ticket';
import { Ticket } from 'src/app/model/ticket';
import { ApiService } from 'src/app/services/api.service';
import { TiketServiceService } from 'src/app/services/tiket-service.service';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-tabla-logica',
  templateUrl: './tabla-logica.component.html',
  styleUrls: ['./tabla-logica.component.css']
})
export class TablaLogicaComponent implements OnInit {

  listaAlertas: Ticket[] = [];
  lista: AlertaTicket[] = [];
  liveApi: string = '';
  liveBack: string = '';
  alerta1: string = '';
  alerta2: string = '';

  constructor(private sApiService: ApiService, private sTicketService: TiketServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getTickets();
    setTimeout(() => {
      this.getData();
      }, 36000);

    // Obtener datos cada minuto
    interval(600000).pipe(startWith(0))
      .subscribe(data => {
        this.getTickets();
        console.log('Esto es un Refresh de la lista CADA 10 MINUTOS!');
      });
  }

  /*=======================TraerTickets==========================*/
  getTickets(): void {
    this.sTicketService.getTickets().subscribe(data => {
      this.listaAlertas = data;
      this.liveBack = 'live-back'
      console.log('live-back!');
    });
  }

  getData(): void {
    this.sApiService.getData().subscribe(data => {
        this.lista = data;
        this.liveApi = 'nice';
        console.log('data lista!!');
    });
  }
  
  /*Refrescar lista despues de 1hora
  setTimeout(() => {
    window.location.reload();
    }, 1800000);  */

  /*=======================BorrarTicket==========================*/
  deleteTicket(id?: number) {
    if (id != undefined) {
      this.sTicketService.deleteTicket(id).subscribe(
        data => {
        }, err => {
          alert("Alerta Eliminada.");
          this.getTickets();
        }
      )
    }
  }

}

