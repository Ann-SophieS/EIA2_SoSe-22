interface Item {
    
	price : number;
	name : string;
	currentPriceMultiplicator : number;
	shopThumbnail : string;

	/**
	 * 
	 * @param multiplicator
	 */
	varyPrice(multiplicator : number) : void;


}