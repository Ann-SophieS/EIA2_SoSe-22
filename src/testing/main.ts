namespace Classes{

    window.addEventListener("load", handleLoad);
    let crc2: CanvasRenderingContext2D;

    function handleLoad(_event: Event): void {
        // https://github.com/JirkaDellOro/EIA2-Inverted/blob/master/X00_Code/L08_Canvas/Alley/Alley.ts
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        console.log(canvas);
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        let mainGame = new Game(crc2);
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
        const myTimeout = setTimeout((game : Game)=>{
            console.log("Harvesting plant");
            console.log("Plant harvested at " + game.gameField.harvestPlantAtSelected());
            console.log(game.gameField.getPlantAtSelected());
        }, 20000,mainGame);
    }

    function populateShop(shop : Shop){
        let carrotProps = new PlantProperties();
        carrotProps.appearance = ["https://i.pinimg.com/originals/28/50/7b/28507bd69091c6562390aa25f4140d23.jpg",
                                  "https://clipartmag.com/images/carrot-cake-clipart-20.png",
                                  "https://thumbs.dreamstime.com/b/carrot-strong-cool-serious-vegetable-powerful-strict-vector-illustration-carrot-strong-cool-serious-vegetable-powerful-strict-139713024.jpg"];
        carrotProps.buyPrice = 100;
        carrotProps.fertilizerNeeded = 2;
        carrotProps.name = "Karotto";
        carrotProps.sellPrice = 200;
        carrotProps.totalGrowTime = 4;
        carrotProps.waterNeeded = 2;

        let carrotItem = new PlantItem(carrotProps);

        console.log("Adding item : ");
        console.log(carrotItem);

        shop.addItem(carrotItem);
        console.log("Carrot created!");
    }

}
