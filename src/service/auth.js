import { post, PREFIX , DUMMY_RESPONSE, getResourece } from "./common";

export async function checkLogin(_name, _password){
    let authDto = {
        name : _name,
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

export async function logout() {
    const url = `${PREFIX}/auth/logout`;
    let res;
    try{
        res = await getResourece(url);
    }catch(e){
        console.log("logout error! :", e);
        res = null;
    }
    return res;
}

export async function checkName(_name){
    const url = `${PREFIX}/auth/user/name`;
    let res;
    let authDto = {
        name: _name
    }
    try{
        res = await post(url, authDto);
    } catch(e){
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;
}

export async function postNewUser(_name, _password, _email){
    let authDto = {
        name: _name,
        password: _password,
        email: _email
    }
    const url= `${PREFIX}/auth/user`;
    let res;
    try{
        res = await post(url,authDto);
    }catch(e){
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;

}