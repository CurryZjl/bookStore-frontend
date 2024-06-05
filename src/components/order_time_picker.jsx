import { DatePicker } from 'antd';
import { getOrdersByTimeBetween } from '../service/order';
const { RangePicker } = DatePicker;

export default function OrderTimePicker({ setOrders }) {
    const handleRangeChange = async (_, dates) => {
        let orders;
        if (dates && dates.length === 2) {
            try {
                orders = await getOrdersByTimeBetween(dates[0], dates[1]);
            } catch (e) {
                console.log(e);
            }
            console.log(orders);
            setOrders(orders);
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
