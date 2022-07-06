namespace Classes{
export class PlantItem implements Item {

    
    price: number;
    name: string;
    shopThumbnail: string;
    varyPrice(multiplicator: number): void {
        throw new Error("Method not implemented.");
    }

	properties : PlantProperties;

    public constructor(plantProperties : PlantProperties){
        this.properties = plantProperties;
        this.price = plantProperties.buyPrice;
        this.name = plantProperties.name;
        this.shopThumbnail = plantProperties.appearance;
    }

}
}