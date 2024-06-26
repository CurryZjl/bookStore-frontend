import AdminOrderItemTable from './adminOrderTable';
import { Input } from 'antd';
import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { getAllOrders } from "../../service/admin";
import OrderTimePicker from "../order_time_picker";
import "../../css/order.scss";

const { Search } = Input;

export default function OrdersViewer() {
    const [orders, setOrders] = useState([]);
    const [totalPage, setTotalPage] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();
    const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 0;
    const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 10;
    const bookName = searchParams.get("bookName") || "";
    const startTime = searchParams.get("startTime") || "";
    const endTime = searchParams.get("endTime") || "";

    const searchOrders = async () => {
        try {
            const pOrders = await getAllOrders(bookName, startTime, endTime, pageIndex, pageSize);
            setOrders(pOrders.content);
            setTotalPage(pOrders.totalPages);
            console.log(pOrders);
        } catch (e) {
            console.log(e);
        }

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
        <>
            <div className="order-top-picker">
                <Search placeholder="输入书本名" onSearch={handleSearch} enterButton size="large" />
                <OrderTimePicker handleTimeChange={handleTimeChange} />
            </div>
            {orders && <AdminOrderItemTable orders={orders} pageSize={pageSize} total={totalPage * pageSize} current={pageIndex + 1} onPageChange={handlePageChange} />}
        </>
    );
}