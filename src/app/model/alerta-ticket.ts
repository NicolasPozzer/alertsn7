export class AlertaTicket {
    baseAsset: string;
    lastPrice: number;


    constructor(baseAsset: string, lastPrice: number){
        this.baseAsset = baseAsset;
        this.lastPrice = lastPrice;
    }
}
