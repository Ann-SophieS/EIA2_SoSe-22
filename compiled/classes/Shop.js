var Classes;
(function (Classes) {
    var Shop = /** @class */ (function () {
        /**
         * Sets up shop
         * @param associatedField Field the shop is associated to
         */
        function Shop(associatedField, associatedGame, minPriceVariation, maxPriceVariation) {
            this.timer = setInterval(this.varyPrices.bind(this), 60000); //FIXME Adjust timer to timescale
            this.priceVaryMultiplicator = 1;
            this.items = [];
            this.associatedField = associatedField;
            this.associatedGame = associatedGame;
            this.minPriceVariation = minPriceVariation;
            this.maxPriceVariation = maxPriceVariation;
        }
        /**
         * Handles price fluctuations (timer)
         */
        Shop.prototype.varyPrices = function () {
            // https://www.codegrepper.com/code-examples/javascript/get+random+number+between+range+typescript
            // Generate random price multiplicator between maxPriceVariation and minPriceVariation
            this.priceVaryMultiplicator = Math.random() * (this.maxPriceVariation - this.minPriceVariation) + this.minPriceVariation;
            for (var item = 0; item <= this.items.length; item++) {
                if (this.items[item] != null) {
                    this.items[item].buyPriceModifier = Math.floor((this.items[item].price * this.priceVaryMultiplicator) - this.items[item].price);
                    if (this.items[item].constructor.name == Classes.PlantItem.name) {
                        this.items[item].sellPriceModifier = Math.floor((this.items[item].properties.sellPrice * this.priceVaryMultiplicator) - this.items[item].properties.sellPrice);
                    }
                }
            }
            this.drawShop();
        };
        Shop.prototype.drawShop = function () {
            this.associatedGame.shopTable.innerHTML = "";
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
                    propertiesCell.innerHTML = ("Cost : " + (this.items[i].price + this.items[i].buyPriceModifier).toString() + "<br>" +
                        "Grow time : " + this.items[i].properties.totalGrowTime + " seconds<br>" +
                        "Sell Price : " + (this.items[i].properties.sellPrice + this.items[i].sellPriceModifier) + "<br>" +
                        "Needs: " + this.items[i].properties.fertilizerNeeded + " fertilizer and " + this.items[i].properties.waterNeeded + " water");
                }
                else {
                    propertiesCell.innerHTML = (("Cost : " + (this.items[i].price + this.items[i].buyPriceModifier).toString() + "\n"));
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
                if (this.associatedGame.removeMoney(item.price + item.buyPriceModifier) == true) {
                    var toPlant = new Classes.Plant(item.properties);
                    if (this.associatedField.plantAtSelected(toPlant) == false) {
                        this.associatedGame.addMoney(item.price + item.buyPriceModifier);
                    }
                    else {
                        return true;
                    }
                }
                else {
                }
            }
            else if (item.constructor.name == Classes.UtilityItem.name) { // If the bought item is a utility...
                var selectedPlant = this.associatedField.getPlantAtSelected();
                if (this.associatedGame.removeMoney(item.price + item.buyPriceModifier) == true) {
                    if (selectedPlant != null) {
                        selectedPlant.processEffect(item.effectOnPlant);
                        this.associatedField.drawCurrentSlot();
                        return true;
                    }
                    else {
                        this.associatedGame.addMoney(item.price + item.buyPriceModifier);
                        return false;
                    }
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