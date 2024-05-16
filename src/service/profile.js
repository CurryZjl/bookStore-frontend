import { getResourece, PREFIX } from "./common";

// const profile = {
//     name: 'Curry',
//     level: 6,
//     email: '1218296632@qq.com',
//     introduction: 'a student from Shanghai Jiao Tong University',
//     avatarSrc: '../images/user/curry.jpg' ,
//     password: 'zjl123'
// }

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
