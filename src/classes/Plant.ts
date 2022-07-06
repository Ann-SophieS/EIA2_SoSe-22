namespace Classes{
export class Plant {

	private growthStage : Growth;
	private timeSincePlanted : number;
	private amountWatered : number;
	private amountFertilized : number;
	private infected : Bug;
	private growthTimer : NodeJS.Timer;
	private properties : PlantProperties;

	/**
	 * Gets the appearance of the plant
	 * @returns URL to the appearance image
	 */
	public getCurrentAppearance() : string {
		return this.properties.appearance[this.growthStage];
	}

	/**
	 * Waters the plant
	 */
	public waterPlant() : void {
		if(this.amountWatered + 1 > this.properties.waterNeeded){
			this.die(); // If the plant has been watered too much, it dies
		}else{
			this.amountWatered = this.amountWatered + 1;
		}
	}

	/**
	 * Makes a plant die
	 */
	private die() : void {
		this.properties.sellPrice = 0; // Dead plants are worethless
		clearInterval(this.growthTimer); // A dead plant cant grow
		//FIXME Update apperance
	}

	/**
	 * Fertilizes the plant
	 */
	public fertilizePlant() : void {
		if(this.amountFertilized + 1 > this.properties.fertilizerNeeded){
			this.die(); // Too much fertilizer kills the plant
		}else{
			this.amountFertilized = this.amountFertilized + 1;
		}
	}

	/**
	 * Gets how much the plant has been watered
	 * @returns How often the plant has been watered
	 */
	public getAmountWatered() : number {
		return this.amountWatered;
	}

	/**
	 * Gets the amount of fertilizer used on the plant
	 * @returns How often the plant has been fertilized
	 */
	public getAmountFertilized() : number {
		return this.amountFertilized;
	}

	/**
	 * Checks whether the plant is infected with a Bug
	 * @returns True if the plant is infected
	 */
	public isInfected() : boolean {
		if(this.infected != null){
			return true;
		}else{
			return false;
		}
	}

	/**
	 * Removes the bug from the Plant
	 */
	public fixBug() : void {
		if(this.isInfected() == true){
			this.infected.fix(); //Stop the kill timer of the bug
			this.infected = null; // and remove the Bug from the Plant
		}
	}

	/**
	 * Harvests a plant
	 * @return Price the Plant was sold at, -1 if the plant could not be harvested
	 */
	public harvest() : number {
		if(this.isHarvestable()){
			return this.properties.sellPrice;
		}else{
			return -1;
		}
	}

	/**
	 * Handles growth of the plant
	 */
	public growTimerTick() : void {
		this.timeSincePlanted = this.timeSincePlanted + 1; // Increase the time since planting

		console.log("Plant is growing, time since planted : " + this.timeSincePlanted);
		console.log(this);
		console.log(this.getStatistics());


		// Check if the full grow time has expired
		if(this.timeSincePlanted >= this.properties.totalGrowTime && this.growthStage == Growth.Growing){
			
			//Check if the plant had enough fertilizer
			if(this.amountFertilized == this.properties.fertilizerNeeded){
				// Check if the plant was watered enough
				if(this.amountWatered == this.properties.waterNeeded){
					// If the plant had enough water and fertilizer it can be harvested...
					this.growthStage = Growth.Harvest;
					// ...and cant grow further
					clearInterval(this.growthTimer);
					//FIXME Update Apperance
					console.log("Plant is harvestable");
				}else{
					this.die(); // Not enough water -> Ded
				}
			}else{
				this.die(); // Not enough fertilizer -> Ded
			}
		
		// Check if half of the grow time has expired
		}else if(this.timeSincePlanted >= (this.properties.totalGrowTime * 0.5) && this.growthStage == Growth.Sprout){
			//Check if the plant had enough fertilizer
			if(this.amountFertilized >= Math.floor(this.properties.fertilizerNeeded/2)){
				// Check if the plant was watered enough
				if(this.amountFertilized >= Math.floor(this.properties.waterNeeded/2)){
					// If the plant had enough water and fertilizer, it grows
					this.growthStage = Growth.Growing;
					//FIXME Update Appearance
					console.log("A Plant grew")
				}else{
					this.die(); // Not enough water -> Ded
				}
			}else{
				this.die(); // Not enough fertilizer -> Ded
			}
		}
	}

	/**
	 * Get growth statistics of a plant
	 * @returns A String containing statistics of the plant
	 */
	public getStatistics() : string {
		// https://www.geeksforgeeks.org/how-to-create-multi-line-strings-in-javascript/
		let statistics : string = 
		"Growth stage : " + this.growthStage.toString() + "\n" +
		"Water: " + this.amountWatered + " / " + this.properties.waterNeeded + "\n" +
		"Fertilizer : " + this.amountFertilized + " / " + this.properties.fertilizerNeeded + "\n" +
		"Possible profit : " + (this.properties.sellPrice - this.properties.buyPrice) + "\n" +
		"\n";
		//TODO Add more statistics

		if(this.isDead()){
			statistics = "This plant is dead. Great. Good job. Poor plan(t)ing :(";
			return statistics;
		}

		if(this.isHarvestable()){
			statistics = 
			"Plant is ready for harvest!\n" +
			"Sell price will be : " + this.properties.sellPrice +"\n" +
			"Your profit: " + (this.properties.sellPrice - this.properties.buyPrice) + "\n";
			return statistics;
		}

		

		return statistics;
	}

	/**
	 * Processes a specified effect on the plant
	 * @param effect Effect to be applied on the plant
	 */
	public processEffect(effect : Effect) : void {
		switch(effect){ //FIXME IfElse
			case Effect.Fertilize:
				this.fertilizePlant();
				break;
			case Effect.killBug:
				this.fixBug();
				break;
			case Effect.water:
				this.waterPlant();
				break;
		}
	}

	/**
	 * Adds an infection to the plant
	 * @param bug The bug to infect the plant with
	 */
	public becomeInfected(bug : Bug) : void {
		if(this.infected == null){
			this.infected = bug;
		}		
	}

	/**
	 * Checks if the plant can be harvested
	 * @return Returns true if the plant is fully grown or dead, else false
	 */
	public isHarvestable() : boolean {
		if(this.isDead() || this.growthStage == Growth.Harvest){
			return true;
		}else{
			return false;
		}
	}

	/**
	 * Checks if the plant is alive or dead
	 * @returns True if the plant is dead, else false
	 */
	public isDead() : boolean{
		if(this.properties.sellPrice == 0){
			return true;
		}else{
			return false;
		}
	}

	public constructor(properties : PlantProperties){
		this.growthStage = Growth.Sprout;
		this.timeSincePlanted = 0;
		this.amountWatered = 0;
		this.amountFertilized = 0;
		this.infected = null; 
		// https://stackoverflow.com/questions/2001920/calling-a-class-prototype-method-by-a-setinterval-event
		this.growthTimer = setInterval(this.growTimerTick.bind(this), 5000); //FIXME Adjust to timescale
		// bind value source to class plant (this)
		this.properties = properties;
	}

}
}