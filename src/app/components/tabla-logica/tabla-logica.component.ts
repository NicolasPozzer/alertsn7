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

  constructor(private sApiService: ApiService, private sTicketService: TiketServiceService, private router: Router) {  
    
  }

  ngOnInit(): void {
    this.alertSound = new Audio('./assets/alert/alert.mp3');
    
    this.getTickets();

    // Obtener datos cada minuto
    interval(60000) // 60000 milisegundos = 1 minuto
      .pipe(
        startWith(0), // Emite el primer valor inmediatamente
        switchMap(() => this.sApiService.getData()) // Cambiar al resultado de la API cada minuto
      )
      .subscribe(data => {
        // Lógica para verificar si el precio supera ciertos valores y emitir alertas
        this.listaAlertas.forEach(alerta => {
          const dato = data.find(item => item.symbol === alerta.nombre);

          if (dato) {
            console.log(alerta.nombre);
            console.log(dato.current_price);
            console.log('precio establecido: ', alerta.precioEstablecido);
            console.log('Direccion: ', alerta.direccion);

            if (alerta.encendido === true && alerta.direccion === 'Encima' && dato.current_price > alerta.precioEstablecido) {
              console.log(`Alerta para ${dato.symbol}: ¡Precio superó ${alerta.precioEstablecido}!`);
              alerta.encendido = false;
              alerta.color = 'table-secondary';
                //Sonar Alerta
                this.alertSound.play();
              this.sTicketService.saveTicket(alerta).subscribe(
                data => {
                }, err => {
                  alert(`Alerta para ${dato.symbol}: ¡Precio superó ${alerta.precioEstablecido}!`);
                  window.location.reload();
                }
              )
            } else if (alerta.encendido === true && alerta.direccion === 'Debajo' && dato.current_price < alerta.precioEstablecido) {
              console.log(`Alerta para ${dato.symbol}: ¡Precio cayó por debajo de ${alerta.precioEstablecido}!`);
              alerta.encendido = false;
              alerta.color = 'table-secondary';
              this.alertSound.play();
              this.sTicketService.saveTicket(alerta).subscribe(
                
                data => {
                }, err => {
                  alert(`Alerta para ${dato.symbol}: ¡Precio cayó por debajo de ${alerta.precioEstablecido}!`);
                  window.location.reload();
                }
              )
            }
          }

        });
      });


  }

  getTickets(): void {
    this.sTicketService.getTickets().subscribe(data => {
      this.listaAlertas = data;
    });
  }

  deleteTicket(id?: number){
    if(id != undefined){
      this.sTicketService.deleteTicket(id).subscribe(
        data => {
          this.getTickets();
        }
      )
    }
  }

}
