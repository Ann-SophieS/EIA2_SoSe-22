class Plant {

	private growthStage : Growth;
	private secondsSincePlanted : number;
	private amountWatered : number;
	private amountFertilized : number;
	private infected : Bug;
	private timer;
	private properties : PlantProperties;

	public getAppearance() : string {
		// TODO - implement Plant.getAppearance
		return this.properties.appearance;
	}

	public waterPlant() : void {
		// TODO - implement Plant.waterPlant
		throw new Error('Not Implemented!');
	}

	/**
	 * If the plant dies, the Price is reduced to zero, the slot the plant is located at is not cleared
	 */
	public die() : void {
		// TODO - implement Plant.die
		throw new Error('Not Implemented!');
	}

	public fertilizePlant() : void {
		// TODO - implement Plant.fertilizePlant
		throw new Error('Not Implemented!');
	}

	public getAmountWatered() : number {
		return this.amountWatered;
	}

	public getAmountFertilized() : number {
		return this.amountFertilized;
	}

	public isInfected() : boolean {
		// TODO - implement Plant.isInfected
		throw new Error('Not Implemented!');
	}

	public fixBug() : void {
		// TODO - implement Plant.fixBug
		throw new Error('Not Implemented!');
	}

	/**
	 * 
	 * @return Price the Plant was sold at
	 */
	public harvest() : number {
		// TODO - implement Plant.harvest
		throw new Error('Not Implemented!');
	}

	public timerTick() : void {
		// TODO - implement Plant.timerTick
		throw new Error('Not Implemented!');
	}

	public getStatistics() : string {
		// TODO - implement Plant.getStatistics
		throw new Error('Not Implemented!');
	}

	/**
	 * 
	 * @param effect
	 */
	public processEffect(effect : Effect) : void {
		// TODO - implement Plant.processEffect
		throw new Error('Not Implemented!');
	}

	/**
	 * 
	 * @param bug
	 */
	public getInfected(bug : Bug) : void {
		// TODO - implement Plant.getInfected
		throw new Error('Not Implemented!');
	}

	/**
	 * Returns true if the SellPrice is 0 (the plant is dead) or the Growth Stage is Harvest
	 */
	public isHarvestable() : boolean {
		// TODO - implement Plant.isHarvestable
		throw new Error('Not Implemented!');
	}

}