class PlantItem implements Item {

    
    price: number;
    name: string;
    currentPriceMultiplicator: number;
    shopThumbnail: string;
    varyPrice(multiplicator: number): void {
        throw new Error("Method not implemented.");
    }

	properties : PlantProperties;

}