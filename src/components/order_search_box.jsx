import { useState } from "react";
import { getOrdersByBookName } from "../service/order";
import { useSearchParams } from "react-router-dom";

export default function OrderSearchBox({ setOrders }) {
    const [bookName, setBookName] = useState('');

    const [searchParams, setSearchParams] = useSearchParams();
    const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 0;
    const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 10;

    const handleInputChange = (e) => {
        setBookName(e.target.value);
    };

    const handleSearch = async () => {
        const orders = await getOrdersByBookName(bookName, pageIndex, pageSize);
        //console.log(orders);
        setOrders(orders.content);
        console.log(orders);
    }

    return (
        <div className="search-bar">
            <input type="text" placeholder="以书籍名称搜索订单" value={bookName} onChange={handleInputChange} />
            <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-sm w-20"
                onClick={handleSearch}>搜索</button>
        </div>
    );
}