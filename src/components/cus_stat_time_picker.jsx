import { DatePicker } from 'antd';
import { getStatBooksByTimeBetween } from '../service/stat';
import "../css/order.scss";
const { RangePicker } = DatePicker;

export default function CusStatTimePicker({setStatItem }) {
    const handleRangeChange = async (_, dates) => {
        let item;
        if (dates && dates.length === 2) {
            try {
                item = await getStatBooksByTimeBetween(dates[0], dates[1]);
            } catch (e) {
                console.log(e);
            }
            console.log(item);
           setStatItem(item);
        }
    }
    return (
        <>
            <RangePicker className='order-time-range-picker'
                onChange={handleRangeChange}
                placeholder={["选择起始时间", "选择终止时间"]}
            />
        </>
    );
}
