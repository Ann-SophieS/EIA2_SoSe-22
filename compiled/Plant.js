var Plant = /** @class */ (function () {
    function Plant() {
    }
    Plant.prototype.getAppearance = function () {
        // TODO - implement Plant.getAppearance
        return this.properties.appearance;
    };
    Plant.prototype.waterPlant = function () {
        // TODO - implement Plant.waterPlant
        throw new Error('Not Implemented!');
    };
    /**
     * If the plant dies, the Price is reduced to zero, the slot the plant is located at is not cleared
     */
    Plant.prototype.die = function () {
        // TODO - implement Plant.die
        throw new Error('Not Implemented!');
    };
    Plant.prototype.fertilizePlant = function () {
        // TODO - implement Plant.fertilizePlant
        throw new Error('Not Implemented!');
    };
    Plant.prototype.getAmountWatered = function () {
        return this.amountWatered;
    };
    Plant.prototype.getAmountFertilized = function () {
        return this.amountFertilized;
    };
    Plant.prototype.isInfected = function () {
        // TODO - implement Plant.isInfected
        throw new Error('Not Implemented!');
    };
    Plant.prototype.fixBug = function () {
        // TODO - implement Plant.fixBug
        throw new Error('Not Implemented!');
    };
    /**
     *
     * @return Price the Plant was sold at
     */
    Plant.prototype.harvest = function () {
        // TODO - implement Plant.harvest
        throw new Error('Not Implemented!');
    };
    Plant.prototype.timerTick = function () {
        // TODO - implement Plant.timerTick
        throw new Error('Not Implemented!');
    };
    Plant.prototype.getStatistics = function () {
        // TODO - implement Plant.getStatistics
        throw new Error('Not Implemented!');
    };
    /**
     *
     * @param effect
     */
    Plant.prototype.processEffect = function (effect) {
        // TODO - implement Plant.processEffect
        throw new Error('Not Implemented!');
    };
    /**
     *
     * @param bug
     */
    Plant.prototype.getInfected = function (bug) {
        // TODO - implement Plant.getInfected
        throw new Error('Not Implemented!');
    };
    /**
     * Returns true if the SellPrice is 0 (the plant is dead) or the Growth Stage is Harvest
     */
    Plant.prototype.isHarvestable = function () {
        // TODO - implement Plant.isHarvestable
        throw new Error('Not Implemented!');
    };
    return Plant;
}());
//# sourceMappingURL=Plant.js.map