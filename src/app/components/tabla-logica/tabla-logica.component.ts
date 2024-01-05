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
  alertSound: any;
  liveApi: string = '';
  alerta1: string = '';
  alerta2: string = '';

  constructor(private sApiService: ApiService, private sTicketService: TiketServiceService, private router: Router) { }

  ngOnInit(): void {
    this.alertSound = new Audio('./assets/alert/alert.mp3');
    this.getTickets();


    // Obtener datos cada minuto
    interval(12000).pipe(startWith(0), switchMap(() => this.sApiService.getData()))
      .subscribe(data => {
        // Lógica para verificar si el precio supera ciertos valores y emitir alertas
        this.listaAlertas.forEach(alerta => {

          const dato = data.find(item => item.baseAsset === alerta.nombre);

          if (dato) {

            this.liveApi = dato.baseAsset;

            /*=======================================================*/
            /*=======================ENCIMA==========================*/
            /*=======================================================*/

            if (alerta.encendido === true && alerta.direccion === 'Encima' && dato.lastPrice > alerta.precioEstablecido) {
              const symbolEnMayuscula = dato.baseAsset.toUpperCase(); // Convierte dato.symbol a mayúsculas

              this.alerta1 = `🔔 Alerta para |${symbolEnMayuscula}| ¡El Precio Supero los: 🔼 $${alerta.precioEstablecido}  `;

              console.log(`🔔 Alerta para |${symbolEnMayuscula}| ¡El Precio Supero los: 🔼 $${alerta.precioEstablecido}  `);
              alerta.encendido = false;
              alerta.color = 'table-secondary';
              this.alertSound.play();


              setTimeout(() => {
                window.location.reload();
              }, 15000); // 15000 milisegundos = 15 segundos

              /*=======================================================*/
              /*=======================DEBAJO==========================*/
              /*=======================================================*/

            } else if (alerta.encendido === true && alerta.direccion === 'Debajo' && dato.lastPrice < alerta.precioEstablecido) {
              const symbolEnMayuscula = dato.baseAsset.toUpperCase(); // Convierte dato.symbol a mayúsculas

              this.alerta2 = `🔔 Alerta para |${symbolEnMayuscula}| ¡Precio cayó 🔽 por debajo de $${alerta.precioEstablecido}  `;

              alerta.encendido = false;
              alerta.color = 'table-secondary';
              this.alertSound.play();

              // Esperar 15 segundos y luego recargar la página
              setTimeout(() => {
                window.location.reload();
              }, 15000); // 15000 milisegundos = 15 segundos

            }
            
          }
        })
        this.getTickets();
      });
  }

  /*=======================TraerTickets==========================*/
  getTickets(): void {
    this.sTicketService.getTickets().subscribe(data => {
      this.listaAlertas = data;
    });
  }

  getData(): void {
    this.sApiService.getData().subscribe(data => {
      this.lista = data;
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

