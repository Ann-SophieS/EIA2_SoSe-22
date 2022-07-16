namespace Classes{
export class Game {
     //FIXME Attributes private
	private money : number;
	private timescale : number;
	gameShop : Shop;
	gameField : Field;
    renderingContext : CanvasRenderingContext2D;

    canvas: HTMLCanvasElement | null;
    shopTable : HTMLTableElement | null;
    statsDiv : HTMLDivElement | null;
    moneyDiv : HTMLDivElement | null;

	/**
	 * Processes a money transaction 
	 * @param amountMoney The amount of money to be spent
     * @return Returns true of the player has enough money for the transaction
	 */
	public removeMoney(amountMoney : number) : boolean{
		if(this.money - amountMoney >= 0){
            this.money -= amountMoney;
            this.moneyDiv.innerHTML = "Money : " + this.money;
            return true;
        }else{
            return false;
        }        
	}

    public addMoney(amountMoney : number) : void{
        this.money += amountMoney;
        this.moneyDiv.innerHTML = "Money : " + this.money;
    }

    public getTimescale() : number{
        return this.timescale;
    }

    constructor(gameTable : HTMLTableElement, startMoney : number, minPriceVariation : number ,maxPriceVariation : number){
        // https://github.com/JirkaDellOro/EIA2-Inverted/blob/master/X00_Code/L08_Canvas/Alley/Alley.ts
        this.canvas = <HTMLCanvasElement>gameTable.getElementsByClassName("field")[0]; // if element not found on site, canvas is null
        this.shopTable = <HTMLTableElement>gameTable.getElementsByClassName("shop")[0];
        this.statsDiv = <HTMLDivElement>gameTable.getElementsByClassName("stats")[0];
        this.moneyDiv = <HTMLDivElement>gameTable.getElementsByClassName("money")[0];
        if (!this.canvas || !this.shopTable || !this.statsDiv || !this.moneyDiv) // Check if all needed elements are present
            return; // Game won't be loaded
        this.renderingContext  = <CanvasRenderingContext2D>this.canvas.getContext("2d");

        //FIXME Set all values dynamically in parametrized constructor
        this.timescale = 1;
        this.money = startMoney; //FIXME dynamic
        this.gameField = new Field((8*8),this);          // Calls constructor of Field, size has to be square number
        this.gameShop = new Shop(this.gameField,this, minPriceVariation, maxPriceVariation);   // Calls constructor of Shop
        this.moneyDiv.innerHTML = "Money : " + this.money;

        this.canvas.addEventListener('click', (event)=>{ // Click event on canvas

            const rect = this.canvas.getBoundingClientRect(); // Get position of rectangle on the page
            const x = event.clientX - rect.left; // subtract pixels that are not on canvas
            const y = event.clientY - rect.top;

            
            this.gameField.handleClick(x, y); // call method handleClick in gameField of mainGame
            let plant : Plant = this.gameField.getPlantAtSelected(); // get selected plant
            if(plant != null){ 
                this.statsDiv.innerHTML = plant.getStatistics(); // Show statistics of selected plant
            }else{
                this.statsDiv.innerHTML = "You can plant here";
            }         
        
        }, false);
        
    }

}
}