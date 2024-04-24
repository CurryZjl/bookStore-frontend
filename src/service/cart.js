import { PREFIX, getJson } from "./common.js";

export function deleteCartItem(){
    return(
        <>
        </>
    );
}

export function changeCartItemNumber(){
    return(
        <>
        </>
    );
}

export async function searchCartBooks(){
    const url = `${PREFIX}/books/cart`;
    let books;
    try{
        books = await getJson(url);
    }catch(e){
        console.log(e);
        books = {
            total: 0,
            items: []
        };
    }
    return books;
}