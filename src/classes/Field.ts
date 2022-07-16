namespace Classes{
export class Field {

	private fieldSize : number;
	private slots : Plant[];
	selectedSlot : number; //FIXME Private
	private generateBugTimer : NodeJS.Timer;
	public associatedGame : Game; //FIXME Private

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


	/**
	 * Harvests the Plant at a specified spot on the field
	 * @param index the spot on the field to harvest
	 * @returns the price the Plant was sold at, -1 if the plant couldnt be harvested
	 */
	public harvestPlantAt(index : number) : number{
		//FIXME Check if index is on the field 
		//FIXME Check if spot even has a plant
		let harvestSellPrice : number = this.slots[index].harvest();
		if(harvestSellPrice != -1){
			this.slots[index] = null;
			return harvestSellPrice;
		}
		return harvestSellPrice;
		
	}

	/**
	 * Harvests the Plant the user has currently selected
	 * @returns the price the Plant was sold at, -1 if the plant couldnt be harvested
	 */
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
		//Tell the plant where it was planted 
		plant.setPlanted(this,fieldIndex);
        // and plant it
        this.slots[fieldIndex] = plant;
		// update the slot with the new apperance
		this.drawSlot(fieldIndex);
        
        return true;

	}

	/**
	 * Draws the contents of all slots on the whole field on the canvas
	 */
	public drawField() : void{
		for(let i = 0; i <= this.fieldSize; i++)
			this.drawSlot(i);		
	}

	/**
	 * (Re)Draws the contents of a specific slot on the canvas
	 * @param index Slot to draw
	 */
	public drawSlot(index : number){
		let canvasWidth = this.associatedGame.renderingContext.canvas.width; // Get width of whole canvas

		let rowLength = (Math.sqrt(this.fieldSize)); // calculate amount of fields in one row
		
		let fieldSizePX = (canvasWidth/rowLength); // calculate size of one slot

		// Get top left corner of slot (px)
		let startY = Math.trunc(index / rowLength) * fieldSizePX;
		let startX = (index % rowLength) * fieldSizePX;

		this.associatedGame.renderingContext.clearRect(startX,startY,fieldSizePX,fieldSizePX); // Clear the slot

		this.associatedGame.renderingContext.strokeRect(startX,startY,fieldSizePX,fieldSizePX); // Draw the border around the field


		let fieldText = index.toString();

		if(this.slots[index] != null){ // If there is a plant on the slot, display it and draw its stats
			let apperance = new Image();
			apperance.src = this.slots[index].getCurrentAppearance();
			apperance.addEventListener("load",()=>{ // Wait till image is loaded 
				this.associatedGame.renderingContext.drawImage(apperance, startX + 10, startY + 10, fieldSizePX - 20, fieldSizePX - 20);

				this.associatedGame.renderingContext.fillStyle = 'blue'; //First text (water) will be blue
				this.associatedGame.renderingContext.fillText((this.slots[index].getAmountWatered() + " / "  + this.slots[index].getProperties().waterNeeded),startX+(fieldSizePX*0.1), startY+(fieldSizePX*0.2));
				
				this.associatedGame.renderingContext.fillStyle = 'green'; //Second text (fertilizer) will be green
				this.associatedGame.renderingContext.fillText((this.slots[index].getAmountFertilized() + " / "  + this.slots[index].getProperties().fertilizerNeeded),startX+(fieldSizePX*0.1), startY+(fieldSizePX*0.3));
				
				if(this.slots[index].isInfected()){
					this.associatedGame.renderingContext.fillStyle = 'red'; //Second text (fertilizer) will be green
				this.associatedGame.renderingContext.fillText(("Infected"),startX+(fieldSizePX*0.1), startY+(fieldSizePX*0.9));
				}
				
				this.associatedGame.renderingContext.fillStyle = 'black'; // Reset the text color
			})
			if(this.slots[index].isHarvestable()){
				if(this.slots[index].isDead()){
					this.associatedGame.renderingContext.strokeStyle = "red";
				}else{
					this.associatedGame.renderingContext.strokeStyle = "green";
				}
				// 4 Pixel offset because selected border is 2 pixel offset -> both can be seen
				this.associatedGame.renderingContext.strokeRect(startX+4,startY+4,fieldSizePX-8,fieldSizePX-8); // Draw border around selected field
				this.associatedGame.renderingContext.strokeStyle = "black";
			}		
			
		}

		if(this.selectedSlot == index){
			this.associatedGame.renderingContext.strokeStyle = "blue";
			this.associatedGame.renderingContext.strokeRect(startX+2,startY+2,fieldSizePX-4,fieldSizePX-4); // Draw border around selected field
			this.associatedGame.renderingContext.strokeStyle = "black";
		}

		
		//Show the index of the field //FIXME remove
		//this.associatedGame.renderingContext.moveTo(startX+(fieldSizePX*0.5), startY+(fieldSizePX*0.5));
		//this.associatedGame.renderingContext.fillText(fieldText,startX+(fieldSizePX*0.5), startY+(fieldSizePX*0.5));
		
		

		
	}


	/**
	 * (Re)Draws the contents of the currently selected slot
	 */
	public drawCurrentSlot() : void{
		this.drawSlot(this.selectedSlot);
	}

	public getTimescale() : number{
		return this.associatedGame.getTimescale();
	}


	/**
	 * Handles the event if the user clicked the field
	 * @param x X coordinate the user has clicked
	 * @param y Y coordinate the user has clicked
	 */
	//TODO simplify
	public handleClick(x : number, y : number){
		let fieldSizePX = ((this.associatedGame.renderingContext.canvas.width)/(Math.floor(Math.sqrt(this.fieldSize))));
		let row = Math.trunc(x/fieldSizePX)%Math.floor(Math.sqrt(this.fieldSize));
		let col = Math.trunc(y/fieldSizePX)%Math.floor(Math.sqrt(this.fieldSize));
		console.log("Field size is: " + fieldSizePX);
		console.log("Row : " + row);
		console.log("Col : " + col);
		console.log("User Clicked at index : " + ((col*Math.floor(Math.sqrt(this.fieldSize)))+row));
		let oldSlot = this.selectedSlot;
		this.selectedSlot = ((col*Math.floor(Math.sqrt(this.fieldSize)))+row);
		this.drawSlot(oldSlot);
		if(this.slots[this.selectedSlot] != null){
			if(this.slots[this.selectedSlot].isHarvestable()){
				let sellPrice = this.harvestPlantAtSelected();
				if(sellPrice != -1){
					this.associatedGame.addMoney(sellPrice);
				}
			}
		}
		
		this.drawSlot(this.selectedSlot);
		
		
	}

	/**
	 * Handles random Bug infections on the field
	 */
	private bugTimerTick() : void {

		// Chance to infect
		if(Math.random() > 0.05){ // 5% chance
			return; // No Bug generated 
		}

		let plantedFields : number[] = []; //create plantedFields array -> empty
		
		// Find indexes of fields that have plants on it
		for (let field = 0; field <= this.fieldSize; field++) {
			if(this.slots[field] != null){ // If there is a plant in the current field...

				plantedFields.push(field); // ...add its index to plantedFields

			}		
		}

		if(plantedFields.length == 0){
			return; // No plant = no bug
		}
		
		// https://www.cloudhadoop.com/javascript-get-random-element-array/
		let randomIndex=plantedFields[Math.floor(Math.random()*plantedFields.length)]; // Pick random plant from plantedFields
		
		
		if(this.slots[randomIndex].isInfected() || this.slots[randomIndex].isDead()){
			return; // If picked plant is already infected or dead, do nothing
		}else{
			this.slots[randomIndex].becomeInfected(new Bug(this.slots[randomIndex])); // Infect plant + pass plant data to bug
			this.drawSlot(randomIndex); //update slot on field
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
		this.generateBugTimer = setInterval(this.bugTimerTick.bind(this), 1000); //FIXME Timescale
		this.associatedGame = associatedGame;
		this.drawField();
	}

}
}