import CartItemTable from "../components/cart_item_table";
import BasicLayout from "../components/layout";
import TopSearchBox from "../components/top_search_box";

export default function CartPage() {
    return (
     <BasicLayout>
        <TopSearchBox/>
        <h1 className="mb-5 text-lg"><b>MyCart</b></h1>
        <CartItemTable/>
     </BasicLayout>
    );
}