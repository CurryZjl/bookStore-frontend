import { PREFIX, getResourece, put,DUMMY_RESPONSE , del , patch} from "./common.js";

export async function getUsers(){
    const url = `${PREFIX}/user/all`;
    let users;
    try{
        users = await getResourece(url);
    }catch(e){
        console.log(e);
        users =[];
    }
    return users;
}

export async function changeUserRole(uid, role){
    const url = `${PREFIX}/user/${uid}`;
    let res;
    try{
        res = await patch(url,role);
    }catch(e){
        console.log(e);
        res = DUMMY_RESPONSE;
    }
    return res;
}