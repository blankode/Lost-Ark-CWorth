function calculate_price(item,materials,prices){
    let total_cost = [];
    let market_loss = 0.95;
    let item_name = item[0]
    for (let i = 0; i < item.length; i++) {
        if (item[i] == "Batch") {
            batch = item[i+1];
        } else if (item[i] == "Crafting cost") {
            invested_gold = item[i+1];
        } else {
            for (let j = 0; j < materials.length; j++) { //get material used
                if (item[i] == materials[j][0]) {
                    //price of material is divided to qty then multiplied with batch number
                    //console.log(materials[j][1]+"/"+materials[j][2]+"*"+item[i+1])
                    total_cost.push((materials[j][1] / materials[j][2]) * item[i+1])
                }
            };
        };
    };
    //determine invested gold
    invested_gold = parseFloat(invested_gold)
    for (let i = 0; i < total_cost.length; i++) {
        invested_gold += total_cost[i]
    };
    //determine sell value
    sell_value = 0;
    for (let i = 0; i < prices.length; i++) {
        if (item_name == prices[i][0]) {
            sell_value += prices[i][1]
        };
    };
    //sell_value = parseFloat(sell_value)
    //sell value is determined by price of item multiplied with market_loss and the result with the number of batch
    sell_value *= market_loss * batch
    sell_value = Math.floor(parseFloat(sell_value))
    let profit = 0;
    profit = Math.floor(sell_value - invested_gold)
    console.log("--------------------------")
    console.log(sell_value)
    console.log("For Item "+item_name+" we invest "+invested_gold+ " gold, and we get "+profit+" gold")
};