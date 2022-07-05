interface Item {
    
	price : number;
	name : string;
	shopThumbnail : string;

	/**
	 * 
	 * @param multiplicator
	 */
	varyPrice(multiplicator : number) : void;


}