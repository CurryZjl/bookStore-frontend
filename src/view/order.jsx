import OrderItemTable from "../components/order_item_table";
import BasicLayout from "../components/layout";
import { Input } from 'antd';
import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { getOrders, getOrdersByBookName, getOrdersByTimeBetween } from "../service/order";
import OrderTimePicker from "../components/order_time_picker";
import "../css/order.scss";

const { Search } = Input;

export default function OrderPage() {
    const [orders, setOrders] = useState([]);
    const [totalPage, setTotalPage] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();
    const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 0;
    const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 10;
    const bookName = searchParams.get("bookName") || "";
    const startTime = searchParams.get("startTime") || "";
    const endTime = searchParams.get("endTime") || "";

    const searchOrders = async () => {
        let pOrders;
        if (bookName !== "")
            pOrders = await getOrdersByBookName(bookName, pageIndex, pageSize);
        else if(startTime !== "" && endTime !== "")
            pOrders = await getOrdersByTimeBetween(startTime, endTime, pageIndex , pageSize);
        else 
            pOrders = await getOrders(pageIndex, pageSize);
        try{
            setOrders(pOrders.content);
            setTotalPage(pOrders.totalPages);
        }catch(e){
            console.log(e);
        }
        
        console.log(pOrders);
    }

    useEffect(() => {
        searchOrders();
    }, [pageIndex, pageSize, bookName, startTime, endTime])

    const handlePageChange = (page) => {
        if (bookName !== "")
            setSearchParams({ bookName: bookName, pageSize: pageSize, pageIndex: page - 1 });
        else if (startTime !== "" && endTime !== "")
            setSearchParams({ startTime: startTime, endTime: endTime, pageSize: pageSize, pageIndex: page - 1 });
        else
            setSearchParams({ pageSize: pageSize, pageIndex: page - 1 })
    }

    const handleSearch = (bookName) => {
        setSearchParams({
            "bookName": bookName,
            "pageIndex": 0,
            "pageSize": 10
        });
    };

    const handleTimeChange = (start, end) => {
        setSearchParams({
            "startTime": start,
            "endTime": end,
            "pageIndex": 0,
            "pageSize": 10
        })
    } 

    return (
        <BasicLayout>
            <h1 className="mt-5 text-lg"><b>MyOrder</b></h1>
            <div className="order-top-picker">
                <Search placeholder="输入书本名" onSearch={handleSearch} enterButton size="large" />
                <OrderTimePicker  handleTimeChange={handleTimeChange}/>
            </div>
            {orders && <OrderItemTable orders={orders} pageSize={pageSize} total={totalPage * pageSize} current={pageIndex + 1} onPageChange={handlePageChange} />}
        </BasicLayout>
    );
}