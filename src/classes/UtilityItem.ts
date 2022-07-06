namespace Classes{
export class UtilityItem implements Item {
    
    price: number;
    name: string;
    shopThumbnail: string;
    varyPrice(multiplicator: number): void {
        throw new Error("Method not implemented.");
    }

	effectOnPlant : Effect;

}
}