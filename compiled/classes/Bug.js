var Classes;
(function (Classes) {
    var Bug = /** @class */ (function () {
        function Bug(infectedPlant) {
            this.infectedPlant = infectedPlant;
            this.killProgress = 0;
            this.killTime = 30; //FIXME Static value
            this.killTimer = setInterval(this.timerTick.bind(this), 1000); // FIXME Timescale
            //this.animate();		
        }
        Bug.prototype.timerTick = function () {
            this.killProgress++;
            if (this.killProgress > this.killTime) {
                this.infectedPlant.die();
                clearInterval(this.killTimer);
            }
        };
        Bug.prototype.fix = function () {
            clearInterval(this.killTimer);
            this.infectedPlant = null;
        };
        return Bug;
    }());
    Classes.Bug = Bug;
})(Classes || (Classes = {}));
//# sourceMappingURL=Bug.js.map