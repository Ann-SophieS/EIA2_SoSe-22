var PlantItem = /** @class */ (function () {
    function PlantItem(plantProperties) {
        this.properties = plantProperties;
        this.price = plantProperties.buyPrice;
        this.name = plantProperties.name;
        this.shopThumbnail = plantProperties.appearance;
    }
    PlantItem.prototype.varyPrice = function (multiplicator) {
        throw new Error("Method not implemented.");
    };
    return PlantItem;
}());
//# sourceMappingURL=PlantItem.js.map