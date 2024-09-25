import { PREFIX, post} from "./common.js";
import moment from "moment";

export async function getStatBooksByTimeBetween(_startTime, _endTime){
    let timeDto = {
        startTime: _startTime,
        endTime: _endTime,
    }
    console.log(timeDto);
    const url = `${PREFIX}/orders/stat`;
    let books;
    try{
        books = await post(url,timeDto);
    }catch(e){
        console.log(e);
        books = {};
    }
    if(!books.valid){
        console.log(books.message);
        return {};
    }
    return books.resource;
}

export async function getStatItem(){
    const url = `${PREFIX}/orders/stat`;
    let timeDto = {
        startTime: "2024-03-24",
        endTime: moment().format('YYYY-MM-DD'),
    }
    let books;
    try{
        books = await post(url,timeDto);
    }catch(e){
        console.log(e);
        books = {};
    }
    if(!books.valid){
        console.log(books.message);
        return {};
    }
    return books.resource;
}