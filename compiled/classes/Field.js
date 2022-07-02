var Field = /** @class */ (function () {
    /**
     *
     * @param size
     */
    function Field(fieldSize) {
        // TODO - implement Field.constructor
        throw new Error("Not Implemented!");
    }
    Field.prototype.getPlantAt = function (index) {
        return this.slots[index];
    };
    /**
     * Plant a plant at a specified plant on a specified location on the field
     * @param Plant The Plant to be Planted plant plant plant
     * @param fieldIndex The Index of the Field Slot the plant should be planted
     * @return If the plant was planted sucessfully, returns true, else false
     */
    Field.prototype.plantAt = function (plant, fieldIndex) {
        // Check if selected slot already has a plant
        if (this.getPlantAt(fieldIndex) != null) {
            return false;
        }
        // Check if fieldIndex is actually on the field
        if (this.slots.length > fieldIndex) {
            return false;
        }
        // If all is good, plant the plant
        this.slots[fieldIndex] = plant;
        return true;
    };
    Field.prototype.drawField = function () {
        // TODO - implement Field.drawField
        throw new Error("Not Implemented!");
    };
    Field.prototype.bugTimerTick = function () {
        // TODO - implement Field.bugTimerTick
        throw new Error("Not Implemented!");
    };
    /**
     * Animates a bug to a plant then adds the bug to the plants infected attribute
     * Has to check if selected plant is already infected
     */
    Field.prototype.infectRandomPlant = function () {
        // TODO - implement Field.infectRandomPlant
        throw new Error("Not Implemented!");
    };
    return Field;
}());
//# sourceMappingURL=Field.js.map