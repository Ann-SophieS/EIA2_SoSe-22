var Classes;
(function (Classes) {
    window.addEventListener("load", handleLoad);
    var crc2;
    function handleLoad(_event) {
        // https://github.com/JirkaDellOro/EIA2-Inverted/blob/master/X00_Code/L08_Canvas/Alley/Alley.ts
        var canvas = document.querySelector("canvas"); // if element not found on site, canvas is null
        var shopTable = document.getElementById("#shop");
        var statsDiv = document.getElementById("#stats");
        console.log(canvas);
        if (!canvas || !shopTable || !statsDiv) // Check if all needed elements are present
            return; // Game won't be loaded
        crc2 = canvas.getContext("2d");
        var mainGame = new Classes.Game(crc2);
        console.log("Game created!");
        canvas.addEventListener('click', function (event) {
            var rect = canvas.getBoundingClientRect(); // Get position of rectangle on the page
            var x = event.clientX - rect.left; // subtract pixels that are not on canvas
            var y = event.clientY - rect.top;
            mainGame.gameField.handleClick(x, y); // call method handleClick in gameField of mainGame
            var plant = mainGame.gameField.getPlantAtSelected(); // get selected plant
            if (plant != null) {
                statsDiv.innerHTML = plant.getStatistics(); // Show statistics of selected plant
            }
            else {
                statsDiv.innerHTML = "You can plant here";
            }
        }, false);
        populateShop(mainGame.gameShop);
        mainGame.gameShop.drawShop(shopTable);
        mainGame.money = 1000;
        mainGame.gameField.selectedSlot = 0;
        console.log("Item bought success: " + mainGame.gameShop.buyItem(mainGame.gameShop.items[0]));
        mainGame.gameField.getPlantAtSelected().waterPlant();
        mainGame.gameField.getPlantAtSelected().waterPlant();
        mainGame.gameField.getPlantAtSelected().fertilizePlant();
        mainGame.gameField.getPlantAtSelected().fertilizePlant();
        mainGame.gameField.drawField();
        console.log("Fertilized and watered plant. Now we wait");
        var myTimeout = setTimeout(function (game) {
            console.log("Harvesting plant");
            console.log("Plant harvested at " + game.gameField.harvestPlantAtSelected());
            console.log(game.gameField.getPlantAtSelected());
        }, 20000, mainGame);
    }
    function populateShop(shop) {
        var carrotItem = new Classes.PlantItem(new Classes.PlantProperties(4, // totalGrowTime
        2, // fertilizerNeeded
        2, // waterNeeded
        100, // buyPrice
        200, // sellPrice
        [
            "https://i.pinimg.com/originals/28/50/7b/28507bd69091c6562390aa25f4140d23.jpg",
            "https://clipartmag.com/images/carrot-cake-clipart-20.png",
            "https://thumbs.dreamstime.com/b/carrot-strong-cool-serious-vegetable-powerful-strict-vector-illustration-carrot-strong-cool-serious-vegetable-powerful-strict-139713024.jpg"
        ], "Karotto" //Name
        ));
        var potatoItem = new Classes.PlantItem(new Classes.PlantProperties(60, // totalGrowTime
        2, // fertilizerNeeded
        2, // waterNeeded
        100, // buyPrice
        200, // sellPrice
        [
            "https://cdn.wallpapersafari.com/86/41/FfVRah.jpg",
            "https://e4p7c9i3.stackpathcdn.com/wp-content/uploads/2018/09/5-47.jpg?iv=29",
            "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/451b5b5e-41f9-40f0-8fda-7c53cb4941ac/d4mnpat-f5e16793-b78a-4baa-84c6-dbf7b1114fe4.png/v1/fill/w_982,h_813,q_75,strp/drawing_for_my_friend___badass_potato_by_tirish-d4mnpat.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sIm9iaiI6W1t7InBhdGgiOiIvZi80NTFiNWI1ZS00MWY5LTQwZjAtOGZkYS03YzUzY2I0OTQxYWMvZDRtbnBhdC1mNWUxNjc5My1iNzhhLTRiYWEtODRjNi1kYmY3YjExMTRmZTQucG5nIiwid2lkdGgiOiI8PTk4MiIsImhlaWdodCI6Ijw9ODEzIn1dXX0.r21rdTqe8m-bliSWMjMmS1p3xkdprWooXFHiYNw1yNA"
        ], "Potat" //Name
        ));
        var waterItem = new Classes.UtilityItem(0, "Water", "https://energyrecovery.com/wp-content/uploads/2020/11/Water_movement_hirez.jpg", Classes.Effect.water);
        var fertilizerItem = new Classes.UtilityItem(0, "Fertilizer", "https://i.pinimg.com/736x/10/97/5e/10975e17959cec7dfa30c2f88b7af29c.jpg", Classes.Effect.Fertilize);
        shop.addItem(carrotItem);
        shop.addItem(potatoItem);
        shop.addItem(waterItem);
        shop.addItem(fertilizerItem);
        console.log("Carrot created!");
    }
})(Classes || (Classes = {}));
//# sourceMappingURL=main.js.map