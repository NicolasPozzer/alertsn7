export class Ticket {
    id?: number;
    nombre: string;
    precioEstablecido: number;
    direccion: string;     //  False = Short   | True = Long
    encendido: boolean;     //  False = Apagado | True = Encendido


    constructor(nombre: string, precioEstablecido: number, direccion: string, encendido: boolean){
        this.nombre = nombre;
        this.precioEstablecido = precioEstablecido;
        this.direccion = direccion;
        this.encendido = encendido;
    }

}