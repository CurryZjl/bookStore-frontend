import { LOCAL_UID_KEY, WS_ORDER_URL_PREFIX } from "../constants/userConfig";

export var websocket = null; 

export function openWebSocket(){
    if (typeof (WebSocket) == "undefined") {
        alert("您的浏览器不支持WebSocket");
        return;
    } 
    if(websocket != null){
        console.log("webSocket已连接：" + websocket +", 无需重复连接");
        return;
    }
    let localUid = localStorage.getItem(LOCAL_UID_KEY);
    if(localUid === undefined){
        alert("请检查登录情况");
        return;
    }
    //错误情况处理完毕

    let url = WS_ORDER_URL_PREFIX + localUid;
    websocket = new WebSocket(url);
    //打开事件
    websocket.onopen = function () {
      console.log("websocket已打开", "uid:" + localUid);
      //socket.send("这是来自客户端的消息" + location.href + new Date());
    };
    //获得消息事件socket.onmessage 由于与处理逻辑有关，需要在外部绑定

    //关闭事件
    websocket.onclose = function () {
      console.log("websocket已关闭", "uid:" + localUid);
      websocket = null;
    };
    //发生了错误事件
    websocket.onerror = function () {
      console.error("websocket发生了错误", "uid:" + localUid);
    }
}



export function closeSocket() {
    if (websocket === undefined || websocket === null) {
      alert("请先连接");
      return;
    }
    websocket.close();
    websocket = null;
}