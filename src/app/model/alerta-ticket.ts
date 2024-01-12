export class AlertaTicket {
    symbol: string;
    current_price: number;


    constructor(symbol: string, current_price: number){
        this.symbol = symbol;
        this.current_price = current_price;
    }
}
