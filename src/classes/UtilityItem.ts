namespace Classes{
export class UtilityItem implements Item {
    
    price: number;
    name: string;
    shopThumbnail: string;
    buyPriceModifier: number;
	effectOnPlant : Effect;

    constructor(price: number,
        name: string,
        shopThumbnail: string,
        effectOnPlant : Effect){
            this.price = price;
            this.name = name;
            this.shopThumbnail = shopThumbnail;
            this.buyPriceModifier = 0;
            this.effectOnPlant = effectOnPlant;
        }
    
    

}
}