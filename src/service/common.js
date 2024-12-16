import { message as antdMessage } from "antd";
export const BASEURL = 'http://localhost:8000';
export const PREFIX = `${BASEURL}/api`;
export const MICRO_PREFIX = `${BASEURL}/micro`;
export const DUMMY_RESPONSE = {
    valid: false,
    message: "无法连接网络！"
}


export async function getResourece(url) {
    //method: //default:GET,POST,PUT,DELETE
    //mode: //default:'cors'跨域 no-cors same-origin
    //cache: //default: no-cache,reload,force-cache
    //credentials: //default: same-origin 常用include，跨域 大致就是说证书
    try {
        let res = await fetch(url, { method: "GET", credentials: "include" });
        if (!res.ok) {
            if (res.status === 401) {
                antdMessage.error('未经授权的访问，请重新登录');
                setTimeout(() => {
                    window.location.href = "/";
                }, 500); // 等待0.5秒后跳转
                
            }
            else {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
        }
        const data = await res.json();
        if (data.valid === false) {
            throw new Error(`${data.message}`);
        }
        return data.resource; //返回资源
    } catch (e) {
        console.log(e);
        throw e;
    }

}


export async function get(url) {
    try {
        let res = await fetch(url, { method: "GET", credentials: "include" });
        if (!res.ok) {
            if(res.status === 401){
                antdMessage.error('未经授权的访问，请重新登录');
                setTimeout(() => {
                    window.location.href = "/";
                }, 500); // 等待0.5秒后跳转
               
            }
            else{
                throw new Error(`HTTP error! status: ${res.status}`);
            }
        }
        const data = await res.json();
        if (data.valid === false) {
            throw new Error(`${data.message}`);
        }
        return data; //返回包含信息的Response
    } catch(e){
        console.log(e);
        throw new Error(e);
    }
    
}

export async function post(url, data) {
    let opts = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        },
        credentials: "include"
    }
    try{
        console.log("post", opts);
        let res = await fetch(url, opts);
        console.log(res);
        if (!res.ok) {
            if(res.status === 401){
                antdMessage.error('未经授权的访问，请重新登录');
                setTimeout(() => {
                    window.location.href = "/";
                }, 500); // 等待0.5秒后跳转
                
            }
            else{
                throw new Error(`HTTP error! status: ${res.status}`);
            }
        }
        return res.json();
    } catch(e){
        console.log(e);
        throw new Error(e);
    }
    
}

export async function patch(url, data) {
    let stringData = data;
    // 检查数据类型，如果是对象则转换为字符串
    if (typeof data !== 'string') {
        stringData = JSON.stringify(data);
    }
    let opts = {
        method: "PATCH",
        body: stringData,
        headers: {
            'Content-type': 'application/json'
        },
        credentials: "include"
    }
    try{
        let res = await fetch(url, opts);
        if (!res.ok) {
            if(res.status === 401){
                antdMessage.error('未经授权的访问，请重新登录');
                setTimeout(() => {
                    window.location.href = "/";
                }, 500); // 等待0.5秒后跳转
                
            }
            else{
                throw new Error(`HTTP error! status: ${res.status}`);
            }
        }
        return res.json();
    }catch(e){
        console.log(e);
        throw new Error(e);
    }
   
}

export async function put(url, data) {
    let opts = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        },
        credentials: "include"
    }
    try{
        let res = await fetch(url, opts);
        if (!res.ok) {
            if(res.status === 401){
                antdMessage.error('未经授权的访问，请重新登录');
                setTimeout(() => {
                    window.location.href = "/";
                }, 500); // 等待0.5秒后跳转
            }
            else{
                throw new Error(`HTTP error! status: ${res.status}`);
            }
        }
        return res.json();
    } catch(e){
        console.log(e);
        throw new Error(e);
    }
   
}

export async function del(url, data) {
    let opts = {
        method: "DELETE",
        body: JSON.stringify(data),
        credentials: "include"
    }
    try{
        let res = await fetch(url, opts);
        if (!res.ok) {
            if(res.status === 401){
                antdMessage.error('未经授权的访问，请重新登录');
                setTimeout(() => {
                    window.location.href = "/";
                }, 500); // 等待0.5秒后跳转
            }
            else{
                throw new Error(`HTTP error! status: ${res.status}`);
            }
        }
        return res.json();
    } catch(e){
        console.log(e);
        throw new Error(e);
    }
}