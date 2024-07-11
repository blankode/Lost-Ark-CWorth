let list_data = [];
let craft_amount = 30; 

//category (0 = discount; 1 = time reduction)
let category = {
    general: [ 0, 0],
    potion: [ 0, 0],
    special: [ 0, 0],
    grenade: [ 0, 0],
    others: [ 0, 0],
    bomb: [ 0, 0],
    cooking: [ 0, 0],
}

function build_data () {
    //populate list
    for (let item in prices) {
        if (prices.hasOwnProperty(item)) {
            calculate_price(item)
        }
    }
    //sort list
    list_data.sort((a, b) => b.profit - a.profit)
    console.log(list_data)
    fill_data()
}

function fill_data (type) {
    //write main data
    let content = document.getElementById("content")
    list_data.forEach(item => {
        content.innerHTML +=`
      <tr>
      <th scope="row">
      <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${item.item}" preserveAspectRatio="xMidYMid slice" focusable="false">
        <defs>
            <pattern id="${item.rarity[1]}" patternUnits="userSpaceOnUse" width="32" height="32">
            <image href="${item.rarity[0]}" x="0" y="0" width="32" height="32"/>
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#${item.rarity[1]})"/>
        <image href="${item.icon}" x="0" y="0" width="32" height="32"/>
        <text x="50%" y="50%" fill="#000" dy=".3em" text-anchor="middle" dominant-baseline="middle"></text>
        </svg>
      </th>
      <td>${item.item}</td>
      <td>${craft_amount}</td>
      <td>${(item.profit * craft_amount).toFixed(2)} <span class="badge"><img src="https://static.invenglobal.com/img/lostark/dataninfo/item/costgold.png" width="18" height="18"></span></td>
    </tr>
      `;
    });

    //write item prices
    if (type != "refresh_data") {
        let content = document.getElementById("item_prices")
        list_data.forEach(item => {
            content.innerHTML += `
            <tr>
            <th scope="row"><svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${item.item}" preserveAspectRatio="xMidYMid slice" focusable="false">
            <defs>
                <pattern id="${item.rarity[1]}" patternUnits="userSpaceOnUse" width="32" height="32">
                <image href="${item.rarity[0]}" x="0" y="0" width="32" height="32"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#${item.rarity[1]})"/>
            <image href="${item.icon}" x="0" y="0" width="32" height="32"/>
            <text x="50%" y="50%" fill="#000" dy=".3em" text-anchor="middle" dominant-baseline="middle"></text></th>
            <td>${item.item}</td>
            <td>
            <form>
            <div class="form-group">
              <input type="text" class="form-control" id="${item.item}"><span class="input-group-text"><img src="https://static.invenglobal.com/img/lostark/dataninfo/item/costgold.png" width="18" height="18"></span>
            </div>
            </form>
            </div>
            </div>
            </td>
          </tr>
            `

        },
    );
    list_data.forEach(item => {
        let element = document.getElementById(item.item)
        element.value = prices[item.item]
    });
    }

}

function refresh_data () {
    let content = document.getElementById("content")
    content.innerHTML = ""
    fill_data()
}

function calculate_price (item) {
    let recipe = items[item];
    let sell_value = recipe["sell_amount"];
    let time = recipe["time"];
    let batch = recipe["quantity"];
    let craft_cost = recipe["recipe"]["crafting_cost"];
    let market_loss = 0.95;
    
    let total_cost = 0;
    let invested_gold = 0;
    let profit = 0;

    //apply discount to craft cost
    let discount = 0;
    discount += category.general[0]
    discount += items[item].category[0]
    let discountAmount = (discount / 100) * craft_cost;
    craft_cost -= discountAmount

    recipe.recipe.ingredients.forEach(ingredient => {
        //price of material is divided to qty then multiplied with batch number
        invested_gold += materials[ingredient.name][1] / materials[ingredient.name][2] * ingredient.quantity
    })
    invested_gold += craft_cost
    invested_gold = invested_gold.toFixed(2)
    //console.log(invested_gold);

    //sell value is determined by price of item multiplied with market_loss and the result with the number of batch
    sell_value *= market_loss * batch
    sell_value = sell_value.toFixed(2)

    //console.log(sell_value);

    profit = sell_value - invested_gold;
    profit = profit.toFixed(2)

    let item_data = {};
    //append data to list
    list_data.push(Object.assign({}, item_data, {
        item: item,
        //category: items[item].category,
        profit: profit,
        rarity: items[item].rarity,
        icon: items[item].icon
    }));
}

function save_prices () {
    for (const item in prices) {
        if (prices.hasOwnProperty(item)) {
            let element = document.getElementById(item)
            console.log(element)
            if (element) {
                console.log(prices[item])
                prices[item] = Number(element.value);
        }
    }
}
}
//current price for all items
const prices = {
    "Time Stop Potion" : 43,
    "Major HP Potion" : 17,
    "Elemental HP Potion" : 40,
    "(F) Prime Oreha Fusion Material" : 70,
    "(E) Prime Oreha Fusion Material" : 70,
    "(H) Prime Oreha Fusion Material" : 70
}

//rarities
const rarity = {
    normal: ["https://static.invenglobal.com/img/lostark/dataninfo/item/bg_grade_01.png", "normal"],
    uncommon: ["https://static.invenglobal.com/img/lostark/dataninfo/item/bg_grade_02.png", "uncommon"],
    rare: ["https://static.invenglobal.com/img/lostark/dataninfo/item/bg_grade_03.png", "rare"],
    epic: ["https://static.invenglobal.com/img/lostark/dataninfo/item/bg_grade_04.png", "epic"],
    legendary: ["https://static.invenglobal.com/img/lostark/dataninfo/item/bg_grade_05.png", "legendary"],
    relic: ["https://static.invenglobal.com/img/lostark/dataninfo/item/bg_grade_06.png", "relic"],
    ancient: ["https://static.invenglobal.com/img/lostark/dataninfo/item/bg_grade_07.png", "ancient"],
    sidereal: ["https://static.invenglobal.com/img/lostark/dataninfo/item/bg_grade_08.png", "sidereal"]
}

//Materials (0 = name; 1 = price; 2 = qty_bought/ea; 3 = icon URL; 4 = rarity)
const materials = {
    "Wild Flower": ["Wild Flower", "50", "100", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_8_46.png", rarity.normal],
    "Shy Wild Flower": ["Shy Wild Flower", "12", "10", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_4_14.png", rarity.uncommon],
    "Bright Wild Flower": ["Bright Wild Flower", "45", "10", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_8_47.png", rarity.rare],
    "Crude Mushroom": ["Crude Mushroom", "49", "100", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_8_56.png", rarity.normal],
    "Fresh Mushroom": ["Fresh Mushroom", "10", "10", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/all_quest_02_101.png", rarity.uncommon],
    "Exquisite Mushroom": ["Exquisite Mushroom", "49", "10", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_8_57.png", rarity.rare],
    "Ancient Relic": ["Ancient Relic", "77", "100", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_9_3.png", rarity.normal],
    "Rare Relic": ["Rare Relic", "16", "10", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_9_4.png", rarity.uncommon],
    "Oreha Relic": ["Oreha Relic", "98", "10", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_9_11.png", rarity.rare],
    "Iron Ore": ["Iron Ore", "63", "100", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_3_243.png", rarity.normal],
    "Heavy Iron Ore": ["Heavy Iron Ore", "9", "10", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_3_239.png", rarity.uncommon],
    "Strong Iron Ore": ["Strong Iron Ore", "51", "10", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_5_76.png", rarity.rare],
    "Thick Raw Meat": ["Thick Raw Meat", "143", "100", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_2_192.png", rarity.normal],
    "Treated Meat": ["Treated Meat", "13", "10", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_2_196.png", rarity.uncommon],
    "Oreha Thick Meat" : ["Oreha Thick Meat", "83", "10", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_8_67.png", rarity.rare],
    "Fish" : ["Fish", "69", "100", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_1_142.png", rarity.normal],
    "Redflesh Fish" : ["Redflesh Fish", "14", "10", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_4_49.png", rarity.uncommon],
    "Oreha Solar Carp" : ["Oreha Solar Carp", "87", "10", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_8_74.png", rarity.rare],
    "Natural Pearl" : ["Natural Pearl", "15", "10", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_8_72.png", rarity.uncommon],
    "Timber" : ["Timber", "88", "100", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_3_252.png", rarity.normal],
    "Tender Timber" : ["Tender Timber", "16", "10", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_3_253.png", rarity.uncommon],
    "Sturdy Timber" : ["Sturdy Timber", "103", "10", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_4_4.png", rarity.rare],
    "Tough Leather" : ["Tough Leather", "15", "10", "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/use_2_204.png", rarity.uncommon],
}

//Items (0 = name, 1 = sell price, 2 = recipe )

 /*recipe details

recipe[0] = Item Name
recipe[1] = Batch
recipe[2] = Batch No *
recipe[3] = Material 1
recipe[4] = Material 1 qty
recipe[5] = Material 2
recipe[6] = Material 2 qty
etc
*/

const items = {
    "Time Stop Potion" : {
        quantity: 3, //batch amount
        sell_amount: prices["Time Stop Potion"],
        icon: "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/battle_item_01_76.png",
        rarity: rarity.epic,
        category: category.potion,
        time: "01:00:00",
        recipe: {
            crafting_cost: 30,
            ingredients: [
                {
                    name: "Bright Wild Flower",
                    quantity: 2
                },
                {
                    name: "Sturdy Timber",
                    quantity: 2
                },
                {
                    name: "Shy Wild Flower",
                    quantity: 20
                },
                {
                    name: "Rare Relic",
                    quantity: 2
                },
                {
                    name: "Wild Flower",
                    quantity: 40
                },
            ]
        }
    },
    "Major HP Potion" : {
        quantity: 3, //batch amount
        sell_amount: prices["Major HP Potion"],
        icon: "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/battle_item_01_7.png",
        rarity: rarity.rare,
        category: category.potion,
        time: "00:30:00",
        recipe: {
            crafting_cost: 15,
            ingredients: [
                {
                    name: "Shy Wild Flower",
                    quantity: 9
                },
                {
                    name: "Wild Flower",
                    quantity: 18
                },
            ]
        }
    },
    "Elemental HP Potion" : {
        quantity: 3, //batch amount
        sell_amount: prices["Elemental HP Potion"],
        icon: "https://static.invenglobal.com/img/lostark/dataninfo/itemicon/battle_item_01_8.png",
        rarity: rarity.epic,
        category: category.potion,
        time: "01:00:00",
        recipe: {
            crafting_cost: 30,
            ingredients: [
                {
                    name: "Bright Wild Flower",
                    quantity: 6
                },
                {
                    name: "Shy Wild Flower",
                    quantity: 24
                },
                {
                    name: "Wild Flower",
                    quantity: 48
                },
            ]
        }
    },
    "(F) Prime Oreha Fusion Material" : {
        quantity: 15, //batch amount
        sell_amount: prices["(F) Prime Oreha Fusion Material"],
        icon: "https://static.inven.co.kr/image_2011/site_image/lostark/itemicon/use_11_29.png",
        rarity: rarity.epic,
        category: category.special,
        time: "01:03:00",
        recipe: {
            crafting_cost: 300,
            ingredients: [
                {
                    name: "Oreha Solar Carp",
                    quantity: 52
                },
                {
                    name: "Natural Pearl",
                    quantity: 69
                },
                {
                    name: "Fish",
                    quantity: 142
                },
            ]
        }
    },
    "(E) Prime Oreha Fusion Material" : {
        quantity: 15, //batch amount
        sell_amount: prices["(E) Prime Oreha Fusion Material"],
        icon: "https://static.inven.co.kr/image_2011/site_image/lostark/itemicon/use_11_29.png?v=231024a",
        rarity: rarity.epic,
        category: category.special,
        time: "01:03:00",
        recipe: {
            crafting_cost: 300,
            ingredients: [
                {
                    name: "Oreha Relic",
                    quantity: 52
                },
                {
                    name: "Rare Relic",
                    quantity: 51
                },
                {
                    name: "Ancient Relic",
                    quantity: 107
                },
            ]
        }
    },
    "(H) Prime Oreha Fusion Material" : {
        quantity: 15, //batch amount
        sell_amount: prices["(H) Prime Oreha Fusion Material"],
        icon: "https://static.inven.co.kr/image_2011/site_image/lostark/itemicon/use_11_29.png?v=231024a",
        rarity: rarity.epic,
        category: category.special,
        time: "01:03:00",
        recipe: {
            crafting_cost: 300,
            ingredients: [
                {
                    name: "Oreha Thick Meat",
                    quantity: 52
                },
                {
                    name: "Tough Leather",
                    quantity: 69
                },
                {
                    name: "Thick Raw Meat",
                    quantity: 142
                },
            ]
        }
    }
}