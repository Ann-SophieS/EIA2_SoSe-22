class Field {

	private size : number;
	private slots : Plant[];
	private selectedSlot : number;
	private generateBugTimer;

	public getPlantAt() : Plant{
		// TODO - implement Field.getPlantAt
		throw new Error("Not Implemented!");
	}

	/**
	 * 
	 * @param Plant
	 * @param number
	 */
	public plantAt(plant : Plant, fieldIndex : number) : void{
		// TODO - implement Field.plantAt
		throw new Error("Not Implemented!");
	}

	public drawField() : void{
		// TODO - implement Field.drawField
		throw new Error("Not Implemented!");
	}

	private bugTimerTick() : void{
		// TODO - implement Field.bugTimerTick
		throw new Error("Not Implemented!");
	}

	/**
	 * Animates a bug to a plant then adds the bug to the plants infected attribute
	 * Has to check if selected plant is already infected
	 */
	private infectRandomPlant() : void{
		// TODO - implement Field.infectRandomPlant
		throw new Error("Not Implemented!");
	}

	/**
	 * 
	 * @param size
	 */
	public constructor(fieldSize : number){
		// TODO - implement Field.constructor
		throw new Error("Not Implemented!");
	}

}