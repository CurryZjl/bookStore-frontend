import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { getSalesBetween } from "../service/admin";
import { Table , Avatar} from "antd";
import BasicLayout from "../components/layout";
import OrderTimePicker from "../components/order_time_picker";

export default function RankPage() {
    const [sales, setSales] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 6 });

    const [searchParams, setSearchParams] = useSearchParams();

    const startTime = searchParams.get("startTime") || "";
    const endTime = searchParams.get("endTime") || "";

    const getSales = async () => {
        let res = await getSalesBetween(startTime, endTime);
        setSales(res);
    }

    const handlePaginationChange = (page) => {
        setPagination({ ...pagination, current: page });
    }

    useEffect(() => {
        getSales();
    }, [])

    useEffect(() => {
        getSales();
    }, [startTime, endTime])

    const columns = [
        {
            title: '书籍ID',
            dataIndex: 'bid',
            key: 'bid',
        },
        {
            title: "书名",
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '封面',
            dataIndex: 'imagePath',
            key: 'imagePath',
            render: (imagePath) => <Avatar size={80} src = {imagePath} shape="square"/>,
        },
        {
            title: "销量",
            dataIndex: 'amountAll',
            key: 'amountAll',
        }
    ]

    const handleTimeChange = (start, end) => {
        setSearchParams({
            "startTime": start,
            "endTime": end,
        })
    } 


    return (
        <BasicLayout>
             <h1 className="mt-5 text-lg"><b>销量排行</b></h1>
            <OrderTimePicker handleTimeChange={handleTimeChange} />
            <Table className="w-full px-10"
                columns={columns}
                dataSource={sales && sales.map(sale => ({
                    ...sale,
                    key: sale.bid
                }))}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: sales && sales.length,
                    onChange: handlePaginationChange,
                    showSizeChanger: false,
                    showQuickJumper: false,
                }}
            />
        </BasicLayout>
    )
}