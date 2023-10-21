import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertaTicket } from 'src/app/model/alerta-ticket';
import { Ticket } from 'src/app/model/ticket';
import { ApiService } from 'src/app/services/api.service';
import { TiketServiceService } from 'src/app/services/tiket-service.service';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { TelegramBotService } from 'src/app/services/telegram-bot.service';

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

  constructor(private sApiService: ApiService, private sTicketService: TiketServiceService, private router: Router,
    private botService: TelegramBotService) {}

  ngOnInit(): void {
    this.alertSound = new Audio('./assets/alert/alert.mp3');
    this.getTickets();

    // Obtener datos cada minuto
    interval(30000) // 60000 milisegundos = 1 minuto
      .pipe(
        startWith(0), // Emite el primer valor inmediatamente
        switchMap(() => this.sApiService.getData()), // Cambiar al resultado de la API cada minuto
      )
      .subscribe(data => {
        // Lógica para verificar si el precio supera ciertos valores y emitir alertas
        this.listaAlertas.forEach(alerta => {
          const dato = data.find(item => item.symbol === alerta.nombre);

          if (dato) {
            
            this.liveApi = dato.symbol;

                /*=======================================================*/
                /*=======================ENCIMA==========================*/
                /*=======================================================*/

            if (alerta.encendido === true && alerta.direccion === 'Encima' && dato.current_price > alerta.precioEstablecido) {
              const symbolEnMayuscula = dato.symbol.toUpperCase(); // Convierte dato.symbol a mayúsculas

              console.log(`🔔 Alerta para |${symbolEnMayuscula}| ¡El Precio Supero los: 🔼 $${alerta.precioEstablecido}  `);
              alerta.encendido = false;
              alerta.color = 'table-secondary';
              this.alertSound.play();
              
              /*Codigo Bot Telegram*/
              const chatId = '1603260238'; 
              const mensaje = `🔔 Alerta para |${symbolEnMayuscula}| ¡El Precio Supero los: 🔼 $${alerta.precioEstablecido}  `;
              this.botService.sendMessage(chatId, mensaje);
              /*Codigo Bot Telegram*/


              setTimeout(() => {
                window.location.reload();
                }, 15000); // 15000 milisegundos = 15 segundos

                this.sTicketService.saveTicket(alerta).subscribe(
                data => {}
              )


                /*=======================================================*/
                /*=======================DEBAJO==========================*/
                /*=======================================================*/

            } else if (alerta.encendido === true && alerta.direccion === 'Debajo' && dato.current_price < alerta.precioEstablecido) {
              const symbolEnMayuscula = dato.symbol.toUpperCase(); // Convierte dato.symbol a mayúsculas

              console.log(`🔔 Alerta para |${symbolEnMayuscula}| ¡Precio cayó 🔽 por debajo de $${alerta.precioEstablecido}  `);
              alerta.encendido = false;
              alerta.color = 'table-secondary';
              this.alertSound.play();
              
              /*Codigo Bot Telegram*/
              const chatId = '1603260238'; 
              const mensaje = `🔔 Alerta para |${symbolEnMayuscula}| ¡Precio cayó 🔽 por debajo de $${alerta.precioEstablecido}  `;
              this.botService.sendMessage(chatId, mensaje);
              /*Codigo Bot Telegram*/

              // Esperar 15 segundos y luego recargar la página
                setTimeout(() => {
                window.location.reload();
                }, 15000); // 15000 milisegundos = 15 segundos

                this.sTicketService.saveTicket(alerta).subscribe(
                data => {}
              )
            }

          }

        });
      });
  }

  /*=======================TraerTickets==========================*/
  getTickets(): void {
    this.sTicketService.getTickets().subscribe(data => {
      this.listaAlertas = data;
    });

    //Refrescar lista despues de 1hora
    setTimeout(() => {
      window.location.reload();
      }, 1800000);
  }

  /*=======================BorrarTicket==========================*/
  deleteTicket(id?: number) {
    if (id != undefined) {
      this.sTicketService.deleteTicket(id).subscribe(
        data => {
          this.getTickets();
        }
      )
    }
  }

}

