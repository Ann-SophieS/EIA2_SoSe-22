namespace Classes{
export class PlantItem implements Item {

    
    price: number;
    name: string;
    shopThumbnail: string;
    buyPriceModifier: number;
    sellPriceModifier: number;
	properties : PlantProperties;

    public constructor(plantProperties : PlantProperties){
        this.properties = plantProperties;
        this.price = plantProperties.buyPrice;
        this.name = plantProperties.name;
        this.buyPriceModifier = 0;
        this.sellPriceModifier = 0;
        this.shopThumbnail = plantProperties.appearance[0]; //FIXME Change ?
    }
    
    
}
}