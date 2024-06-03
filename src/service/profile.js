import { getResourece, PREFIX } from "./common";


export async function getProfile(){
    const url = `${PREFIX}/user`; //写后端url
    let profile;
    try{
        profile = await getResourece(url);
    }catch(e){
        console.log(e);
        profile = null;
    }
    return profile;
}


export async function getRole(){
    const url = `${PREFIX}/user/role`;
    let role;
    try{
        role = await getResourece(url);
    } catch(e){
        console.log(e);
        role = null;
    }
    return role;
}