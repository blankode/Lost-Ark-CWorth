function calculate_price(item,materials,items){
    let total_cost = [];
    let market_loss = 0.95;
    let invested_gold = 0;
    let batch = 0;
    let found = false;
    for (let i = 0; i < items.length; i++) {
        if (item == items[0][0] && found == false) {
            found = true;
            for (let i = 0; i < items[0][2].length; i++) {
                if (items[0][2][i] == "Batch") {
                    batch = items[0][2][i+1];
                } else if (items[0][2][i] == "Crafting cost") {
                    invested_gold = items[0][2][i+1];
                } else {
                    for (let j = 0; j < materials.length; j++) { //get material used
                        if (items[0][2][i] == materials[j][0]) {
                            //price of material is divided to qty then multiplied with batch number
                            //console.log(materials[j][1]+"/"+materials[j][2]+"*"+item[i+1])
                            total_cost.push((materials[j][1] / materials[j][2]) * items[0][2][i+1])
                        }
                    };
                };
            };
        };
    };
    found = false;
    //determine invested gold
    invested_gold = parseFloat(invested_gold)
    for (let i = 0; i < total_cost.length; i++) {
        invested_gold += total_cost[i]
    };
    //find sell value
    sell_value = 0;
    for (let i = 0; i < items.length; i++) {
        if (item == items[0][0] && found == false) {
            sell_value += items[0][1]
            found = true;
        };
    };
    //sell_value = parseFloat(sell_value)
    //sell value is determined by price of item multiplied with market_loss and the result with the number of batch
    sell_value *= market_loss * batch
    sell_value = Math.floor(parseFloat(sell_value))
    let profit = 0;
    profit = Math.floor(sell_value - invested_gold)
    console.log("--------------------------")
    console.log("For Item "+item+" we invest "+invested_gold+ " gold, and we get "+profit+" gold")
};