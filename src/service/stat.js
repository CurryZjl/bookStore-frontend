import { PREFIX, post, get} from "./common.js";

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
    let books;
    try{
        books = await get(url);
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