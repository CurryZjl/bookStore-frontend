import { PREFIX, getResourece, DUMMY_RESPONSE, post} from "./common.js";

export async function getOrders(){
    const url = `${PREFIX}/orders`;
    let orders;
    try{
        orders = await getResourece(url);
    }catch(e){
        console.log(e);
        orders = {
            total: 0,
            items: []
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