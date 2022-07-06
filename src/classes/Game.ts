namespace Classes{
export class Game {
     //FIXME Attributes private
	money : number;
	private timescale : number;
	gameShop : Shop;
	gameField : Field;
    renderingContext : CanvasRenderingContext2D;

	/**
	 * Processes a money transaction 
	 * @param amountMoney The amount of money to be spent
     * @return Returns true of the player has enough money for the transaction
	 */
	public makeTransaction(amountMoney : number) : boolean{
		if(this.money - amountMoney >= 0){
            this.money -= amountMoney;
            return true;
        }else{
            return false;
        }        
	}

    public getTimescale() : number{
        return this.timescale;
    }

    constructor(renderingContext : CanvasRenderingContext2D){
        //FIXME Set all values dynamically in parametrized constructor
        this.timescale = 1.0;
        this.money = 1000;
        this.renderingContext = renderingContext;
        this.gameField = new Field((8*8),this);          // Calls constructor of Field, size has to be square number
        this.gameShop = new Shop(this.gameField,this);   // Calls constructor of Shop
        
    }

}
}