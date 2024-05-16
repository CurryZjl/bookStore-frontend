import { PREFIX, getResourece, put,DUMMY_RESPONSE , del} from "./common.js";

export async function deleteCartItem(cid){
    const url = `${PREFIX}/cart/${cid}`;
    let res;
    try{
        res = await del(url);
    }catch(e){
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    //console.log(res);
    return res;
}

export function changeCartItemNumber(){
    return(
        <>
        </>
    );
}

export async function searchCartBooks(){
    const url = `${PREFIX}/cart`;
    let books;
    try{
        books = await getResourece(url);
    }catch(e){
        console.log(e);
        books = {
            total: 0,
            items: []
        };
    }
    return books;
}

export async function putNewCartBook(bid){
    const url = `${PREFIX}/cart`;
    let res;
    try{
        res = await put(url,bid);
    } catch(e){
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;
}