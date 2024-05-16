export const BASEURL = 'http://localhost:8080';
export const PREFIX = `${BASEURL}/api`;
export const DUMMY_RESPONSE = {
    valid: false,
    message: "无法连接网络！"
}
//不要把fetch API写的哪里都是，集中在common，更好管理

export async function getResourece(url){
    let res = await fetch(url, {method: "GET", credentials: "include"});
    //method: //default:GET,POST,PUT,DELETE
    //mode: //default:'cors'跨域 no-cors same-origin
    //cache: //default: no-cache,reload,force-cache
    //credentials: //default: same-origin 常用include，跨域 大致就是说证书
    if(!res.ok){
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    if(data.valid === false){
        throw new Error(`${data.message}`);
    }
    return data.resource; //返回资源
}


export async function get(url){
    let res = await fetch(url, { method: "GET", credentials: "include" });
    if(!res.ok){
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    if(data.valid === false){
        throw new Error(`${data.message}`);
    }
    return data; //返回包含信息的Response
}

export async function post(url,data){
    let opts = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-type' : 'application/json'
        },
        credentials: "include"
    }
    let res = await fetch(url,opts);
    return res.json();
}

export async function put(url,data){
    let opts = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Content-type' : 'application/json'
        },
        credentials: "include"
    }
    let res = await fetch(url,opts);
    return res.json();
}

export async function del(url,data){
    let opts = {
        method: "DELETE",
        body: JSON.stringify(data),
        credentials: "include"
    }
    let res = await fetch(url,opts);
    return res.json();
}