namespace Classes{
export class PlantProperties {

	totalGrowTime : number;
	fertilizerNeeded : number;
	waterNeeded : number;
	buyPrice : number;
	sellPrice : number;
	appearance : string[];
	name : string;

	constructor(totalGrowTime : number,
		fertilizerNeeded : number,
		waterNeeded : number,
		buyPrice : number,
		sellPrice : number,
		appearance : string[],
		name : string){
			this.totalGrowTime = totalGrowTime;
			this.fertilizerNeeded = fertilizerNeeded;
			this.waterNeeded = waterNeeded;
			this.buyPrice = buyPrice;
			this.sellPrice = sellPrice;
			this.appearance = appearance;
			this.name	 = name;
		}

}
}