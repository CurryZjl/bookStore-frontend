import { getJson, PREFIX, getText } from "./common";

// const profile = {
//     name: 'Curry',
//     level: 6,
//     email: '1218296632@qq.com',
//     introduction: 'a student from Shanghai Jiao Tong University',
//     avatarSrc: '../images/user/curry.jpg' ,
//     password: 'zjl123'
// }

export async function getProfile(){
    const url = `${PREFIX}/profile`; //写后端url
    let profile;
    try{
        profile = await getJson(url);
    }catch(e){
        console.log(e);
        profile = null;
    }
    return profile;
}

export async function getUserEmail(){
    const url = `${PREFIX}/profile/email`; 
    let email;
    try{
        email = await getText(url);
    }catch(e){
        console.log(e);
        email = null;
    }
    return email;
}

export async function getUserPassword(){
    const url = `${PREFIX}/profile/password`; 
    let password;
    try{
        password = await getText(url);
    }catch(e){
        console.log(e);
        password = null;
    }
    return password;
}
