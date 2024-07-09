/*Below find prices for each item*/

//Materials (0 = name; 1 = price; 2 = qty_bought/ea; 3 = icon URL; 4 = rarity)
const materials = [
    wild_flower = ["Wild Flower", "50", "100", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_8_46.png", "gray"],
    shy_wild_flower = ["Shy Wild Flower", "12", "10", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_4_14.png", "green"],
    bright_wild_flower = ["Bright Wild Flower", "45", "10", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_8_47.png", "blue"],
    crude_mushroom = ["Crude Mushroom", "49", "100", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_8_56.png", "gray"],
    fresh_mushroom = ["Fresh Mushroom", "10", "10", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/all_quest_02_101.png", "green"],
    exquisite_mushroom = ["Exquisite Mushroom", "49", "10", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_8_57.png", "blue"],
    ancient_relic = ["Ancient Relic", "77", "100", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_9_3.png", "gray"],
    rare_relic = ["Rare Relic", "16", "10", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_9_4.png", "green"],
    oreha_relic = ["Oreha Relic", "98", "10", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_9_11.png", "blue"],
    iron_ore = ["Iron Ore", "63", "100", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_3_243.png", "gray"],
    heavy_iron_ore = ["Heavy Iron Ore", "9", "10", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_3_239.png", "green"],
    strong_iron_ore = ["Strong Iron Ore", "51", "10", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_5_76.png", "blue"],
    thick_raw_meat = ["Thick Raw Meat", "143", "100", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_2_192.png", "gray"],
    treated_meat = ["Treated Meat", "13", "10", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_2_196.png", "green"],
    oreha_thick_meat = ["Oreha Thick Meat", "83", "10", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_8_67.png", "blue"],
    fish = ["Fish", "69", "100", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_1_142.png", "gray"],
    redflesh_fish = ["Redflesh Fish", "14", "10", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_4_49.png", "green"],
    oreha_solar_carp = ["Oreha Solar Carp", "87", "10", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_8_74.png", "blue"],
    natural_pearl = ["Natural Pearl", "15", "10", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_8_72.png", "green"],
    timber = ["Timber", "88", "100", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_3_252.png", "gray"],
    tender_timber = ["Tender Timber", "16", "10", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_3_253.png", "green"],
    sturdy_timber = ["Sturdy Timber", "103", "10", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_4_4.png", "blue"],
];

//Items (0 = name, 1 = sell price, 2 = recipe )

 /*recipe details

recipe[0] = Item Name
recipe[1] = Batch
recipe[2] = Batch No *
recipe[3] = Material 1
recipe[4] = Material 1 qty
recipe[5] = Material 2
recipe[6] = Material 2 qty
recipe[7] = Material 3
recipe[8] = Material 3 qty
recipe[9] = Material 4
recipe[10] = Material 4 qty
recipe[11] = Material 5
recipe[12] = Material 5 qty
recipe[13] = Material 6
recipe[14] = Material 6 qty
recipe[15] = Material 7
recipe[16] = Material 7 qty
recipe[17] = Material 8
recipe[18] = Material 8 qty
*/

const items = [
    time_stop_potion = ["Time Stop Potion", "43", recipe = [
        "Time Stop Potion", 
        "Batch", 
        "3",
        "Bright Wild Flower",
        "2",
        "Sturdy Timber",
        "2",
        "Shy Wild Flower",
        "20",
        "Rare Relic",
        "2",
        "Wild Flower",
        "40",
        "Crafting cost",
        "30",
        "Time to craft",
        //HH:MM:SS
        "01:00:00"
    ],
],
    time_stop_potion = ["Time Stop Potion", "43", recipe = [
        "Time Stop Potion", 
        "Batch", 
        "3",
        "Bright Wild Flower",
        "2",
        "Sturdy Timber",
        "2",
        "Shy Wild Flower",
        "20",
        "Rare Relic",
        "2",
        "Wild Flower",
        "40",
        "Crafting cost",
        "30",
        "Time to craft",
        //HH:MM:SS
        "01:00:00"
    ],
    ],
];