import { DatePicker } from 'antd';
import { getOrdersByTimeBetween } from '../service/order';
const { RangePicker } = DatePicker;

export default function OrderTimePicker({handleTimeChange}) {
    const handleRangeChange = async (_, dates) => {
        if (dates && dates.length === 2) {
           handleTimeChange(dates[0], dates[1]);
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
