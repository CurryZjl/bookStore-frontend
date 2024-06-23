import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { getConsumptionsBetween } from "../../service/admin";
import { Table } from "antd";
import { convertLongToPriceString } from "../../utils/price";
import OrderTimePicker from "../order_time_picker";

export default function StatViewer() {
    const [consumptions, setConsumptions] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();

    const startTime = searchParams.get("startTime") || "";
    const endTime = searchParams.get("endTime") || "";

    const getConsumptions = async () => {
        let res = await getConsumptionsBetween(startTime, endTime);
        setConsumptions(res);
    }

    useEffect(() => {
        getConsumptions();
    }, [])

    useEffect(() => {
        getConsumptions();
    }, [startTime, endTime])

    const columns = [
        {
            title: '用户ID',
            dataIndex: 'uid',
            key: 'uid',
        },
        {
            title: "用户名",
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '总消费',
            dataIndex: 'price_all',
            key: 'price_all',
            render: (price) => ("￥" + convertLongToPriceString(price) + "元"),
        }
    ]

    const handleTimeChange = (start, end) => {
        setSearchParams({
            "startTime": start,
            "endTime": end,
        })
    } 


    return (
        <>
            <OrderTimePicker handleTimeChange={handleTimeChange} />
            <Table className="w-full px-10"
                columns={columns}
                dataSource={consumptions && consumptions.map(consumption => ({
                    ...consumption,
                    key: consumption.uid
                }))}
            />
        </>
    )
}