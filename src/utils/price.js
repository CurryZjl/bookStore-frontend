export function convertLongToPriceString(price) {
    return (price / 100).toFixed(2);
}

export function convertPriceStringToLong(priceString) {
    return Math.round(parseFloat(priceString) * 100);
}

export function computeTotalPrice(cartItems){
    const totalPriceLong = cartItems.reduce((total, item) => total + (item.bookDto.price * item.amount), 0);
    return convertLongToPriceString(totalPriceLong);
}