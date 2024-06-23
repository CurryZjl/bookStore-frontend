import { PREFIX, getResourece, put,DUMMY_RESPONSE , del , patch} from "./common.js";
import { message as antdMessage } from "antd";
import moment from "moment";

export async function getUsers(){
    const url = `${PREFIX}/user/all`;
    let users;
    try{
        users = await getResourece(url);
    }catch(e){
        console.log(e);
        antdMessage.error('没有权限，请重新登录');
                setTimeout(() => {
                    window.location.href = "/";
                }, 500); // 等待0.5秒后跳转
        users =[];
    }
    return users;
}

export async function changeUserRole(uid, role){
    const url = `${PREFIX}/user/${uid}`;
    let res;
    try{
        res = await patch(url,role);
    }catch(e){
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;
}

export async function getAllOrders(bookName, startTime, endTime, pageIndex, pageSize){
    let url = "";
    if(bookName !== "")
        url = `${PREFIX}/orders/all?bookName=${bookName}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    else if(startTime !== "" && endTime !== "")
        url = `${PREFIX}/orders/all?startTime=${startTime}&endTime=${endTime}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    else 
        url = `${PREFIX}/orders/all?pageIndex=${pageIndex}&pageSize=${pageSize}`;

    let res;
    try{
        res = await getResourece(url);
    }catch(e){
        console.log(e);
    }
    return res;

}

export async function getConsumptionsBetween(startTime, endTime){
    if(startTime === "")
        startTime = "2024-03-24";
    if(endTime === ""){
        endTime = moment().format('YYYY-MM-DD');
    }
    const url = `${PREFIX}/orders/price?startTime=${startTime}&endTime=${endTime}`;
    let res;
    try{
        res = await getResourece(url);
    }catch(e){
        console.log(e);
    }
    return res;
}