var Classes;
(function (Classes) {
    var UtilityItem = /** @class */ (function () {
        function UtilityItem(price, name, shopThumbnail, effectOnPlant) {
            this.price = price;
            this.name = name;
            this.shopThumbnail = shopThumbnail;
            this.effectOnPlant = effectOnPlant;
        }
        UtilityItem.prototype.varyPrice = function (multiplicator) {
            throw new Error("Method not implemented.");
        };
        return UtilityItem;
    }());
    Classes.UtilityItem = UtilityItem;
})(Classes || (Classes = {}));
//# sourceMappingURL=UtilityItem.js.map