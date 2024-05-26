import { PREFIX, getResourece} from "./common.js";

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
            total: 0,
            items: []
        };
    }
    return books;
}