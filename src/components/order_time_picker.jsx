import { DatePicker } from 'antd';
import { useState } from 'react';
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

// const [range, setRange] = useState(null);

// useEffect(()=>{
//     handleTaskChange()
// },[range])

// const handleTaskChange = ()=>{
//     let s = range == null ? new Date() : range[0].toDate();
//     let e = range == null ? new Date() : range[1].toDate();

//     const formData = {
//         startTime : s,
//         endTime : e
//     }
// }

// const handleDateChange = (value, dateString) => {
//     setStartTime(dateString[0]);
//     setEndTime(dateString[1]);
// }



// return (
//     <>
//         <RangePicker showTime className='order-time-range-picker'
//             onChange={handleTimeChange}
//             placeholder={["选择起始时间", "选择终止时间"]}
//         />
//     </>
// );
// }