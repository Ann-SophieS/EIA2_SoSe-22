class UtilityItem implements Item {
    
    price: number;
    name: string;
    currentPriceMultiplicator: number;
    shopThumbnail: string;
    varyPrice(multiplicator: number): void {
        throw new Error("Method not implemented.");
    }

	private effectOnPlant : Effect;

}