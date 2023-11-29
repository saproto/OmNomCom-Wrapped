import orderTotals from '@/data/orderTotals.json';
import extraData from '@/data/extraData.json';
import cookieMonster from '@/assets/cookiemonster.png';

export const prepareStats = async orders => {
    const stats = {};

    //Activities
    stats.activities = {};
    let activities = orders.filter(x => x.authenticated_by.startsWith('activity_closed_by'))
    stats.activities.amount = activities.length;
    stats.activities.spent = activities.length <= 0 ? 0 : activities.map(x => x.total_price).reduce((a, b) => a + b);

    //Calories
    stats.calories = {};
    stats.calories.amount = orders.map(x => x.units * x.product.calories).reduce((a, b) => a + b);
    stats.calories.beers = Math.round(stats.calories.amount / 132);
    const beerOrders = orders.filter(x => x.product.is_alcoholic);
    stats.calories.actualBeers = beerOrders.length <= 0 ? 0 : beerOrders.map(x => x.units).reduce((a, b) => a + b);

    //DaysAtProto
    stats.days = {}
    stats.days.items = 0;
    let days = {};
    for (let order of orders) {
        const date = order.created_at.substring(0, 10);
        if (!(date in days)) days[date] = 0;
        days[date] += order.units;
        stats.days.items += order.units;
    }

    stats.days.amount = Object.keys(days).length;

    //Drinks
    stats.drinks = {};
    stats.drinks.alcoholic = 0;
    stats.drinks.nonAlcoholic = 0;
    let drinks = {};

    for (let order of orders) {
        if (order.product.name.startsWith('TIPcie')) {
            const date = order.created_at.substring(0, 10);
            if (!(date in drinks)) drinks[date] = 0;
            drinks[date] += order.units;
            if (order.product.is_alcoholic) {
                stats.drinks.alcoholic += order.units;
            } else {
                stats.drinks.nonAlcoholic += order.units;
            }
        }
    }

    stats.drinks.amount = Object.keys(drinks).length;

    //MostBought
    let filteredOrders = orders.filter(x => ![831].includes(x.product_id))
    stats.mostBought = {};
    let totals = {};
    for (let order of filteredOrders) {
        if (order.product.name in totals) totals[order.product.name][1] += order.units;
        else totals[order.product.name] = [order.product, order.units];
    }
    stats.mostBought.items = Object.values(totals).sort((a, b) => b[1] - a[1]);
    console.log(stats.mostBought.items[0][0])
    let otherOrders = orderTotals[stats.mostBought.items[0][0].id];
    if (stats.mostBought.items[0][1] === otherOrders[otherOrders.length-1]) {
        stats.mostBought.percentile = 0;
    } else {
        let percentileCount = 0;
        for (const order of otherOrders) {
            if (stats.mostBought.items[0][1] <= order) {
                break
            }
            percentileCount++;
        }
        stats.mostBought.percentile = Math.round((otherOrders.length - percentileCount) / otherOrders.length * 100);
    }

    //NoStreepDecember
    stats.december = {};
    stats.december.complete = true;
    stats.december.items = 0;
    for (let order of orders) {
        const month = order.created_at.substring(5, 7);
        if (month === '12') {
            stats.december.complete = false;
            stats.december.items += order.units;
        }
    }
    stats.december.winners = extraData.decemberWinners;

    //TotalSpent
    stats.totalSpent = {};
    stats.totalSpent.amount = orders.map(x => x.total_price).reduce((a, b) => a + b);
    stats.totalSpent.total = extraData.total;

    //WillToLive
    stats.willToLives = {};
    const willToLives = orders.filter(x => x.product.id === 987).map(el => el.units);
    stats.willToLives.amount = willToLives.length > 0 ? willToLives.reduce((a, b) => a + b) : 0;

    let otherWills = orderTotals['987'];
    let percentileCountWills = 0;
    for (const order of otherWills) {
        if (stats.willToLives.amount <= order) {
            break
        }
        percentileCountWills++;
    }
    stats.willToLives.percentile = Math.round((otherWills.length - percentileCountWills) / otherWills.length * 100);

    await preloadImages(stats);

    return stats;
};

const preloadImages = async stats => {
    await preloadImage(cookieMonster);
    //MostBought
    for (let product of stats.mostBought.items.slice(0, 5)) {
        if (product[0].image_url) {
            const src = product[0].image_url += '?w=500';
            await preloadImage(src);
        }
    }
}

let images = [];
const preloadImage = src => new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = src;
    images.push(img);
})
