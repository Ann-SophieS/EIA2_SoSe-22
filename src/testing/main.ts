namespace Classes{

    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {

        let startMoney = 5000;
        let startPriceVariationMin = 0.5;
        let startPriceVariationMax = 1.5;

        
        let mainGame = new Game(<HTMLTableElement>document.getElementById("#gameTable1"), startMoney, startPriceVariationMin, startPriceVariationMax);

        populateShop(mainGame.gameShop);

        mainGame.gameShop.drawShop();


    }

    function populateShop(shop : Shop){ //Fill shop with items

        let carott = new PlantItem(new PlantProperties(
            20,   // totalGrowTime
            0,   // fertilizerNeeded
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

        let avocat = new PlantItem(new PlantProperties(
            120,   // totalGrowTime
            1,   // fertilizerNeeded
            10,   // waterNeeded
            500, // buyPrice
            800, // sellPrice
            [    // Appearance (first is thumbnail //FIXME really?)
                "https://i.pinimg.com/736x/40/b5/75/40b57539a3a8db466e3dd876f9d7a4c4.jpg",
                "https://image.spreadshirtmedia.com/image-server/v1/mp/compositions/T812A1PA3140PT17X57Y44D1023450643FS3567/views/1,width=378,height=378,appearanceId=1,backgroundColor=FFFFFF,noPt=true/avogato-cat-avocado-funny-kawaii-gift-mens-premium-t-shirt.jpg",
                "https://i.pinimg.com/736x/f7/1d/72/f71d721e712f1869ae7fd9e807ffdcb8.jpg"
            ],
            "Avocato" //Name
        ));

        let potat = new PlantItem(new PlantProperties(
            60,   // totalGrowTime
            2,   // fertilizerNeeded
            2,   // waterNeeded
            300, // buyPrice
            500, // sellPrice
            [    // Appearance (first is thumbnail //FIXME really?)
                "https://cdn.wallpapersafari.com/86/41/FfVRah.jpg",
                "https://e4p7c9i3.stackpathcdn.com/wp-content/uploads/2018/09/5-47.jpg?iv=29",
                "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/451b5b5e-41f9-40f0-8fda-7c53cb4941ac/d4mnpat-f5e16793-b78a-4baa-84c6-dbf7b1114fe4.png/v1/fill/w_982,h_813,q_75,strp/drawing_for_my_friend___badass_potato_by_tirish-d4mnpat.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sIm9iaiI6W1t7InBhdGgiOiIvZi80NTFiNWI1ZS00MWY5LTQwZjAtOGZkYS03YzUzY2I0OTQxYWMvZDRtbnBhdC1mNWUxNjc5My1iNzhhLTRiYWEtODRjNi1kYmY3YjExMTRmZTQucG5nIiwid2lkdGgiOiI8PTk4MiIsImhlaWdodCI6Ijw9ODEzIn1dXX0.r21rdTqe8m-bliSWMjMmS1p3xkdprWooXFHiYNw1yNA"
            ],
            "Potato" //Name
        ));

        let lettuce = new PlantItem(new PlantProperties(
            10,   // totalGrowTime
            0,   // fertilizerNeeded
            1,   // waterNeeded
            50, // buyPrice
            100, // sellPrice
            [    // Appearance (first is thumbnail //FIXME really?)
                "https://image.spreadshirtmedia.com/image-server/v1/compositions/1006423543/views/1,width=650,height=650,appearanceId=1,version=1565757568/a-cute-little-green-lettuce-shouting-a-cheer-to-keep-focus-on-what-it-needs-to-do-its-head-band-says-ganbatte-the-witty-and-amusing-pun-humor-text-r.jpg",
                "https://i.pinimg.com/originals/fb/1b/c4/fb1bc470b39ebcaeb4a94e03ee54e5e1.png",
                "https://i.pinimg.com/originals/57/48/93/5748930ddc7f585ab4d91378d1440b1d.jpg"
            ],
            "Lettuce" //Name
        ));

        let dandelion = new PlantItem(new PlantProperties(
            240,   // totalGrowTime
            5,   // fertilizerNeeded
            20,   // waterNeeded
            1000, // buyPrice
            5000, // sellPrice
            [    // Appearance (first is thumbnail //FIXME really?)
                "https://thumbs.dreamstime.com/z/cartoon-dandelion-lion-cute-zierblume-mit-lustigem-l%C3%B6wenkopf-einfache-darstellung-von-vektorklammern-164139119.jpg",
                "https://i.etsystatic.com/19418086/c/1534/1220/524/1265/il/6e2352/2944205142/il_500x500.2944205142_rlhy.jpg",
                "https://i.pinimg.com/originals/57/48/93/5748930ddc7f585ab4d91378d1440b1d.jpg"
            ],
            "Dandelion" //Name
        ));;

        let waterItem = new UtilityItem(0,"Water","https://energyrecovery.com/wp-content/uploads/2020/11/Water_movement_hirez.jpg",Effect.water);
        let fertilizerItem = new UtilityItem(50,"Fertilizer","https://i.pinimg.com/736x/10/97/5e/10975e17959cec7dfa30c2f88b7af29c.jpg",Effect.Fertilize);
        let debuggerItem = new UtilityItem(50,"Pesticide","https://i.pinimg.com/originals/6b/82/18/6b8218ff0e97bb033c01ba3608203543.jpg",Effect.killBug);

        shop.addItem(carott);
        shop.addItem(potat);
        shop.addItem(avocat);
        shop.addItem(lettuce);
        shop.addItem(dandelion);
        shop.addItem(waterItem);
        shop.addItem(fertilizerItem);
        shop.addItem(debuggerItem);
        console.log("Carrot created!");
    }

}
