namespace Classes{
export class Field {

	private fieldSize : number;
	private slots : Plant[];
	selectedSlot : number; //FIXME Private
	private generateBugTimer : NodeJS.Timer;
	private associatedGame : Game;

	/**
	 * Check plant on a specific position on the field
	 * @param index Index of a slot on the field
	 * @returns Plant on the specified index of the field
	 */
	public getPlantAt(index : number) : Plant{
		return this.slots[index];
	}


	/**
	 * Get the Plant at the currently selected position
	 * @returns the Plant at the currently selected Position
	 */
	public getPlantAtSelected() : Plant{
		return this.getPlantAt(this.selectedSlot);
	}

	public harvestPlantAt(index : number) : number{
		let harvestSellPrice : number = this.slots[index].harvest();
		if(harvestSellPrice != -1){
			this.slots[index] = null;
			return harvestSellPrice;
		}
		return harvestSellPrice;
		
	}

	public harvestPlantAtSelected() : number{
		return this.harvestPlantAt(this.selectedSlot);
	}


	/**
	 * Plants a plant at the slot the user has currently selected
	 * @param plant Plant to plant at the selected slot
	 * @returns If the plant could be planted or not
	 */
	public plantAtSelected(plant : Plant) : boolean{
		return this.plantAt(plant,this.selectedSlot);
	}

	/**
	 * Plant a plant at a specified plant on a specified location on the field
	 * @param plant The Plant to be Planted plant plant plant
	 * @param fieldIndex The Index of the Field Slot the plant should be planted
     * @return If the plant was planted sucessfully, returns true, else false
	 */
	public plantAt(plant : Plant, fieldIndex : number) : boolean{
        // Check if selected slot already has a plant
		if(this.getPlantAt(fieldIndex) != null){
            return false;
        }
        // Check if fieldIndex is actually on the field
        if(this.fieldSize <= fieldIndex){
            return false;
        }
        
        // If all is good, plant the plant
        this.slots[fieldIndex] = plant;
        
        return true;

	}

	public drawField() : void{
		let w = 0;
		let h = 0;
		w = this.associatedGame.renderingContext.canvas.width; //FIXME Static values
		h = this.associatedGame.renderingContext.canvas.height;
		w *= 0.75; // Make field 3/4 of canvas size, 1/4 is sidebar
		let fieldSizePX = (w/(Math.floor(Math.sqrt(this.fieldSize))));

		for (let x=0;x<=w;x+=fieldSizePX) {
			for (let y=0;y<=h;y+=fieldSizePX) {
				this.associatedGame.renderingContext.moveTo(x, 0);
				this.associatedGame.renderingContext.lineTo(x, h);
				this.associatedGame.renderingContext.stroke();

				this.associatedGame.renderingContext.moveTo(0, y);
				this.associatedGame.renderingContext.lineTo(w, y);
				this.associatedGame.renderingContext.stroke();
			}
		}
	}

	/**
	 * Handles random Bug infections on the field
	 */
	private bugTimerTick() : void {
		let plantedFields : number[] = [];
		
		// Find indexes of fields that have plants on it
		for (let field = 0; field <= this.fieldSize; field++) {

			if(this.slots[field] != null){ // If there is a plant in the current field...

				plantedFields.push(field); // ...add its index to plantedFields

			}		
		}

		if(plantedFields.length == 0){
			return; // Point of no return
		}
			

		// https://www.cloudhadoop.com/javascript-get-random-element-array/
		let randomIndex=Math.floor(Math.random()*plantedFields.length); // Pick random plant from plantedFields
		if(this.slots[randomIndex].isInfected()){
			return; // If picked plant is already infected, do nothing
		}else{
			this.slots[randomIndex].becomeInfected(new Bug()); // Infect plant
		}
	}

	/**
	 * 
	 * @param fieldSize Amount of slots for plants on the field
	 */
	public constructor(fieldSize : number, associatedGame : Game){
		this.fieldSize = fieldSize; // Save field size (see top)
		this.slots = []; // Create empty array (needed for fill)
		this.slots.fill(null,0,fieldSize); // Fill array with nulls 
		this.selectedSlot = -1; // -1 can never be reached (User has not yet selected a field at the beginning)
		// FIXME Bug timer not adjusted to timescale
		this.generateBugTimer = setInterval(this.bugTimerTick, 1000);
		this.associatedGame = associatedGame;
		this.drawField();
	}

}
}