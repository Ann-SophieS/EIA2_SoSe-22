class Game {

	private money : number;
	private timescale : number;
	private gameShop : Shop;
	private gameField : Field;

	/**
	 * 
	 * @param amountMoney
	 */
	public makeTransaction(amountMoney : number) : boolean{
		// TODO - implement Game.makeTransaction
		throw new Error('Not Implemented!');
	}

    public getTimescale() : number{
        return this.timescale;
    }

}