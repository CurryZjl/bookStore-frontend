import OrderItemTable from "../components/order_item_table";
import BasicLayout from "../components/layout";
import TopSearchBox from "../components/top_search_box";

export default function OrderPage() {
    return (
     <BasicLayout>
        <TopSearchBox/>
        <h1 className="mb-5 text-lg"><b>MyOrder</b></h1>
        <OrderItemTable/>
     </BasicLayout>
    );
}