import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertaTicket } from 'src/app/model/alerta-ticket';
import { Ticket } from 'src/app/model/ticket';
import { ApiService } from 'src/app/services/api.service';
import { TiketServiceService } from 'src/app/services/tiket-service.service';


@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  lista: AlertaTicket[] = [];
  listaAlertas: Ticket[] = [];

  selectedOption: string = ''; // Propiedad para almacenar la opción seleccionada
  nombre: string = '';
  precioEstablecido: number = 0;
  direccion: string = '';
  encendido: boolean = true;
  color: string = 'table-primary';

  constructor(private sApiService: ApiService, private sTicketService: TiketServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getData();
    
    
  }

  getData(): void {
    this.sApiService.getData().subscribe(data => {

      //-----------CON FILTRO DE ACTIVOS------------------
      // IDs de los elementos que deseas obtener
      /*const idsDeseados = ['bitcoin', 'binancecoin', 'ripple']; 

      // Filtra los objetos por sus IDs
      this.lista = data.filter(item => idsDeseados.includes(item.id));*/


      
      //-----------SIN FILTRO DE ACTIVOS------------------
      this.lista = data;
    });
  }

  getTickets(): void {
    this.sTicketService.getTickets().subscribe(data => {
      this.listaAlertas = data;
    });
  }


  onCreate(): void {

    console.log("Nombre: ", this.selectedOption);
    console.log("Precio Establecido: ", this.precioEstablecido);
    console.log("Dirección: ", this.direccion);

    this.nombre = this.selectedOption;

    const tic = new Ticket(this.nombre, this.precioEstablecido, this.direccion, this.encendido, this.color);
    this.sTicketService.saveTicket(tic).subscribe(
      data => {
      }, err => {
        alert("Alerta creada!");
        this.getTickets();
      }
    )
  }


}

