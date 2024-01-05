export class AlertaTicket {
    id: string;
    symbol: string;
    current_price: number;


    constructor(id: string, symbol: string, current_price: number){
        this.id = id;
        this.symbol = symbol;
        this.current_price = current_price;
    }
}
