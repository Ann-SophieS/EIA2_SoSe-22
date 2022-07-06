namespace Classes{

let mainGame = new Game();
console.log("Game created!");

let carrotProps = new PlantProperties();
carrotProps.appearance = "Karodden";
carrotProps.buyPrice = 100;
carrotProps.fertilizerNeeded = 2;
carrotProps.name = "Karotto";
carrotProps.sellPrice = 200;
carrotProps.totalGrowTime = 4;
carrotProps.waterNeeded = 2;

let carrotItem = new PlantItem(carrotProps);

console.log("Adding item : ");
console.log(carrotItem);

mainGame.gameShop.addItem(carrotItem);
console.log("Carrot created!");
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