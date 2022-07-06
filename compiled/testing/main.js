var Classes;
(function (Classes) {
    window.addEventListener("load", handleLoad);
    var crc2;
    function handleLoad(_event) {
        // https://github.com/JirkaDellOro/EIA2-Inverted/blob/master/X00_Code/L08_Canvas/Alley/Alley.ts
        var canvas = document.querySelector("canvas");
        console.log(canvas);
        if (!canvas)
            return;
        crc2 = canvas.getContext("2d");
        var mainGame = new Classes.Game(crc2);
        console.log("Game created!");
        populateShop(mainGame.gameShop);
        mainGame.money = 1000;
        mainGame.gameField.selectedSlot = 0;
        console.log("Item bought success: " + mainGame.gameShop.buyItem(mainGame.gameShop.items[0]));
        mainGame.gameField.getPlantAtSelected().waterPlant();
        mainGame.gameField.getPlantAtSelected().waterPlant();
        mainGame.gameField.getPlantAtSelected().fertilizePlant();
        mainGame.gameField.getPlantAtSelected().fertilizePlant();
        console.log("Fertilized and watered plant. Now we wait");
        var myTimeout = setTimeout(function (game) {
            console.log("Harvesting plant");
            console.log("Plant harvested at " + game.gameField.harvestPlantAtSelected());
            console.log(game.gameField.getPlantAtSelected());
        }, 20000, mainGame);
    }
    function populateShop(shop) {
        var carrotProps = new Classes.PlantProperties();
        carrotProps.appearance = ["https://i.pinimg.com/originals/28/50/7b/28507bd69091c6562390aa25f4140d23.jpg",
            "https://clipartmag.com/images/carrot-cake-clipart-20.png",
            "https://thumbs.dreamstime.com/b/carrot-strong-cool-serious-vegetable-powerful-strict-vector-illustration-carrot-strong-cool-serious-vegetable-powerful-strict-139713024.jpg"];
        carrotProps.buyPrice = 100;
        carrotProps.fertilizerNeeded = 2;
        carrotProps.name = "Karotto";
        carrotProps.sellPrice = 200;
        carrotProps.totalGrowTime = 4;
        carrotProps.waterNeeded = 2;
        var carrotItem = new Classes.PlantItem(carrotProps);
        console.log("Adding item : ");
        console.log(carrotItem);
        shop.addItem(carrotItem);
        console.log("Carrot created!");
    }
})(Classes || (Classes = {}));
//# sourceMappingURL=main.js.map