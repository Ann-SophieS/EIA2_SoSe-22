namespace Classes{

    window.addEventListener("load", handleLoad);
    let crc2: CanvasRenderingContext2D;

    function handleLoad(_event: Event): void {
        // https://github.com/JirkaDellOro/EIA2-Inverted/blob/master/X00_Code/L08_Canvas/Alley/Alley.ts
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        let shopTable : HTMLTableElement | null = <HTMLTableElement>document.getElementById("#shop");
        let statsDiv : HTMLDivElement | null = <HTMLDivElement>document.getElementById("#stats");
        console.log(canvas);
        if (!canvas || !shopTable)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");



        let mainGame = new Game(crc2);
        console.log("Game created!");

        canvas.addEventListener('click', function(event) {

                const rect = canvas.getBoundingClientRect()
                const x = event.clientX - rect.left
                const y = event.clientY - rect.top
                //console.log("x: " + x + " y: " + y)
                
                mainGame.gameField.handleClick(x, y);

                let plant : Plant = mainGame.gameField.getPlantAtSelected();

                if(plant != null){
                    statsDiv.innerHTML = plant.getStatistics();
                }else{
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
        const myTimeout = setTimeout((game : Game)=>{
            console.log("Harvesting plant");
            console.log("Plant harvested at " + game.gameField.harvestPlantAtSelected());
            console.log(game.gameField.getPlantAtSelected());
        }, 20000,mainGame);
    }

    function populateShop(shop : Shop){

        let carrotItem = new PlantItem(new PlantProperties(
            4,   // totalGrowTime
            2,   // fertilizerNeeded
            2,   // waterNeeded
            100, // buyPrice
            200, // sellPrice
            [    // Appearance (first is thumbnail //FIXME really?)
                "https://i.pinimg.com/originals/28/50/7b/28507bd69091c6562390aa25f4140d23.jpg",
                "https://clipartmag.com/images/carrot-cake-clipart-20.png",
                "https://thumbs.dreamstime.com/b/carrot-strong-cool-serious-vegetable-powerful-strict-vector-illustration-carrot-strong-cool-serious-vegetable-powerful-strict-139713024.jpg"
            ],
            "Karotto" //Name
        ));

        let potatoItem = new PlantItem(new PlantProperties(
            60,   // totalGrowTime
            2,   // fertilizerNeeded
            2,   // waterNeeded
            100, // buyPrice
            200, // sellPrice
            [    // Appearance (first is thumbnail //FIXME really?)
                "https://cdn.wallpapersafari.com/86/41/FfVRah.jpg",
                "https://e4p7c9i3.stackpathcdn.com/wp-content/uploads/2018/09/5-47.jpg?iv=29",
                "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/451b5b5e-41f9-40f0-8fda-7c53cb4941ac/d4mnpat-f5e16793-b78a-4baa-84c6-dbf7b1114fe4.png/v1/fill/w_982,h_813,q_75,strp/drawing_for_my_friend___badass_potato_by_tirish-d4mnpat.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sIm9iaiI6W1t7InBhdGgiOiIvZi80NTFiNWI1ZS00MWY5LTQwZjAtOGZkYS03YzUzY2I0OTQxYWMvZDRtbnBhdC1mNWUxNjc5My1iNzhhLTRiYWEtODRjNi1kYmY3YjExMTRmZTQucG5nIiwid2lkdGgiOiI8PTk4MiIsImhlaWdodCI6Ijw9ODEzIn1dXX0.r21rdTqe8m-bliSWMjMmS1p3xkdprWooXFHiYNw1yNA"
            ],
            "Potat" //Name
        ));

        console.log("Adding item : ");
        console.log(carrotItem);
        console.log(potatoItem)

        shop.addItem(carrotItem);
        shop.addItem(potatoItem);
        console.log("Carrot created!");
    }

}
