import { computeProduct } from "../service/order";

export function convertLongToPriceString(price) {
    return (price / 100).toFixed(2);
}

export function convertPriceStringToLong(priceString) {
    return Math.round(parseFloat(priceString) * 100);
}

export async function computeTotalPrice(cartItems){
    console.log(cartItems);
    const pricePromises = cartItems.map(item =>
        computeProduct(item.bookDto.price, item.amount)
    );
    try{
        const totalPriceLong = (await Promise.all(pricePromises)).reduce((total, price) => total + price, 0);
        return convertLongToPriceString(totalPriceLong);
    }catch(e){
        console.log(e);
    }
    return 0;
}