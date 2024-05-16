import moment from "moment";
import "moment/locale/zh-cn";

export function formatTime(_time){
    const time = new Date(_time);
    moment.locale("zh-cn");
    const showTime = moment(time).calendar();
    return showTime;
}