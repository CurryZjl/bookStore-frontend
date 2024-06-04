import { PREFIX, getResourece, DUMMY_RESPONSE, post, getResoureceByBody} from "./common.js";

export async function getOrders(){
    const url = `${PREFIX}/orders`;
    let orders;
    try{
        orders = await getResourece(url);
    }catch(e){
        console.log(e);
        // orders = {
        //     total: 0,
        //     items: []
        // };
        orders = [];
    }
    return orders;
}

export async function getOrdersByBookName(bookName){
    const url = `${PREFIX}/orders/book?bookName=${bookName}`;
    let orders;
    try{
        orders = await getResourece(url);
    }catch(e){
        console.log(e);
        orders = [];
    }
    return orders;
}

export async function getOrdersByTimeBetween(_startTime, _endTime){
    let timeDto = {
        startTime: _startTime,
        endTime: _endTime,
    }
    console.log(timeDto);
    const url = `${PREFIX}/orders/time`;
    let orders;
    try{
        orders = await post(url,timeDto);
    }catch(e){
        console.log(e);
        orders = [];
    }
    return orders.resource;
}

export async function postOrder(orderInfo){
    const url = `${PREFIX}/orders`;
    let res;
    try{
        res = await post(url,orderInfo);
    } catch(e){
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;
}