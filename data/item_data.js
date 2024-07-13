const prices = {
    //items
        "Superior Oreha Fusion Material": 26,
        "Basic Oreha Fusion Material": 13,
        "Prime Oreha Fusion Material": 72,
        "[Masterwork] Master's Herb Steak Meal": 600,
        "Atropine Potion": 56,
        "Clay Grenade": 13,
        "Corrosive Bomb": 21,
        "Dark Grenade": 23,
        "Destruction Bomb": 24,
        "Elemental HP Potion": 40,
        "Flame Grenade": 22,
        "Flare": 7,
        "Frost Grenade": 9,
        "Major HP Potion": 17,
        "Panacea": 21,
        "Pheromone Essence": 40,
        "Protective Potion": 11,
        "Sacred Charm": 24,
        "Sleep Bomb": 24,
        "Splendid Elemental HP Potion": 110,
        "Splendid Panacea": 59,
        "Sprinter's Robe": 27,
        "Stimulant": 49,
        "Time Stop Potion": 43,
        "Whirlwind Grenade": 19,
    //materials
        "Wild Flower": 57,
        "Shy Wild Flower": 12,
        "Bright Wild Flower": 53,
        "Crude Mushroom": 52,
        "Fresh Mushroom": 10,
        "Exquisite Mushroom": 53,
        "Ancient Relic": 84,
        "Rare Relic": 17,
        "Oreha Relic": 110,
        "Iron Ore": 56,
        "Heavy Iron Ore": 12,
        "Strong Iron Ore": 58,
        "Thick Raw Meat": 145,
        "Treated Meat": 24,
        "Oreha Thick Meat": 83,
        "Fish": 74,
        "Redflesh Fish": 16,
        "Oreha Solar Carp":98,
        "Natural Pearl": 18,
        "Timber": 100,
        "Tender Timber": 17,
        "Sturdy Timber": 97,
        "Tough Leather": 16
}

//category (0 = discount; 1 = time reduction)
let category = {
    General: [0, 0],
    Potion: [0, 0],
    Special: [0, 0],
    Grenade: [0, 0],
    Others: [0, 0],
    Bomb: [0, 0],
    Cooking: [0, 0],
}

let list_data = [];
let craft_amount = 30;

function build_data() {
    //populate list
    for (let item in items) {
        if (items.hasOwnProperty(item)) {
            calculate_price(item)
        }
    }
    //sort list
    list_data.sort((a, b) => b.profit - a.profit)
    fill_data()
}

let count_items = 1

function fill_data(type) {
    //write main data
    let content = document.getElementById("content")
    let profit = 0
    list_data.forEach(item => {
        profit = (item.profit * craft_amount).toFixed(2)
        time_amount = multiplyTime(item.time, craft_amount);
        if (count_items <= 5) {
            content.innerHTML += `
            <tr class="table">
            <th scope="row">
            <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="48" height="48" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${item.item}" preserveAspectRatio="xMidYMid slice" focusable="false">
              <defs>
                  <pattern id="${item.rarity[1]}" patternUnits="userSpaceOnUse" width="48" height="48">
                  <image href="${item.rarity[0]}" x="0" y="0" width="48" height="48"/>
                  </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#${item.rarity[1]})"/>
              <image href="${item.icon}" x="0" y="0" width="48" height="48"/>
              <text x="50%" y="50%" fill="#000" dy=".3em" text-anchor="middle" dominant-baseline="middle"></text>
              </svg>
            </th>
            <td><span class="${item.rarity[1]} item_title">${item.item} x ${item.batch}</span> <span class="badge rounded-pill text-bg-warning">Top ${count_items} craft</span>
            <table class="table">
            <thead class="thead-dark">
                <tr>
                <th scope="col">Material</th>
                <th scope="col">Qty</th>
                <th scope="col">Qty x${craft_amount}</th>
                <th scope="col">Gold</th>
                </tr>
            </thead>
            <tbody id="materials_${item.item}">
            </tbody>
            </table>
            </td>
            <td>${time_amount}</td>
            <td>${profit} <img src="./img/icons/gold.png" width="18" height="18">
            </td>
          </tr>
            `;
            count_items++
        } else {
            content.innerHTML += `
            <tr>
            <th scope="row">
            <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="48" height="48" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${item.item}" preserveAspectRatio="xMidYMid slice" focusable="false">
              <defs>
                  <pattern id="${item.rarity[1]}" patternUnits="userSpaceOnUse" width="48" height="48">
                  <image href="${item.rarity[0]}" x="0" y="0" width="48" height="48"/>
                  </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#${item.rarity[1]})"/>
              <image href="${item.icon}" x="0" y="0" width="48" height="48"/>
              <text x="50%" y="50%" fill="#000" dy=".3em" text-anchor="middle" dominant-baseline="middle"></text>
              </svg>
            </th>
            <td><span class="${item.rarity[1]} item_title">${item.item} x ${item.batch}</span> <span hidden id="no-profit${item.item}" class="badge rounded-pill text-bg-danger">NO PROFIT</span>
            <table class="table">
            <thead class="thead-dark">
                <tr>
                <th scope="col">Material</th>
                <th scope="col">Qty</th>
                <th scope="col">Qty x${craft_amount}</th>
                <th scope="col">Gold</th>
                </tr>
            </thead>

            <tbody id="materials_${item.item}">
            </tbody>
            </table>
            </td>
            <td>${time_amount}</td>
            <td>${profit} <img src="./img/icons/gold.png" width="18" height="18">
            </td>
          </tr>
            `;
            if (profit < 0) {
                document.getElementById("no-profit"+item.item).removeAttribute("hidden")
            }
        }

        //write material info
        const ingredients = items[item.item].recipe.ingredients;
        let mats_price = 0
        let total_mats_price = 0
        element = document.getElementById("materials_"+item.item)
        for (let i = 0; i < ingredients.length; i++) {
            element.innerHTML += `
            <tr>
            <td>
                <span class="${materials[ingredients[i].name][4][1]}">
                <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="18" height="18" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${item.item}" preserveAspectRatio="xMidYMid slice" focusable="false">
                <defs>
                    <pattern id="material_bg${materials[ingredients[i].name][4][1]}" patternUnits="userSpaceOnUse" width="18" height="18">
                    <image href="${materials[ingredients[i].name][4][0]}" x="0" y="0" width="18" height="18"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#material_bg${materials[ingredients[i].name][4][1]})"/>
                <image href="${materials[ingredients[i].name][3]}" x="0" y="0" width="18" height="18"/>
                <text x="50%" y="50%" fill="#000" dy=".3em" text-anchor="middle" dominant-baseline="middle"></text>
                </svg>
                ${ingredients[i].name}</span>
            </td>
            <td>
                <span class="quantity">x ${ingredients[i].quantity}</span>
            </td>
            <td>
                <span class="quantity">x ${(ingredients[i].quantity * craft_amount).toFixed(0)}</span>
            </td>
            <td>
                ${(mats_price = (materials[ingredients[i].name][1] / materials[ingredients[i].name][2]).toFixed(2) * (ingredients[i].quantity * craft_amount).toFixed(0)).toFixed(0)}<span class="badge"><img src="./img/icons/gold.png" width="18" height="18"></span>
            </td>
            </tr>
            `
            total_mats_price += mats_price
        };
        element.innerHTML += `
        <tr style="border-style: hidden">
        <td>
        </td>
        <td></td>
        <td>Total</td>
        <td><strong>${total_mats_price}</strong><span class="badge"><img src="./img/icons/gold.png" width="18" height="18"></span></td>
        </tr>
        `
    });
    document.getElementById("craft_cost").value = craft_amount
    get_item_prices(type)
}

function get_item_prices(type) {
    let element = document.getElementById("sidebar_type")
    element.innerHTML = `
    <th scope="col">Item</th>
    <th scope="col">Price</th>
    `
    element = document.getElementById("sidebar_nav")
    element.innerHTML = `
    <li class="nav-item">
        <a class="nav-link active" href="#">Item Prices</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#" onclick="get_material_prices()">Material Prices</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#" onclick="get_reductions()">Reductions</a>
    </li>
    `
    element = document.getElementById("sidebar_data")
    element.innerHTML = ""
    if (type != "refresh_data") {
        for (let i = 0; i < list_data.length; i++) {
            let item = list_data[i];
            if (item.is_duplicate[0] === 1) {
                //do nothing
            } else {
                element.innerHTML += `
            <tr>
            <td>
            <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${item.item}" preserveAspectRatio="xMidYMid slice" focusable="false">
            <defs>
                <pattern id="${item.rarity[1]}" patternUnits="userSpaceOnUse" width="32" height="32">
                <image href="${item.rarity[0]}" x="0" y="0" width="32" height="32"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#${item.rarity[1]})"/>
            <image href="${item.icon}" x="0" y="0" width="32" height="32"/>
            <text x="50%" y="50%" fill="#000" dy=".3em" text-anchor="middle" dominant-baseline="middle"></text>
            <span>${item.is_duplicate[1]}</span>
            </td>
            <td>

            <div class="input-group mb-3">
            <input type="text" class="form-control" id="${item.item}">
            <span class="input-group-text"><img src="./img/icons/gold.png" width="18" height="18"></span>
          </div>
            </td>
            </tr>
            `
            }
        }
        for (let i = 0; i < list_data.length; i++) {
            let item = list_data[i];
            let element = document.getElementById(item.item)
            if (item.is_duplicate[0] === 1) {
                //do nothing
            } else {
                element.value = prices[item.is_duplicate[1]]
            }
        };
    }
}

function get_material_prices() {
    let element = document.getElementById("sidebar_type")
    element.innerHTML = `
    <th scope="col">Item</th>
    <th scope="col">Price</th>
    `
    element = document.getElementById("sidebar_nav")
    element.innerHTML = `
    <li class="nav-item">
        <a class="nav-link" href="#" onclick="get_item_prices()">Item Prices</a>
    </li>
    <li class="nav-item">
        <a class="nav-link active" href="#">Material Prices</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#" onclick="get_reductions()">Reductions</a>
    </li>
    `
    element = document.getElementById("sidebar_data")
    element.innerHTML = ""
    for (const material in materials) {
        let item = materials[material]
        if (materials[material][5] == "material") {
            element.innerHTML += `
            <tr>
            <td>
            <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${item.item}" preserveAspectRatio="xMidYMid slice" focusable="false">
            <defs>
                <pattern id="${item[4][1]}" patternUnits="userSpaceOnUse" width="32" height="32">
                <image href="${item[4][0]}" x="0" y="0" width="32" height="32"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#${item[4][1]})"/>
            <image href="${item[3]}" x="0" y="0" width="32" height="32"/>
            <text x="50%" y="50%" fill="#000" dy=".3em" text-anchor="middle" dominant-baseline="middle"></text>
            <span>${item[0]}</span>
            </td>
            <td>
            <div class="input-group mb-3">
      <input type="text" class="form-control" id="${item[0]}">
      <span class="input-group-text"><img src="./img/icons/gold.png" width="18" height="18"></span>
    </div>
            </td>
            </tr>
            `
        }
    }
    for (const material in materials) {
        if (materials[material][5] == "material") {
            let item = materials[material]
            let element = document.getElementById(item[0])
            element.value = item[1]
        }
    }
}

function get_reductions() {
    let element = document.getElementById("sidebar_type")
    element.innerHTML = `
    <th scope="col">Type</th>
    <th scope="col">Cost discount</th>
    <th scope="col">Time reduction</th>
    `
    element = document.getElementById("sidebar_nav")
    element.innerHTML = `
    <li class="nav-item">
        <a class="nav-link" href="#" onclick="get_item_prices()">Item Prices</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#" onclick="get_material_prices()">Material Prices</a>
    </li>
    <li class="nav-item">
        <a class="nav-link active" href="#">Reductions</a>
    </li>
    `
    let type
    element = document.getElementById("sidebar_data")
    element.innerHTML = ""
    for (let item in category) {
        element.innerHTML += `
        <tr>
            <td>${item}</td>
            <td>
            <div class="input-group mb-3">
            <input type="text" class="form-control" id="${item}_cost_discount">
            <span class="input-group-text">%</span>
          </div>
          </td>
            <td>
            <div class="input-group mb-3">
      <input type="text" class="form-control" id="${item}_time_reduction">
      <span class="input-group-text">%</span>
    </div>
            </td>
        </tr>
        `
    }
    for (let item in category) {
        document.getElementById(item+"_cost_discount").value = category[item][0]
        document.getElementById(item+"_time_reduction").value = category[item][1]
    }
}

function calculate_price(item) {
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
    discount += category.General[0]
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
        batch: batch,
        time: time,
        //category: items[item].category,
        profit: profit,
        rarity: recipe.rarity,
        icon: recipe.icon,
        is_duplicate: recipe.is_duplicate
    }));
}

function save_prices() {
    for (const item in prices) {
        if (prices.hasOwnProperty(item)) {
            let element = document.getElementById(item)
            if (element) {
                prices[item] = Number(element.value);
            }
        }
    }
}

function refresh_data() {
    let content = document.getElementById("content")
    content.innerHTML = ""
    fill_data()
}

function multiplyTime(timeString, multiplier) {
    // Split the time string into parts
    const [hours, minutes, seconds] = timeString.split(':').map(Number);

    // Convert the time into total seconds
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;

    // Multiply the total seconds by the multiplier
    totalSeconds *= multiplier;

    // Calculate the new hours, minutes, and seconds
    const newHours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const newMinutes = Math.floor(totalSeconds / 60);
    const newSeconds = totalSeconds % 60;

    // Helper function to format each part
    function formatPart(value, singular, plural) {
        return value === 1 ? `${value} ${singular}` : `${value} ${plural}`;
    }

    // Format the new time string
    const parts = [];
    if (newHours > 0) parts.push(formatPart(newHours, "Hour", "Hours"));
    if (newMinutes > 0) parts.push(formatPart(newMinutes, "minute", "minutes"));
    if (newSeconds > 0) parts.push(formatPart(newSeconds, "second", "seconds"));

    // Join parts into the final string
    return parts.join(', ').replace(/,([^,]*)$/, ' and$1');
}

//rarities
const rarity = {
    normal: ["./img/icons/bg_grade_01.png", "normal"],
    uncommon: ["./img/icons/bg_grade_02.png", "uncommon"],
    rare: ["./img/icons/bg_grade_03.png", "rare"],
    epic: ["./img/icons/bg_grade_04.png", "epic"],
    legendary: ["./img/icons/bg_grade_05.png", "legendary"],
    relic: ["./img/icons/bg_grade_06.png", "relic"],
    ancient: ["./img/icons/bg_grade_07.png", "ancient"],
    sidereal: ["./img/icons/bg_grade_08.png", "sidereal"]
}

//Materials (0 = name; 1 = price; 2 = qty_bought/ea; 3 = icon URL; 4 = rarity)
const materials = {
    "Wild Flower": ["Wild Flower", prices["Wild Flower"], "100", "./img/icons/use_8_46648a.png", rarity.normal, "material"],
    "Shy Wild Flower": ["Shy Wild Flower", prices["Shy Wild Flower"], "10", "./img/icons/use_4_14648a.png", rarity.uncommon, "material"],
    "Bright Wild Flower": ["Bright Wild Flower", prices["Bright Wild Flower"], "10", "./img/icons/use_8_47648a.png", rarity.rare, "material"],
    "Crude Mushroom": ["Crude Mushroom", prices["Crude Mushroom"], "100", "./img/icons/use_8_56648a.png", rarity.normal, "material"],
    "Fresh Mushroom": ["Fresh Mushroom", prices["Fresh Mushroom"], "10", "./img/icons/all_quest_02.png", rarity.uncommon, "material"],
    "Exquisite Mushroom": ["Exquisite Mushroom", prices["Exquisite Mushroom"], "10", "./img/icons/use_8_57648a.png", rarity.rare, "material"],
    "Ancient Relic": ["Ancient Relic", prices["Ancient Relic"], "100", "./img/icons/use_9_3648a.png", rarity.normal, "material"],
    "Rare Relic": ["Rare Relic", prices["Rare Relic"], "10", "./img/icons/use_9_4648a.png", rarity.uncommon, "material"],
    "Oreha Relic": ["Oreha Relic", prices["Oreha Relic"], "10", "./img/icons/use_9_11648a.png", rarity.rare, "material"],
    "Iron Ore": ["Iron Ore", prices["Iron Ore"], "100", "./img/icons/use_3_243.png", rarity.normal, "material"],
    "Heavy Iron Ore": ["Heavy Iron Ore", prices["Heavy Iron Ore"], "10", "./img/icons/use_3_239648a.png", rarity.uncommon, "material"],
    "Strong Iron Ore": ["Strong Iron Ore", prices["Strong Iron Ore"], "10", "./img/icons/use_5_76648a.png", rarity.rare, "material"],
    "Thick Raw Meat": ["Thick Raw Meat", prices["Thick Raw Meat"], "100", "./img/icons/use_2_192648a.png", rarity.normal, "material"],
    "Treated Meat": ["Treated Meat", prices["Treated Meat"], "10", "./img/icons/use_2_196648a.png", rarity.uncommon, "material"],
    "Oreha Thick Meat": ["Oreha Thick Meat", prices["Oreha Thick Meat"], "10", "./img/icons/use_8_67648a.png", rarity.rare, "material"],
    "Fish": ["Fish", prices["Fish"], "100", "./img/icons/use_1_142648a.png", rarity.normal, "material"],
    "Redflesh Fish": ["Redflesh Fish", prices["Redflesh Fish"], "10", "./img/icons/use_4_49648a.png", rarity.uncommon, "material"],
    "Oreha Solar Carp": ["Oreha Solar Carp", prices["Oreha Solar Carp"], "10", "./img/icons/use_8_74648a.png", rarity.rare, "material"],
    "Natural Pearl": ["Natural Pearl", prices["Natural Pearl"], "10", "./img/icons/use_8_72.png", rarity.uncommon, "material"],
    "Timber": ["Timber", prices["Timber"], "100", "./img/icons/use_3_252648a.png", rarity.normal, "material"],
    "Tender Timber": ["Tender Timber", prices["Tender Timber"], "10", "./img/icons/use_3_253.png", rarity.uncommon, "material"],
    "Sturdy Timber": ["Sturdy Timber", prices["Sturdy Timber"], "10", "./img/icons/use_4_4648a.png", rarity.rare, "material"],
    "Tough Leather": ["Tough Leather", prices["Tough Leather"], "10", "./img/icons/use_2_204648a.png", rarity.uncommon, "material"],
    "Elemental HP Potion": ["Elemental HP Potion", prices["Elemental HP Potion"], "1", "./img/icons/battle_item_01_7.png", rarity.rare, "item"],
    "Panacea": ["Panacea", prices["Panacea"], "1", "./img/icons/battle_item_01_17.png", rarity.rare, "item"]
}

const items = {
    "[Excavating] Basic Oreha Fusion Material": {
        quantity: 30, // batch amount
        sell_amount: prices["Basic Oreha Fusion Material"],
        icon: "./img/icons/use_9_71.png",
        rarity: rarity.rare,
        category: category.Special,
        time: "00:45:00",
        is_duplicate: [0, "Basic Oreha Fusion Material"],
        recipe: {
            crafting_cost: 205,
            ingredients: [{
                    name: "Oreha Relic",
                    quantity: 8
                },
                {
                    name: "Rare Relic",
                    quantity: 26
                },
                {
                    name: "Ancient Relic",
                    quantity: 64
                }
            ]
        }
    },
    "[Excavating] Prime Oreha Fusion Material": {
        quantity: 15,
        sell_amount: prices["Prime Oreha Fusion Material"],
        icon: "./img/icons/use_11_29648a.png",
        rarity: rarity.epic,
        category: category.Special,
        time: "01:03:00",
        is_duplicate: [0, "Prime Oreha Fusion Material"],
        recipe: {
            crafting_cost: 300,
            ingredients: [{
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
                }
            ]
        }
    },
    "[Excavating] Superior Oreha Fusion Material": {
        quantity: 20,
        sell_amount: prices["Superior Oreha Fusion Material"],
        icon: "./img/icons/use_8_109648a.png",
        rarity: rarity.epic,
        category: category.Special,
        time: "01:00:00",
        is_duplicate: [0, "Superior Oreha Fusion Material"],
        recipe: {
            crafting_cost: 250,
            ingredients: [{
                    name: "Oreha Relic",
                    quantity: 16
                },
                {
                    name: "Rare Relic",
                    quantity: 29
                },
                {
                    name: "Ancient Relic",
                    quantity: 94
                }
            ]
        }
    },
    "[Fishing] Basic Oreha Fusion Material": {
        quantity: 30,
        sell_amount: prices["Basic Oreha Fusion Material"],
        icon: "./img/icons/use_9_71.png",
        rarity: rarity.rare,
        category: category.Special,
        time: "00:45:00",
        is_duplicate: [1, "Basic Oreha Fusion Material"],
        recipe: {
            crafting_cost: 205,
            ingredients: [{
                    name: "Oreha Solar Carp",
                    quantity: 10
                },
                {
                    name: "Natural Pearl",
                    quantity: 40
                },
                {
                    name: "Fish",
                    quantity: 80
                }
            ]
        }
    },
    "[Fishing] Prime Oreha Fusion Material": {
        quantity: 15,
        sell_amount: prices["Prime Oreha Fusion Material"],
        icon: "./img/icons/use_11_29648a.png",
        rarity: rarity.epic,
        category: category.Special,
        time: "01:03:00",
        is_duplicate: [1, "Prime Oreha Fusion Material"],
        recipe: {
            crafting_cost: 300,
            ingredients: [{
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
                }
            ]
        }
    },
    "[Fishing] Superior Oreha Fusion Material": {
        quantity: 20,
        sell_amount: prices["Superior Oreha Fusion Material"],
        icon: "./img/icons/use_8_109648a.png",
        rarity: rarity.epic,
        category: category.Special,
        time: "01:00:00",
        is_duplicate: [1, "Superior Oreha Fusion Material"],
        recipe: {
            crafting_cost: 250,
            ingredients: [{
                    name: "Oreha Solar Carp",
                    quantity: 16
                },
                {
                    name: "Natural Pearl",
                    quantity: 64
                },
                {
                    name: "Fish",
                    quantity: 128
                }
            ]
        }
    },
    "[Hunting] Basic Oreha Fusion Material": {
        quantity: 30,
        sell_amount: prices["Basic Oreha Fusion Material"],
        icon: "./img/icons/use_9_71.png",
        rarity: rarity.rare,
        category: category.Special,
        time: "00:45:00",
        is_duplicate: [1, "Basic Oreha Fusion Material"],
        recipe: {
            crafting_cost: 205,
            ingredients: [{
                    name: "Oreha Thick Meat",
                    quantity: 10
                },
                {
                    name: "Tough Leather",
                    quantity: 40
                },
                {
                    name: "Thick Raw Meat",
                    quantity: 80
                }
            ]
        }
    },
    "[Hunting] Prime Oreha Fusion Material": {
        quantity: 15,
        sell_amount: prices["Prime Oreha Fusion Material"],
        icon: "./img/icons/use_11_29648a.png",
        rarity: rarity.epic,
        category: category.Special,
        time: "01:03:00",
        is_duplicate: [1, "Prime Oreha Fusion Material"],
        recipe: {
            crafting_cost: 300,
            ingredients: [{
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
                }
            ]
        }
    },
    "[Hunting] Superior Oreha Fusion Material": {
        quantity: 20,
        sell_amount: prices["Superior Oreha Fusion Material"],
        icon: "./img/icons/use_8_109648a.png",
        rarity: rarity.epic,
        category: category.Special,
        time: "01:00:00",
        is_duplicate: [1, "Superior Oreha Fusion Material"],
        recipe: {
            crafting_cost: 250,
            ingredients: [{
                    name: "Oreha Thick Meat",
                    quantity: 16
                },
                {
                    name: "Tough Leather",
                    quantity: 64
                },
                {
                    name: "Thick Raw Meat",
                    quantity: 128
                }
            ]
        }
    },
    "[Masterwork] Master's Herb Steak Meal": {
        quantity: 1,
        sell_amount: prices["[Masterwork] Master's Herb Steak Meal"],
        icon: "./img/icons/use_8_215.png",
        rarity: rarity.rare,
        category: category.Cooking,
        time: "01:00:00",
        is_duplicate: [0, "[Masterwork] Master's Herb Steak Meal"],
        recipe: {
            crafting_cost: 50,
            ingredients: [{
                    name: "Oreha Thick Meat",
                    quantity: 12
                },
                {
                    name: "Oreha Solar Carp",
                    quantity: 10
                },
                {
                    name: "Treated Meat",
                    quantity: 48
                },
                {
                    name: "Redflesh Fish",
                    quantity: 40
                },
                {
                    name: "Thick Raw Meat",
                    quantity: 96
                },
                {
                    name: "Fish",
                    quantity: 80
                }
            ]
        }
    },
    "Atropine Potion": {
        quantity: 3,
        sell_amount: prices["Atropine Potion"],
        icon: "./img/icons/battle_item_01_72.png",
        rarity: rarity.epic,
        category: category.Potion,
        time: "01:00:00",
        is_duplicate: [0, "Atropine Potion"],
        recipe: {
            crafting_cost: 30,
            ingredients: [{
                    name: "Bright Wild Flower",
                    quantity: 6
                },
                {
                    name: "Strong Iron Ore",
                    quantity: 2
                },
                {
                    name: "Shy Wild Flower",
                    quantity: 24
                },
                {
                    name: "Rare Relic",
                    quantity: 2
                },
                {
                    name: "Wild Flower",
                    quantity: 48
                }
            ]
        }
    },
    "Clay Grenade": {
        quantity: 3,
        sell_amount: prices["Clay Grenade"],
        icon: "./img/icons/battle_item_01_54.png",
        rarity: rarity.rare,
        category: category.Grenade,
        time: "00:30:00",
        is_duplicate: [0, "Clay Grenade"],
        recipe: {
            crafting_cost: 15,
            ingredients: [{
                    name: "Exquisite Mushroom",
                    quantity: 3
                },
                {
                    name: "Fresh Mushroom",
                    quantity: 12
                },
                {
                    name: "Crude Mushroom",
                    quantity: 24
                },
                {
                    name: "Iron Ore",
                    quantity: 5
                }
            ]
        }
    },
    "Corrosive Bomb": {
        quantity: 3,
        sell_amount: prices["Corrosive Bomb"],
        icon: "./img/icons/battle_item_01_49.png",
        rarity: rarity.rare,
        category: category.Bomb,
        time: "00:30:00",
        is_duplicate: [0, "Corrosive Bomb"],
        recipe: {
            crafting_cost: 15,
            ingredients: [{
                    name: "Exquisite Mushroom",
                    quantity: 4
                },
                {
                    name: "Fresh Mushroom",
                    quantity: 12
                },
                {
                    name: "Crude Mushroom",
                    quantity: 32
                },
                {
                    name: "Heavy Iron Ore",
                    quantity: 6
                }
            ]
        }
    },
    "Dark Grenade": {
        quantity: 3,
        sell_amount: prices["Dark Grenade"],
        icon: "./img/icons/battle_item_01_47.png",
        rarity: rarity.rare,
        category: category.Grenade,
        time: "00:30:00",
        is_duplicate: [0, "Dark Grenade"],
        recipe: {
            crafting_cost: 15,
            ingredients: [{
                    name: "Exquisite Mushroom",
                    quantity: 3
                },
                {
                    name: "Fresh Mushroom",
                    quantity: 12
                },
                {
                    name: "Crude Mushroom",
                    quantity: 24
                },
                {
                    name: "Tender Timber",
                    quantity: 3
                }
            ]
        }
    },
    "Destruction Bomb": {
        quantity: 3,
        sell_amount: prices["Destruction Bomb"],
        icon: "./img/icons/battle_item_01_21.png",
        rarity: rarity.rare,
        category: category.Bomb,
        time: "00:30:00",
        is_duplicate: [0, "Destruction Bomb"],
        recipe: {
            crafting_cost: 15,
            ingredients: [{
                    name: "Exquisite Mushroom",
                    quantity: 4
                },
                {
                    name: "Fresh Mushroom",
                    quantity: 12
                },
                {
                    name: "Crude Mushroom",
                    quantity: 32
                },
                {
                    name: "Heavy Iron Ore",
                    quantity: 6
                }
            ]
        }
    },
    "Elemental HP Potion": {
        quantity: 3,
        sell_amount: prices["Elemental HP Potion"],
        icon: "./img/icons/battle_item_01_8.png",
        rarity: rarity.epic,
        category: category.Potion,
        time: "01:00:00",
        is_duplicate: [1, "Elemental HP Potion"],
        recipe: {
            crafting_cost: 30,
            ingredients: [{
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
                }
            ]
        }
    },
    "Flame Grenade": {
        quantity: 3,
        sell_amount: prices["Flame Grenade"],
        icon: "./img/icons/battle_item_01_1.png",
        rarity: rarity.rare,
        category: category.Grenade,
        time: "00:30:00",
        is_duplicate: [0, "Flame Grenade"],
        recipe: {
            crafting_cost: 15,
            ingredients: [{
                    name: "Exquisite Mushroom",
                    quantity: 3
                },
                {
                    name: "Fresh Mushroom",
                    quantity: 12
                },
                {
                    name: "Crude Mushroom",
                    quantity: 24
                },
                {
                    name: "Tender Timber",
                    quantity: 3
                }
            ]
        }
    },
    "Flare": {
        quantity: 3,
        sell_amount: prices["Flare"],
        icon: "./img/icons/battle_item_01_4.png",
        rarity: rarity.uncommon,
        category: category.General,
        time: "00:00:08",
        is_duplicate: [0, "Flare"],
        recipe: {
            crafting_cost: 0,
            ingredients: [{
                    name: "Natural Pearl",
                    quantity: 20
                },
                {
                    name: "Wild Flower",
                    quantity: 35
                }
            ]
        }
    },
    "Frost Grenade": {
        quantity: 3,
        sell_amount: prices["Frost Grenade"],
        icon: "./img/icons/battle_item_01_2.png",
        rarity: rarity.rare,
        category: category.Grenade,
        time: "00:30:00",
        is_duplicate: [0, "Frost Grenade"],
        recipe: {
            crafting_cost: 15,
            ingredients: [{
                    name: "Exquisite Mushroom",
                    quantity: 3
                },
                {
                    name: "Fresh Mushroom",
                    quantity: 12
                },
                {
                    name: "Crude Mushroom",
                    quantity: 24
                },
                {
                    name: "Iron Ore",
                    quantity: 5
                }
            ]
        }
    },
    "Major HP Potion": {
        quantity: 3,
        sell_amount: prices["Major HP Potion"],
        icon: "./img/icons/battle_item_01_7.png",
        rarity: rarity.rare,
        category: category.Potion,
        time: "00:30:00",
        is_duplicate: [0, "Major HP Potion"],
        recipe: {
            crafting_cost: 15,
            ingredients: [{
                    name: "Shy Wild Flower",
                    quantity: 9
                },
                {
                    name: "Wild Flower",
                    quantity: 18
                }
            ]
        }
    },
    "Panacea": {
        quantity: 3,
        sell_amount: prices["Panacea"],
        icon: "./img/icons/battle_item_01_17.png",
        rarity: rarity.rare,
        category: category.Potion,
        time: "00:30:00",
        is_duplicate: [0, "Panacea"],
        recipe: {
            crafting_cost: 15,
            ingredients: [{
                name: "Exquisite Mushroom",
                quantity: 10
            }]
        }
    },
    "Pheromone Essence": {
        quantity: 3,
        sell_amount: prices["Pheromone Essence"],
        icon: "./img/icons/battle_item_01_78.png",
        rarity: rarity.rare,
        category: category.Bomb,
        time: "00:30:00",
        is_duplicate: [0, "Pheromone Essence"],
        recipe: {
            crafting_cost: 15,
            ingredients: [{
                    name: "Exquisite Mushroom",
                    quantity: 4
                },
                {
                    name: "Fresh Mushroom",
                    quantity: 12
                },
                {
                    name: "Crude Mushroom",
                    quantity: 32
                },
                {
                    name: "Heavy Iron Ore",
                    quantity: 6
                }
            ]
        }
    },
    "Protective Potion": {
        quantity: 3,
        sell_amount: prices["Protective Potion"],
        icon: "./img/icons/battle_item_01_50.png",
        rarity: rarity.rare,
        category: category.Potion,
        time: "00:30:00",
        is_duplicate: [0, "Protective Potion"],
        recipe: {
            crafting_cost: 15,
            ingredients: [{
                    name: "Exquisite Mushroom",
                    quantity: 4
                },
                {
                    name: "Fresh Mushroom",
                    quantity: 16
                },
                {
                    name: "Rare Relic",
                    quantity: 5
                },
                {
                    name: "Crude Mushroom",
                    quantity: 32
                }
            ]
        }
    },
    "Sacred Charm": {
        quantity: 3,
        sell_amount: prices["Sacred Charm"],
        icon: "./img/icons/battle_item_01_51.png",
        rarity: rarity.rare,
        category: category.Potion,
        time: "00:30:00",
        is_duplicate: [0, "Sacred Charm"],
        recipe: {
            crafting_cost: 15,
            ingredients: [{
                    name: "Exquisite Mushroom",
                    quantity: 3
                },
                {
                    name: "Fresh Mushroom",
                    quantity: 18
                },
                {
                    name: "Crude Mushroom",
                    quantity: 30
                }
            ]
        }
    },
    "Sleep Bomb": {
        quantity: 3,
        sell_amount: prices["Sleep Bomb"],
        icon: "./img/icons/battle_item_01_69.png",
        rarity: rarity.rare,
        category: category.Bomb,
        time: "00:30:00",
        is_duplicate: [0, "Sleep Bomb"],
        recipe: {
            crafting_cost: 15,
            ingredients: [{
                    name: "Exquisite Mushroom",
                    quantity: 4
                },
                {
                    name: "Fresh Mushroom",
                    quantity: 12
                },
                {
                    name: "Iron Ore",
                    quantity: 10
                },
                {
                    name: "Crude Mushroom",
                    quantity: 32
                }
            ]
        }
    },
    "Splendid Elemental HP Potion": {
        quantity: 2,
        sell_amount: prices["Splendid Elemental HP Potion"],
        icon: "./img/icons/battle_item_01_80.png",
        rarity: rarity.epic,
        category: category.Potion,
        time: "01:15:00",
        is_duplicate: [0, "Splendid Elemental HP Potion"],
        recipe: {
            crafting_cost: 30,
            ingredients: [{
                    name: "Elemental HP Potion",
                    quantity: 3
                },
                {
                    name: "Bright Wild Flower",
                    quantity: 8
                }
            ]
        }
    },
    "Splendid Panacea": {
        quantity: 2,
        sell_amount: prices["Splendid Panacea"],
        icon: "./img/icons/splendidpanacea.png",
        rarity: rarity.epic,
        category: category.Potion,
        time: "00:45:00",
        is_duplicate: [0, "Splendid Panacea"],
        recipe: {
            crafting_cost: 15,
            ingredients: [{
                    name: "Panacea",
                    quantity: 3
                },
                {
                    name: "Exquisite Mushroom",
                    quantity: 10
                }
            ]
        }
    },
    "Sprinter's Robe": {
        quantity: 3,
        sell_amount: prices["Sprinter's Robe"],
        icon: "./img/icons/sprinterrobe.png",
        rarity: rarity.rare,
        category: category.Potion,
        time: "00:30:00",
        is_duplicate: [0, "Sprinter's Robe"],
        recipe: {
            crafting_cost: 15,
            ingredients: [{
                    name: "Tough Leather",
                    quantity: 17
                },
                {
                    name: "Shy Wild Flower",
                    quantity: 17
                },
                {
                    name: "Wild Flower",
                    quantity: 27
                }
            ]
        }
    },
    "Stimulant": {
        quantity: 3,
        sell_amount: prices["Stimulant"],
        icon: "./img/icons/stimulant.png",
        rarity: rarity.epic,
        category: category.Potion,
        time: "01:00:00",
        is_duplicate: [0, "Stimulant"],
        recipe: {
            crafting_cost: 30,
            ingredients: [{
                    name: "Exquisite Mushroom",
                    quantity: 5
                },
                {
                    name: "Fresh Mushroom",
                    quantity: 20
                },
                {
                    name: "Sturdy Timber",
                    quantity: 2
                },
                {
                    name: "Rare Relic",
                    quantity: 4
                },
                {
                    name: "Crude Mushroom",
                    quantity: 40
                }
            ]
        }
    },
    "Time Stop Potion": {
        quantity: 3,
        sell_amount: prices["Time Stop Potion"],
        icon: "./img/icons/timestop.png",
        rarity: rarity.epic,
        category: category.Potion,
        time: "01:00:00",
        is_duplicate: [0, "Time Stop Potion"],
        recipe: {
            crafting_cost: 30,
            ingredients: [{
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
                }
            ]
        }
    },
    "Whirlwind Grenade": {
        quantity: 3,
        sell_amount: prices["Whirlwind Grenade"],
        icon: "./img/icons/battle_item_01_53.png",
        rarity: rarity.rare,
        category: category.Grenade,
        time: "00:45:00",
        is_duplicate: [0, "Whirlwind Grenade"],
        recipe: {
            crafting_cost: 15,
            ingredients: [{
                    name: "Exquisite Mushroom",
                    quantity: 3
                },
                {
                    name: "Fresh Mushroom",
                    quantity: 12
                },
                {
                    name: "Tender Timber",
                    quantity: 3
                },
                {
                    name: "Crude Mushroom",
                    quantity: 24
                }
            ]
        }
    }
};