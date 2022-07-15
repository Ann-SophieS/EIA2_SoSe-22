var Classes;
(function (Classes) {
    var Game = /** @class */ (function () {
        function Game(gameTable) {
            var _this = this;
            // https://github.com/JirkaDellOro/EIA2-Inverted/blob/master/X00_Code/L08_Canvas/Alley/Alley.ts
            this.canvas = gameTable.getElementsByClassName("field")[0]; // if element not found on site, canvas is null
            this.shopTable = gameTable.getElementsByClassName("shop")[0];
            this.statsDiv = gameTable.getElementsByClassName("stats")[0];
            this.moneyDiv = gameTable.getElementsByClassName("money")[0];
            if (!this.canvas || !this.shopTable || !this.statsDiv || !this.moneyDiv) // Check if all needed elements are present
                return; // Game won't be loaded
            this.renderingContext = this.canvas.getContext("2d");
            //FIXME Set all values dynamically in parametrized constructor
            this.timescale = 1;
            this.money = 1000;
            this.gameField = new Classes.Field((8 * 8), this); // Calls constructor of Field, size has to be square number
            this.gameShop = new Classes.Shop(this.gameField, this); // Calls constructor of Shop
            this.moneyDiv.innerHTML = "Money : " + this.money;
            this.canvas.addEventListener('click', function (event) {
                var rect = _this.canvas.getBoundingClientRect(); // Get position of rectangle on the page
                var x = event.clientX - rect.left; // subtract pixels that are not on canvas
                var y = event.clientY - rect.top;
                _this.gameField.handleClick(x, y); // call method handleClick in gameField of mainGame
                var plant = _this.gameField.getPlantAtSelected(); // get selected plant
                if (plant != null) {
                    _this.statsDiv.innerHTML = plant.getStatistics(); // Show statistics of selected plant
                }
                else {
                    _this.statsDiv.innerHTML = "You can plant here";
                }
            }, false);
        }
        /**
         * Processes a money transaction
         * @param amountMoney The amount of money to be spent
         * @return Returns true of the player has enough money for the transaction
         */
        Game.prototype.removeMoney = function (amountMoney) {
            if (this.money - amountMoney >= 0) {
                this.money -= amountMoney;
                this.moneyDiv.innerHTML = "Money : " + this.money;
                return true;
            }
            else {
                return false;
            }
        };
        Game.prototype.addMoney = function (amountMoney) {
            this.money += amountMoney;
            this.moneyDiv.innerHTML = "Money : " + this.money;
        };
        Game.prototype.getTimescale = function () {
            return this.timescale;
        };
        return Game;
    }());
    Classes.Game = Game;
})(Classes || (Classes = {}));
//# sourceMappingURL=Game.js.map