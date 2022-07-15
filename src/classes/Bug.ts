namespace Classes{
export class Bug {

	private killTimer; // Timer
	private killProgress;
	private infectedPlant : Plant;
	private killTime : number;

	private timerTick() : void{
		this.killProgress++;
		if(this.killProgress > this.killTime){
			this.infectedPlant.die();
			clearInterval(this.killTimer);
		}
	}

	public fix() : void{
		clearInterval(this.killTimer);
		this.infectedPlant = null;
	}

	constructor(infectedPlant : Plant){
		this.infectedPlant = infectedPlant;
		this.killProgress = 0;
		this.killTime = 5; //FIXME Static value
		this.killTimer = setInterval(this.timerTick.bind(this), 1000); // FIXME Timescale
	}

}
}