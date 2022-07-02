var Shop = /** @class */ (function () {
    function Shop(associatedField) {
        this.timer = setInterval(this.varyPrices, 60000); //FIXME Adjust timer to timescale
        this.priceVaryMultiplicator = 1;
        this.items = [];
        this.associatedField = associatedField;
    }
    /**
     * Handles price fluctuations (timer)
     */
    Shop.prototype.varyPrices = function () {
        // https://www.codegrepper.com/code-examples/javascript/get+random+number+between+range+typescript
        // Generate random price multiplicator between 1.5 and 0.5
        this.priceVaryMultiplicator = Math.random() * (1.5 - 0.5) + 0.5;
    };
    /**
     *
     * @param item
     */
    Shop.prototype.buyItem = function (item) {
        // TODO - implement Shop.buyItem
        throw new Error('Not Implemented!');
    };
    /**
     * Adds a new item to the shop
     * @param item Item to be added to the shop
     */
    Shop.prototype.addItem = function (item) {
        for (var itemCounter = 0; itemCounter <= this.items.length; itemCounter++) {
            if (this.items[itemCounter].name == item.name) {
                return;
            }
        }
        this.items.push(item);
    };
    return Shop;
}());
//# sourceMappingURL=Shop.js.map