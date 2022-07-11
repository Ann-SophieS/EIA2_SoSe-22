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
        /**
         * Harvests the Plant at a specified spot on the field
         * @param index the spot on the field to harvest
         * @returns the price the Plant was sold at, -1 if the plant couldnt be harvested
         */
        Field.prototype.harvestPlantAt = function (index) {
            //FIXME Check if index is on the field 
            //FIXME Check if spot even has a plant
            var harvestSellPrice = this.slots[index].harvest();
            if (harvestSellPrice != -1) {
                this.slots[index] = null;
                return harvestSellPrice;
            }
            return harvestSellPrice;
        };
        /**
         * Harvests the Plant the user has currently selected
         * @returns the price the Plant was sold at, -1 if the plant couldnt be harvested
         */
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
            //Tell the plant where it was planted 
            plant.setPlanted(this, fieldIndex);
            // and plant it
            this.slots[fieldIndex] = plant;
            // update the slot with the new apperance
            this.drawSlot(fieldIndex);
            return true;
        };
        /**
         * Draws the contents of all slots on the whole field on the canvas
         */
        Field.prototype.drawField = function () {
            for (var i = 0; i <= this.fieldSize; i++)
                this.drawSlot(i);
        };
        /**
         * (Re)Draws the contents of a specific slot on the canvas
         * @param index Slot to draw
         */
        Field.prototype.drawSlot = function (index) {
            var _this = this;
            var canvasWidth = this.associatedGame.renderingContext.canvas.width; // Get width of whole canvas
            var rowLength = (Math.sqrt(this.fieldSize)); // calculate amount of fields in one row
            var fieldSizePX = (canvasWidth / rowLength); // calculate size of one slot
            // Get top left corner of slot (px)
            var startY = Math.trunc(index / rowLength) * fieldSizePX;
            var startX = (index % rowLength) * fieldSizePX;
            this.associatedGame.renderingContext.clearRect(startX, startY, fieldSizePX, fieldSizePX); // Clear the slot
            this.associatedGame.renderingContext.strokeRect(startX, startY, fieldSizePX, fieldSizePX); // Draw the border around the field
            var fieldText = index.toString();
            if (this.slots[index] != null) { // If there is a plant on the slot, display it and draw its stats
                var apperance_1 = new Image();
                apperance_1.src = this.slots[index].getCurrentAppearance();
                apperance_1.addEventListener("load", function () {
                    _this.associatedGame.renderingContext.drawImage(apperance_1, startX + 10, startY + 10, fieldSizePX - 20, fieldSizePX - 20);
                    _this.associatedGame.renderingContext.fillStyle = 'blue'; //First text (water) will be blue
                    _this.associatedGame.renderingContext.fillText((_this.slots[index].getAmountWatered() + " / " + _this.slots[index].getProperties().waterNeeded), startX + (fieldSizePX * 0.1), startY + (fieldSizePX * 0.2));
                    _this.associatedGame.renderingContext.fillStyle = 'green'; //Second text (fertilizer) will be green
                    _this.associatedGame.renderingContext.fillText((_this.slots[index].getAmountFertilized() + " / " + _this.slots[index].getProperties().fertilizerNeeded), startX + (fieldSizePX * 0.1), startY + (fieldSizePX * 0.3));
                    _this.associatedGame.renderingContext.fillStyle = 'black'; // Reset the text color
                });
            }
            if (this.selectedSlot == index) {
                this.associatedGame.renderingContext.strokeRect(startX + 2, startY + 2, fieldSizePX - 4, fieldSizePX - 4); // Draw border around selected field
            }
            //Show the index of the field //FIXME remove
            this.associatedGame.renderingContext.moveTo(startX + (fieldSizePX * 0.5), startY + (fieldSizePX * 0.5));
            this.associatedGame.renderingContext.fillText(fieldText, startX + (fieldSizePX * 0.5), startY + (fieldSizePX * 0.5));
        };
        /**
         * (Re)Draws the contents of the currently selected slot
         */
        Field.prototype.drawCurrentSlot = function () {
            this.drawSlot(this.selectedSlot);
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
            var oldSlot = this.selectedSlot;
            this.selectedSlot = ((col * Math.floor(Math.sqrt(this.fieldSize))) + row);
            this.drawSlot(oldSlot);
            this.drawSlot(this.selectedSlot);
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