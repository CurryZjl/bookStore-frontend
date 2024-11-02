import { MICRO_PREFIX , getResourece} from "./common.js";

export async function getBookAuthorByName(_name) {
    const url = `${MICRO_PREFIX}/author/${_name}`;
    let name;
    try{
        name = await getResourece(url);
    }catch(e){
        console.log("get error! :", e);
        name = null;
    }
    return name;
}