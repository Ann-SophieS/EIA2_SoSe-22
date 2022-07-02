var Game = /** @class */ (function () {
    function Game() {
        //FIXME Set all values dynamically in parametrized constructor
        this.timescale = 1.0;
        this.money = 1000;
        this.gameShop = new Shop();
        this.gameField = new Field(40);
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
//# sourceMappingURL=Game.js.map