import { PREFIX, del, getResourece, post} from "./common.js";

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

export async function searchBooksByTagName(tagName) {
    const url = `${PREFIX}/books/tag?tag=${tagName}`;
    let res;
    try{
        res = await getResourece(url);
    }catch(e){
        console.log(e);
        res = [];
    }
    return res;
}

export async function deleteBookByBid(bid){
    const url = `${PREFIX}/books/${bid}`; //写后端url
    let res;
    try{
        res = await del(url,null);
    }catch(e){
        console.log("get error! :", e);
        res = null;
    }
    return res;
}

export async function updateBook(book){
    const url = `${PREFIX}/books`;
    let res;
    try{
        res = await post(url, book);
    }catch(e){
        console.log(e);
        res  = null;
    }
    return res;
}