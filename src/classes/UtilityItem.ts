namespace Classes{
export class UtilityItem implements Item {
    
    price: number;
    name: string;
    shopThumbnail: string;
    varyPrice(multiplicator: number): void {
        throw new Error("Method not implemented.");
    }

	effectOnPlant : Effect;

    constructor(price: number,
        name: string,
        shopThumbnail: string,
        effectOnPlant : Effect){
            this.price = price;
            this.name = name;
            this.shopThumbnail = shopThumbnail;
            this.effectOnPlant = effectOnPlant;
        }

}
}