import { PREFIX, getResourece, DUMMY_RESPONSE, post} from "./common.js";

export async function getOrders(pageIndex, pageSize){
    const url = `${PREFIX}/orders?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    let orders;
    try{
        orders = await getResourece(url);
    }catch(e){
        console.log(e);
        orders = {
            totalPages: 0,
            content: []
        };
    }
    return orders;
}

export async function getOrdersByBookName(bookName,pageIndex, pageSize){
    const url = `${PREFIX}/orders/book?bookName=${bookName}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    let orders;
    try{
        orders = await getResourece(url);
    }catch(e){
        console.log(e);
        orders = {
            totalPages: 0,
            content: []
        };
    }
    return orders;
}

export async function getOrdersByTimeBetween(_startTime, _endTime, pageIndex, pageSize){
    // let timeDto = {
    //     startTime: _startTime,
    //     endTime: _endTime,
    // }
    // console.log(timeDto);
    const url = `${PREFIX}/orders/time?startTime=${_startTime}&endTime=${_endTime}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    let orders;
    try{
        orders = await getResourece(url);
    }catch(e){
        console.log(e);
        orders.resource = {
            totalPages: 0,
            content: []
        };
    }
    return orders;
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
