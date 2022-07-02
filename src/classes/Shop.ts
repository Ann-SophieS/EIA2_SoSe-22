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
	 * 
	 * @param item
	 */
	public buyItem(item : Item) : boolean{
		// TODO - implement Shop.buyItem
		throw new Error('Not Implemented!');
	}

	/**
	 * Adds a new item to the shop
	 * @param item Item to be added to the shop
	 */
	public addItem(item : Item) : void{
		for (let itemCounter = 0; itemCounter <= this.items.length; itemCounter++) {
			if(this.items[itemCounter].name == item.name){
				return;
			}			
		}
		this.items.push(item);
	}

	public constructor(associatedField : Field){
		this.timer = setInterval(this.varyPrices, 60000); //FIXME Adjust timer to timescale
		this.priceVaryMultiplicator = 1;
		this.items = [];
		this.associatedField = associatedField;
	}

}