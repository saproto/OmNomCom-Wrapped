const orderTotals = require('@/data/ordersExport.json');
const fs = require('fs');
let data = {}
for (let x of orderTotals.rows) {
    if (!(x.product_id in data)) {
        data[x.product_id] = [];
    }
    data[x.product_id].push(x.num);
}
for (let item of Object.entries(data)) {
    item.sort();
}
const json = JSON.stringify(data);

fs.writeFile('ordersExport.json', json, (err,data) => {

});
