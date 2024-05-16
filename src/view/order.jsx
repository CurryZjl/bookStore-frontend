import OrderItemTable from "../components/order_item_table";
import BasicLayout from "../components/layout";
import TopSearchBox from "../components/top_search_box";
import { useState, useEffect } from "react";
import { getOrders } from "../service/order";

export default function OrderPage() {
    const [orders, SetOrders] = useState([]);

    const seachOrders = async () => {
        let pOrders = await getOrders();
        SetOrders(pOrders);
        //console.log(pOrders);
    }

    useEffect(() => {
        seachOrders();
    }, [])

    return (
     <BasicLayout>
        <TopSearchBox/>
        <h1 className="mb-5 text-lg"><b>MyOrder</b></h1>
        { orders && <OrderItemTable orders={orders}/>}
     </BasicLayout>
    );
}