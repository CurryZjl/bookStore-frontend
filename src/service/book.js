import { PREFIX, getResourece, post} from "./common.js";

export async function getBookById(_id) {
    const url = `${PREFIX}/books/${_id}`; //写后端url
    let book;
    try{
        book = await getResourece(url);
    }catch(e){
        console.log("get error! :", e);
        book = null;
    }
    return book;

}

export async function searchBooks(){
    const url = `${PREFIX}/books`;
    let books;
    try{
        books = await getResourece(url);
    }catch(e){
        console.log(e);
        books = {
            totalPages: 0,
            items: []
        };
    }
    return books;
}

export async function searchBooksByName(_query, pageIndex, pageSize){
    const url = `${PREFIX}/books?query=${_query}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    let res;
    try{
        res = await getResourece(url);
    }catch(e){
        console.log(e);
        res = {
            totalPages: 0,
            content: []
        };
    }
    return res;
}