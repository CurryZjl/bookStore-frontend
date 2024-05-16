import CartItemTable from "../components/cart_item_table";
import BasicLayout from "../components/layout";
import TopSearchBox from "../components/top_search_box";
import { useEffect, useState } from "react";
import { searchCartBooks } from "../service/cart"

export default function CartPage() {
    const [cBooks , setCBooks] = useState([]);

    const getCBooks = async () => {
        let pcBooks = await searchCartBooks();
        setCBooks(pcBooks);
    }

    useEffect(() => {
        getCBooks();
    }, [])

    return (
     <BasicLayout>
        <TopSearchBox/>
        <h1 className="mb-5 text-lg"><b>MyCart</b></h1>
        {cBooks && cBooks.length !== 0 && 
        <CartItemTable cartItems={cBooks}/>}
     </BasicLayout>
    );
}