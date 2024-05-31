import moment from "moment";
import "moment/locale/zh-cn";

export function formatTime(_time){
    const time = new Date(_time);
    moment.locale("zh-cn");
    const showTime = moment(time).calendar();
    return showTime;
}

export function calcTime(a, b){
    const timeA = new Date(a);
    const timeB = new Date(b);
    const MtimeA = moment(timeA);
    const MtiemB = moment(timeB); 
    if(MtimeA.isBefore(MtiemB))
        return 1;
    else
        return -1;
}