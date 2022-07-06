var Classes;
(function (Classes) {
    var Field = /** @class */ (function () {
        /**
         *
         * @param fieldSize Amount of slots for plants on the field
         */
        function Field(fieldSize) {
            this.fieldSize = fieldSize; // Save field size (see top)
            this.slots = [];
            this.slots.fill(null, 0, fieldSize);
            this.selectedSlot = -1; // -1 can never be reached (User has not yet selected a field at the beginning)
            // FIXME Bug timer not adjusted to timescale
            this.generateBugTimer = setInterval(this.bugTimerTick, 1000);
        }
        /**
         * Check plant on a specific position on the field
         * @param index Index of a slot on the field
         * @returns Plant on the specified index of the field
         */
        Field.prototype.getPlantAt = function (index) {
            return this.slots[index];
        };
        /**
         * Get the Plant at the currently selected position
         * @returns the Plant at the currently selected Position
         */
        Field.prototype.getPlantAtSelected = function () {
            return this.getPlantAt(this.selectedSlot);
        };
        Field.prototype.harvestPlantAt = function (index) {
            var harvestSellPrice = this.slots[index].harvest();
            if (harvestSellPrice != -1) {
                this.slots[index] = null;
                return harvestSellPrice;
            }
            return harvestSellPrice;
        };
        Field.prototype.harvestPlantAtSelected = function () {
            return this.harvestPlantAt(this.selectedSlot);
        };
        /**
         * Plants a plant at the slot the user has currently selected
         * @param plant Plant to plant at the selected slot
         * @returns If the plant could be planted or not
         */
        Field.prototype.plantAtSelected = function (plant) {
            return this.plantAt(plant, this.selectedSlot);
        };
        /**
         * Plant a plant at a specified plant on a specified location on the field
         * @param plant The Plant to be Planted plant plant plant
         * @param fieldIndex The Index of the Field Slot the plant should be planted
         * @return If the plant was planted sucessfully, returns true, else false
         */
        Field.prototype.plantAt = function (plant, fieldIndex) {
            // Check if selected slot already has a plant
            if (this.getPlantAt(fieldIndex) != null) {
                return false;
            }
            // Check if fieldIndex is actually on the field
            if (this.fieldSize < fieldIndex) {
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
        /**
         * Handles random Bug infections on the field
         */
        Field.prototype.bugTimerTick = function () {
            var plantedFields = [];
            // Find indexes of fields that have plants on it
            for (var field = 0; field <= this.fieldSize; field++) {
                if (this.slots[field] != null) { // If there is a plant in the current field...
                    plantedFields.push(field); // ...add its index to plantedFields
                }
            }
            if (plantedFields.length == 0) {
                return; // Point of no return
            }
            // https://www.cloudhadoop.com/javascript-get-random-element-array/
            var randomIndex = Math.floor(Math.random() * plantedFields.length); // Pick random plant from plantedFields
            if (this.slots[randomIndex].isInfected()) {
                return; // If picked plant is already infected, do nothing
            }
            else {
                this.slots[randomIndex].becomeInfected(new Classes.Bug()); // Infect plant
            }
        };
        return Field;
    }());
    Classes.Field = Field;
})(Classes || (Classes = {}));
//# sourceMappingURL=Field.js.map