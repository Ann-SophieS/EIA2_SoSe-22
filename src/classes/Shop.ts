namespace Classes{
export class Shop {
	private timer : NodeJS.Timer;
	private priceVaryMultiplicator : number;
	items : Item[]; // FIXME Private
	private associatedField : Field;
	private associatedGame : Game;

	/**
	 * Handles price fluctuations (timer)
	 */
	public varyPrices() : void{
		// https://www.codegrepper.com/code-examples/javascript/get+random+number+between+range+typescript
		// Generate random price multiplicator between 1.5 and 0.5
		this.priceVaryMultiplicator = Math.random() * (1.5 - 0.5) + 0.5;
	}

	public drawShop(table : HTMLTableElement) : void{

		for(let i = 0; i <= this.items.length-1; i++){
			//https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement/insertRow
		let newRow = table.insertRow(-1);
		newRow.addEventListener("click",this.buyItem.bind(this,this.items[i]),false);

		// Insert a cell in the row at index 0
		let textCell = newRow.insertCell(0);
		let imageCell = newRow.insertCell(0);
		
		imageCell.innerHTML="<img width='100' height='100' src='" + this.items[i].shopThumbnail + "'/>";
		
		// Append a text node to the cell
		let newText = document.createTextNode(this.items[i].name);
		textCell.appendChild(newText);
		}

		
	}

	/**
	 * Buys an item from the shop
	 * @param item The item that was bought
	 * @returns True if the purchase was successful
	 */
	public buyItem(item : Item) : boolean{

		console.log("User wants to buy : " + item.name)

		if(this.associatedGame.makeTransaction(item.price) == false){
			return false;
		}
		// https://stackoverflow.com/questions/13613524/get-an-objects-class-name-at-runtime
		if(item.constructor.name == PlantItem.name){ // If the bought item is a plant...
			//give selected item the properties of the clicked plant item
			let toPlant : Plant = new Plant((<PlantItem>item).properties)
			return this.associatedField.plantAtSelected(toPlant); 

		}else if(item.constructor.name == UtilityItem.name){ // If the bought item is a utility...

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
		for (let itemCounter = 0; itemCounter <= this.items.length-1; itemCounter++) {
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
	public constructor(associatedField : Field, associatedGame : Game){
		this.timer = setInterval(this.varyPrices, 60000); //FIXME Adjust timer to timescale
		this.priceVaryMultiplicator = 1;
		this.items = [];
		this.associatedField = associatedField;
		this.associatedGame = associatedGame;
	}

}
}