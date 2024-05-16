import { post, PREFIX , DUMMY_RESPONSE } from "./common";

export async function checkLogin(_email, _password){
    let authDto = {
        email : _email,
        password : _password
    };
    const url =  `${PREFIX}/auth/login`;
    let res;
    try{
        res = await post(url,authDto);
    } catch(e){
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;
}