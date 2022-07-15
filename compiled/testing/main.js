var Classes;
(function (Classes) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        var mainGame = new Classes.Game(document.getElementById("#gameTable1"));
        console.log("Game created!");
        populateShop(mainGame.gameShop);
        mainGame.gameShop.drawShop();
        mainGame.money = 1000;
        mainGame.gameField.selectedSlot = 0;
    }
    function populateShop(shop) {
        var carrotItem = new Classes.PlantItem(new Classes.PlantProperties(20, // totalGrowTime
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
        var debuggerItem = new Classes.UtilityItem(0, "Pesticide", "https://i.pinimg.com/originals/6b/82/18/6b8218ff0e97bb033c01ba3608203543.jpg", Classes.Effect.killBug);
        shop.addItem(carrotItem);
        shop.addItem(potatoItem);
        shop.addItem(waterItem);
        shop.addItem(fertilizerItem);
        shop.addItem(debuggerItem);
        console.log("Carrot created!");
    }
})(Classes || (Classes = {}));
//# sourceMappingURL=main.js.map