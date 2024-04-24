export const BASEURL = 'http://localhost:8080';
export const PREFIX = `${BASEURL}/api`;
export const DUMMY_RESPONSE = {
    ok: false,
    message: "无法连接网络！"
}
//不要把fetch API写的哪里都是，集中在common，更好管理

export async function getJson(url){
    let res = await fetch(url, {method: "GET", credentials: "include"});
    //method: //default:GET,POST,PUT,DELETE
    //mode: //default:'cors'跨域 no-cors same-origin
    //cache: //default: no-cache,reload,force-cache
    //credentials: //default: same-origin 常用include，跨域 大致就是说证书
    return res.json();
}

export async function get(url) {
    let res = await fetch(url, { method: "GET", credentials: "include" });
    return res;
}

export async function getText(url){
    let res = await fetch(url, { method: "GET", credentials: "include" });
    return res.text();
}