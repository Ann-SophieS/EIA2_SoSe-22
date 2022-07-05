class Shop {

	private timer;
	private priceVaryMultiplicator : number;
	private items : Item[];
	private associatedField : Field;

	/**
	 * Handles price fluctuations (timer)
	 */
	public varyPrices() : void{
		// https://www.codegrepper.com/code-examples/javascript/get+random+number+between+range+typescript
		// Generate random price multiplicator between 1.5 and 0.5
		this.priceVaryMultiplicator = Math.random() * (1.5 - 0.5) + 0.5;
	}

	/**
	 * Buys an item from the shop
	 * @param item The item that was bought
	 * @returns True if the purchase was successful
	 */
	public buyItem(item : Item) : boolean{

		

		if(typeof item == typeof PlantItem){ // If the bought item is a plant...

			//give selected item the properties of the clicked plant item
			return this.associatedField.plantAtSelected(new Plant((<PlantItem>item).properties)); 

		}else if(typeof item == typeof UtilityItem){ // If the bought item is a utility...

			let selectedPlant : Plant = this.associatedField.getPlantAtSelected();

			if(selectedPlant != null){

				selectedPlant.processEffect((<UtilityItem>item).effectOnPlant);
				return true;

			}
		}
		return false;
	}

	/**
	 * Adds a new item to the shop
	 * @param item Item to be added to the shop
	 * @returns returns false if an item with the same name already exsists in the shop
	 */
	public addItem(item : Item) : boolean{
		for (let itemCounter = 0; itemCounter <= this.items.length; itemCounter++) {
			if(this.items[itemCounter].name == item.name){
				return false;
			}			
		}
		this.items.push(item);
		return true;
	}

	/**
	 * Sets up shop
	 * @param associatedField Field the shop is associated to
	 */
	public constructor(associatedField : Field){
		this.timer = setInterval(this.varyPrices, 60000); //FIXME Adjust timer to timescale
		this.priceVaryMultiplicator = 1;
		this.items = [];
		this.associatedField = associatedField;
	}

}