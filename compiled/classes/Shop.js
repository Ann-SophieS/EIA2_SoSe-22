var Classes;
(function (Classes) {
    var Shop = /** @class */ (function () {
        /**
         * Sets up shop
         * @param associatedField Field the shop is associated to
         */
        function Shop(associatedField, associatedGame) {
            this.timer = setInterval(this.varyPrices, 60000); //FIXME Adjust timer to timescale
            this.priceVaryMultiplicator = 1;
            this.items = [];
            this.associatedField = associatedField;
            this.associatedGame = associatedGame;
        }
        /**
         * Handles price fluctuations (timer)
         */
        Shop.prototype.varyPrices = function () {
            // https://www.codegrepper.com/code-examples/javascript/get+random+number+between+range+typescript
            // Generate random price multiplicator between 1.5 and 0.5
            this.priceVaryMultiplicator = Math.random() * (1.5 - 0.5) + 0.5;
        };
        Shop.prototype.drawShop = function () {
            for (var i = 0; i <= this.items.length - 1; i++) {
                //https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement/insertRow
                var newRow = this.associatedGame.shopTable.insertRow(-1);
                var propsRow = this.associatedGame.shopTable.insertRow(-1);
                newRow.addEventListener("click", this.buyItem.bind(this, this.items[i]), false);
                propsRow.addEventListener("click", this.buyItem.bind(this, this.items[i]), false);
                // Insert a cell in the row at index 0
                var propertiesCell = propsRow.insertCell(0);
                var textCell = newRow.insertCell(0);
                var imageCell = newRow.insertCell(0);
                imageCell.rowSpan = 2;
                imageCell.innerHTML = "<img width='100' height='100' src='" + this.items[i].shopThumbnail + "'/>";
                // Append a text node to the cell 
                textCell.appendChild(document.createTextNode(this.items[i].name));
                if (this.items[i].constructor.name == Classes.PlantItem.name) {
                    propertiesCell.innerHTML = ("Cost : " + this.items[i].price.toString() + "<br>" +
                        "Grow time : " + this.items[i].properties.totalGrowTime + " seconds<br>" +
                        "Sell Price : " + this.items[i].properties.sellPrice + "<br>" +
                        "Needs: " + this.items[i].properties.fertilizerNeeded + " fertilizer and " + this.items[i].properties.waterNeeded + " water");
                }
                else {
                    propertiesCell.innerHTML = (("Kosten : " + this.items[i].price.toString() + "\n"));
                }
            }
        };
        /**
         * Buys an item from the shop
         * @param item The item that was bought
         * @returns True if the purchase was successful
         */
        Shop.prototype.buyItem = function (item) {
            console.log("User wants to buy : " + item.name);
            // https://stackoverflow.com/questions/13613524/get-an-objects-class-name-at-runtime
            if (item.constructor.name == Classes.PlantItem.name) { // If the bought item is a plant...
                //give selected item the properties of the clicked plant item
                var toPlant = new Classes.Plant(item.properties);
                if (this.associatedField.plantAtSelected(toPlant)) {
                    if (this.associatedGame.removeMoney(item.price) == false) {
                        return false;
                    }
                }
                else {
                    return true;
                }
            }
            else if (item.constructor.name == Classes.UtilityItem.name) { // If the bought item is a utility...
                var selectedPlant = this.associatedField.getPlantAtSelected();
                if (selectedPlant != null) {
                    if (this.associatedGame.removeMoney(item.price) == false) {
                        return false;
                    }
                    selectedPlant.processEffect(item.effectOnPlant);
                    this.associatedField.drawCurrentSlot();
                    return true;
                }
            }
            return false;
        };
        /**
         * Adds a new item to the shop
         * @param item Item to be added to the shop
         * @returns returns false if an item with the same name already exsists in the shop
         */
        Shop.prototype.addItem = function (item) {
            for (var itemCounter = 0; itemCounter <= this.items.length - 1; itemCounter++) {
                if (this.items[itemCounter].name == item.name) {
                    return false;
                }
            }
            this.items.push(item);
            return true;
        };
        return Shop;
    }());
    Classes.Shop = Shop;
})(Classes || (Classes = {}));
//# sourceMappingURL=Shop.js.map