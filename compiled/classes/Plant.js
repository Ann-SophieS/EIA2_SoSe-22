var Classes;
(function (Classes) {
    var Plant = /** @class */ (function () {
        function Plant(properties) {
            this.growthStage = Classes.Growth.Sprout;
            this.timeSincePlanted = 0;
            this.amountWatered = 0;
            this.amountFertilized = 0;
            this.infected = null;
            this.properties = properties;
            this.dead = false;
        }
        Plant.prototype.setPlanted = function (plantedOn, plantedAt) {
            this.associatedField = plantedOn;
            this.plantedAtIndex = plantedAt;
            // https://stackoverflow.com/questions/2001920/calling-a-class-prototype-method-by-a-setinterval-event
            this.growthTimer = setInterval(this.growTimerTick.bind(this), (1000 * this.associatedField.getTimescale()));
            // bind value source to class plant (this)
        };
        Plant.prototype.propertiesChanged = function () {
            this.associatedField.drawSlot(this.plantedAtIndex);
        };
        /**
         * Gets the appearance of the plant
         * @returns URL to the appearance image
         */
        Plant.prototype.getCurrentAppearance = function () {
            if (this.isDead())
                return "https://cdn.dribbble.com/users/2406564/screenshots/6759331/screen_shot_2019-07-09_at_10.16.32_pm.png"; //FIXME Custom ded icon for every plant
            return this.properties.appearance[this.growthStage];
        };
        /**
         * Waters the plant
         */
        Plant.prototype.waterPlant = function () {
            if (this.amountWatered + 1 > this.properties.waterNeeded) {
                this.die(); // If the plant has been watered too much, it dies
            }
            else {
                this.amountWatered = this.amountWatered + 1;
            }
        };
        /**
         * Makes a plant die
         */
        Plant.prototype.die = function () {
            this.dead = true;
            console.log("Plant on field " + this.plantedAtIndex + " died :(.");
            clearInterval(this.growthTimer); // A dead plant cant grow
            this.propertiesChanged();
        };
        /**
         * Fertilizes the plant
         */
        Plant.prototype.fertilizePlant = function () {
            if (this.amountFertilized + 1 > this.properties.fertilizerNeeded) {
                this.die(); // Too much fertilizer kills the plant
            }
            else {
                this.amountFertilized = this.amountFertilized + 1;
            }
        };
        /**
         * Gets how much the plant has been watered
         * @returns How often the plant has been watered
         */
        Plant.prototype.getAmountWatered = function () {
            return this.amountWatered;
        };
        /**
         * Gets the amount of fertilizer used on the plant
         * @returns How often the plant has been fertilized
         */
        Plant.prototype.getAmountFertilized = function () {
            return this.amountFertilized;
        };
        Plant.prototype.getProperties = function () {
            return this.properties;
        };
        /**
         * Checks whether the plant is infected with a Bug
         * @returns True if the plant is infected
         */
        Plant.prototype.isInfected = function () {
            if (this.infected != null) {
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * Removes the bug from the Plant
         */
        Plant.prototype.fixBug = function () {
            if (this.isInfected() == true) {
                this.infected.fix(); //Stop the kill timer of the bug
                this.infected = null; // and remove the Bug from the Plant
            }
        };
        /**
         * Harvests a plant
         * @return Price the Plant was sold at, -1 if the plant could not be harvested
         */
        Plant.prototype.harvest = function () {
            if (this.isHarvestable()) {
                if (this.isDead()) {
                    return 0;
                }
                else {
                    return this.properties.sellPrice;
                }
            }
            else {
                return -1;
            }
        };
        /**
         * Handles growth of the plant
         */
        Plant.prototype.growTimerTick = function () {
            this.timeSincePlanted = this.timeSincePlanted + 1; // Increase the time since planting
            console.log("Plant is growing, time since planted : " + this.timeSincePlanted);
            console.log(this);
            console.log(this.getStatistics());
            // Check if the full grow time has expired
            if (this.timeSincePlanted >= this.properties.totalGrowTime && this.growthStage == Classes.Growth.Growing) {
                //Check if the plant had enough fertilizer
                if (this.amountFertilized == this.properties.fertilizerNeeded) {
                    // Check if the plant was watered enough
                    if (this.amountWatered == this.properties.waterNeeded) {
                        // If the plant had enough water and fertilizer it can be harvested...
                        this.growthStage = Classes.Growth.Harvest;
                        // ...and cant grow further
                        clearInterval(this.growthTimer);
                        console.log("Plant is harvestable");
                        console.log(this.properties.appearance);
                        this.propertiesChanged();
                    }
                    else {
                        this.die(); // Not enough water -> Ded
                    }
                }
                else {
                    this.die(); // Not enough fertilizer -> Ded
                }
                // Check if half of the grow time has expired
            }
            else if (this.timeSincePlanted >= (this.properties.totalGrowTime * 0.5) && this.growthStage == Classes.Growth.Sprout) {
                //Check if the plant had enough fertilizer
                if (this.amountFertilized >= Math.floor(this.properties.fertilizerNeeded / 2)) {
                    // Check if the plant was watered enough
                    if (this.amountFertilized >= Math.floor(this.properties.waterNeeded / 2)) {
                        // If the plant had enough water and fertilizer, it grows
                        this.growthStage = Classes.Growth.Growing;
                        console.log("A Plant grew");
                        this.propertiesChanged();
                    }
                    else {
                        this.die(); // Not enough water -> Ded
                    }
                }
                else {
                    this.die(); // Not enough fertilizer -> Ded
                }
            }
        };
        /**
         * Get growth statistics of a plant
         * @returns A String containing statistics of the plant
         */
        Plant.prototype.getStatistics = function () {
            // https://www.geeksforgeeks.org/how-to-create-multi-line-strings-in-javascript/
            var statistics = "<table border='1'>" +
                "<tr>" +
                "<td>" + "Growth stage : " + "</td><td>" + this.growthStage.toString() + "</td>" +
                "</tr><tr>" +
                "<td>" + "Water: " + "</td><td>" + this.amountWatered + " / " + this.properties.waterNeeded + "</td>" +
                "</tr><tr>" +
                "<td>" + "Fertilizer : " + "</td><td>" + this.amountFertilized + " / " + this.properties.fertilizerNeeded + "</td>" +
                "</tr><tr>" +
                "<td>" + "Possible profit : " + "</td><td>" + (this.properties.sellPrice - this.properties.buyPrice) + "</td>" +
                "</tr></table>";
            //TODO Add more statistics
            if (this.isHarvestable()) {
                statistics =
                    "Plant is ready for harvest!\n" +
                        "Sell price will be : " + this.properties.sellPrice + "\n" +
                        "Your profit: " + (this.properties.sellPrice - this.properties.buyPrice) + "\n";
            }
            if (this.isDead()) {
                statistics = "This plant is dead. Great. Good job. Poor plan(t)ing :(";
            }
            return statistics;
        };
        /**
         * Processes a specified effect on the plant
         * @param effect Effect to be applied on the plant
         */
        Plant.prototype.processEffect = function (effect) {
            switch (effect) { //FIXME IfElse
                case Classes.Effect.Fertilize:
                    this.fertilizePlant();
                    break;
                case Classes.Effect.killBug:
                    this.fixBug();
                    break;
                case Classes.Effect.water:
                    this.waterPlant();
                    break;
            }
        };
        /**
         * Adds an infection to the plant
         * @param bug The bug to infect the plant with
         */
        Plant.prototype.becomeInfected = function (bug) {
            if (this.infected == null) {
                this.infected = bug;
            }
        };
        /**
         * Checks if the plant can be harvested
         * @return Returns true if the plant is fully grown or dead, else false
         */
        Plant.prototype.isHarvestable = function () {
            if (this.isDead() || this.growthStage == Classes.Growth.Harvest) {
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * Checks if the plant is alive or dead
         * @returns True if the plant is dead, else false
         */
        Plant.prototype.isDead = function () {
            return this.dead;
        };
        return Plant;
    }());
    Classes.Plant = Plant;
})(Classes || (Classes = {}));
//# sourceMappingURL=Plant.js.map