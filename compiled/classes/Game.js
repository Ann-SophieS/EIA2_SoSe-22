var Classes;
(function (Classes) {
    var Game = /** @class */ (function () {
        function Game(renderingContext) {
            //FIXME Set all values dynamically in parametrized constructor
            this.timescale = 1.0;
            this.money = 1000;
            this.renderingContext = renderingContext;
            this.gameField = new Classes.Field((8 * 8), this); // Calls constructor of Field, size has to be square number
            this.gameShop = new Classes.Shop(this.gameField, this); // Calls constructor of Shop
        }
        /**
         * Processes a money transaction
         * @param amountMoney The amount of money to be spent
         * @return Returns true of the player has enough money for the transaction
         */
        Game.prototype.makeTransaction = function (amountMoney) {
            if (this.money - amountMoney >= 0) {
                this.money -= amountMoney;
                return true;
            }
            else {
                return false;
            }
        };
        Game.prototype.getTimescale = function () {
            return this.timescale;
        };
        return Game;
    }());
    Classes.Game = Game;
})(Classes || (Classes = {}));
//# sourceMappingURL=Game.js.map