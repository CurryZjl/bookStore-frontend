import OrderItemTable from "../components/order_item_table";
import BasicLayout from "../components/layout";
import OrderSearchBox from "../components/order_search_box";
import { useState, useEffect } from "react";
import { getOrders } from "../service/order";
import OrderTimePicker from "../components/order_time_picker";
import "../css/order.scss";

export default function OrderPage() {
    const [orders, setOrders] = useState([]);

    const seachOrders = async () => {
        let pOrders = await getOrders();
        setOrders(pOrders);
        //console.log(pOrders);
    }

    useEffect(() => {
        seachOrders();
    }, [])

    return (
        <BasicLayout>
            <h1 className="mt-5 text-lg"><b>MyOrder</b></h1>
            <div className="order-top-picker">
                <OrderSearchBox setOrders={setOrders} />
                <OrderTimePicker setOrders={setOrders}/>
            </div>
            {orders && <OrderItemTable orders={orders} />}
        </BasicLayout>
    );
}