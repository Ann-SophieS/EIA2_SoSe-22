var Classes;
(function (Classes) {
    var Field = /** @class */ (function () {
        /**
         *
         * @param fieldSize Amount of slots for plants on the field
         */
        function Field(fieldSize, associatedGame) {
            this.fieldSize = fieldSize; // Save field size (see top)
            this.slots = []; // Create empty array (needed for fill)
            this.slots.fill(null, 0, fieldSize); // Fill array with nulls 
            this.selectedSlot = -1; // -1 can never be reached (User has not yet selected a field at the beginning)
            // FIXME Bug timer not adjusted to timescale
            this.generateBugTimer = setInterval(this.bugTimerTick, 1000);
            this.associatedGame = associatedGame;
            this.drawField();
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
            if (this.fieldSize <= fieldIndex) {
                return false;
            }
            // If all is good, plant the plant
            this.slots[fieldIndex] = plant;
            this.drawField();
            return true;
        };
        Field.prototype.drawField = function () {
            var w = 0;
            var h = 0;
            w = this.associatedGame.renderingContext.canvas.width; //FIXME Static values
            h = this.associatedGame.renderingContext.canvas.height;
            //w *= 0.75; // Make field 3/4 of canvas size, 1/4 is sidebar
            var fieldSizePX = (w / (Math.floor(Math.sqrt(this.fieldSize))));
            this.associatedGame.renderingContext.clearRect(0, 0, w, h);
            var innerIndex = 0;
            for (var y = 0; y <= h; y += fieldSizePX) {
                for (var x = 0; x <= w; x += fieldSizePX) {
                    this.associatedGame.renderingContext.moveTo(x, 0);
                    this.associatedGame.renderingContext.lineTo(x, h);
                    this.associatedGame.renderingContext.stroke();
                    if (x >= fieldSizePX && x <= w && y >= fieldSizePX && y <= h) {
                        var fieldText = innerIndex.toString();
                        if (this.slots[innerIndex] != null) {
                            fieldText += "\nPlant";
                        }
                        if (this.selectedSlot == innerIndex) {
                            fieldText += "\nSelected"; //TODO Print stats to sidebar
                        }
                        this.associatedGame.renderingContext.moveTo(x - (fieldSizePX * 0.5), y - (fieldSizePX * 0.5));
                        this.associatedGame.renderingContext.fillText(fieldText, x - (fieldSizePX * 0.5), y - (fieldSizePX * 0.5));
                        //this.associatedGame.renderingContext.arc(x-(fieldSizePX*0.5), y-(fieldSizePX*0.5), (fieldSizePX*0.25), 0, 2 * Math.PI, false);
                        this.associatedGame.renderingContext.fill();
                        this.associatedGame.renderingContext.stroke();
                        innerIndex++;
                    }
                    this.associatedGame.renderingContext.moveTo(0, y);
                    this.associatedGame.renderingContext.lineTo(w, y);
                    this.associatedGame.renderingContext.stroke();
                }
            }
        };
        /**
         * Handles the event if the user clicked the field
         * @param x X coordinate the user has clicked
         * @param y Y coordinate the user has clicked
         */
        Field.prototype.handleClick = function (x, y) {
            var fieldSizePX = ((this.associatedGame.renderingContext.canvas.width) / (Math.floor(Math.sqrt(this.fieldSize))));
            var row = Math.trunc(x / fieldSizePX) % Math.floor(Math.sqrt(this.fieldSize));
            var col = Math.trunc(y / fieldSizePX) % Math.floor(Math.sqrt(this.fieldSize));
            console.log("Field size is: " + fieldSizePX);
            console.log("Row : " + row);
            console.log("Col : " + col);
            console.log("User Clicked at index : " + ((col * Math.floor(Math.sqrt(this.fieldSize))) + row));
            this.selectedSlot = ((col * Math.floor(Math.sqrt(this.fieldSize))) + row);
            this.drawField();
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