export class CardData{
    static cardCount = 0;
    public cardId: number;
    constructor(public price: number, public name: string, public description: string, public imgName: string){
        CardData.cardCount += 1;
        this.cardId = CardData.cardCount;
    }
}