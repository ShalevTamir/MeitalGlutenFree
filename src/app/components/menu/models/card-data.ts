export class CardData{
    static cardCount = 0;
    public cardNumber: number;
    constructor(public price: number, public name: string, public description: string, public imgName: string){
        CardData.cardCount += 1;
        this.cardNumber = CardData.cardCount;
    }
}