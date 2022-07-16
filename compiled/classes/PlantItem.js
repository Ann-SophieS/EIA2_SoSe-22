var Classes;
(function (Classes) {
    var PlantItem = /** @class */ (function () {
        function PlantItem(plantProperties) {
            this.properties = plantProperties;
            this.price = plantProperties.buyPrice;
            this.name = plantProperties.name;
            this.buyPriceModifier = 0;
            this.sellPriceModifier = 0;
            this.shopThumbnail = plantProperties.appearance[0]; //FIXME Change ?
        }
        return PlantItem;
    }());
    Classes.PlantItem = PlantItem;
})(Classes || (Classes = {}));
//# sourceMappingURL=PlantItem.js.map