export class Ticket {
    id?: number;
    nombre: string;
    precioEstablecido: number;
    direccion: string;     
    encendido: boolean;     //  False = Apagado | True = Encendido
    color: string;  


    constructor(nombre: string, precioEstablecido: number, direccion: string, encendido: boolean, color: string){
        this.nombre = nombre;
        this.precioEstablecido = precioEstablecido;
        this.direccion = direccion;
        this.encendido = encendido;
        this.color = color;
    }

}