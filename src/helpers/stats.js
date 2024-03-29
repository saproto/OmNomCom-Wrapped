import cookieMonster from '@/assets/cookiemonster.png';
import beugel from '@/assets/beugel.webp';
import lemonade from '@/assets/lemonade.png';
import spilledBeer from '@/assets/spilledbeer.png'
import tosti from '@/assets/tosti.png'
import unicorn from '@/assets/unicorn.png'
import unicornBw from '@/assets/unicorn_bw.png'

export const prepareStats = async (wrapped, orders) => {
    const stats = {};
    //Activities
    stats.activities = {};
    stats.activities.amount = wrapped.events.length;
    stats.activities.spent = wrapped.events.length <= 0 ? 0 : wrapped.events.map(x => x.price).reduce((a, b) => a + b).toFixed(2);
    stats.activities.all = wrapped.events;
    //Calories
    stats.calories = {};
    stats.calories.amount = orders.map(x => x.units * x.product.calories).reduce((a, b) => a + b);
    stats.calories.tostis = Math.round(stats.calories.amount / 251);
    // const beerOrders = orders.filter(x => x.product.is_alcoholic);
    // stats.calories.actualBeers = beerOrders.length <= 0 ? 0 : beerOrders.map(x => x.units).reduce((a, b) => a + b);

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
            console.log(order.product);
            if (order.product.is_alcoholic === 1) {
                stats.drinks.alcoholic += order.units;
            } else {
                stats.drinks.nonAlcoholic += order.units;
            }
        }
    }

    stats.drinks.amount = Object.keys(drinks).length;

    const omnomcomdays = new Set(orders.map(x => x.created_at.slice(5, 10)));
    stats.omnomcomdays = omnomcomdays;

    //MostBought
    let filteredOrders = orders.filter(x => ![
        825,
        826,
        827,
        831,
        841,
        855,
        881,
        883,
        975,
        979,
        980,
        986,
        998,
        1181,
        1184,
        1185,
        1197,
        1198,
        1199,
        1200,
        1201,
        1358
    ].includes(x.product_id))
    stats.mostBought = {};
    let totals = {};
    for (let order of filteredOrders) {
        if (order.product.name in totals) totals[order.product.name][1] += order.units;
        else totals[order.product.name] = [order.product, order.units];
    }
    stats.mostBought.items = Object.values(totals).sort((a, b) => b[1] - a[1]);
    let otherOrders = wrapped.order_totals[stats.mostBought.items[0][0].id];
    if (stats.mostBought.items[0][1] === otherOrders[otherOrders.length - 1]) {
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

    //TotalSpent
    stats.totalSpent = {};
    stats.totalSpent.amount = orders.map(x => x.total_price).reduce((a, b) => a + b);
    stats.totalSpent.total = wrapped.total_spent;

    //WillToLive
    stats.willToLives = {};
    const willToLives = orders.filter(x => x.product.id === 987).map(el => el.units);
    stats.willToLives.amount = willToLives.length > 0 ? willToLives.reduce((a, b) => a + b) : 0;

    let otherWills = wrapped.order_totals['987'];
    stats.willToLives.percentage = Math.log(stats.willToLives.amount) / Math.log(otherWills[otherWills.length - 1])
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
    await preloadImage(beugel);
    await preloadImage(lemonade);
    await preloadImage(spilledBeer);
    await preloadImage(tosti);
    await preloadImage(unicorn);
    await preloadImage(unicornBw);
    //Activities
    for (let activity of stats.activities.all) {
        if (activity.image_url) {
            const src = activity.image_url + '?w=500';
            const blob = await fetch(src).then(response => response.blob())
            activity.image_url = await new Promise(resolve => {
                const reader = new FileReader();
                reader.onload = function() {resolve(this.result)};
                reader.readAsDataURL(blob);
            });

            await preloadImage(src).catch(err => {
                console.log(err);
            });
        }
    }
    //MostBought
    for (let product of stats.mostBought.items.slice(0, 5)) {
        if (product[0].image_url) {
            const src = product[0].image_url + '?w=500';
            const blob = await fetch(src).then(response => response.blob())
            product[0].image_url = await new Promise(resolve => {
                const reader = new FileReader();
                reader.onload = function(){resolve(this.result)};
                reader.readAsDataURL(blob);
            });

            await preloadImage(src).catch((error) => {
                console.log(error)
            });
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
