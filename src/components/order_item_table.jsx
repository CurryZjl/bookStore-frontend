import { Table } from "antd";
import { useState, useEffect } from "react";
import { getOrders } from "../service/order";

export default function OrderItemTable() {
    //搜索得到order数据
    const [orders, setOrders] = useState([]);

    const seachOrders = async () => {
        let pOrders = await getOrders();
        setOrders(pOrders);
    }

    useEffect(() => {
        seachOrders();
    }, [])


    const columns = [
        {
            title: '书籍',
            dataIndex: 'bookName',//指定这一列的对象
            key: 'book',
        },
        {
            title: '数量',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: "总价",
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '收货人',
            dataIndex: 'receiver',
            key: 'receiver',
        },
        {
            title: '联系电话',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '收货地址',
            dataIndex: 'address',
            key: 'address',
        },
    ]

    return (
        <>
            {orders &&
                <Table className="w-full px-10"
                    columns={columns}
                    dataSource={orders}
                >
                </Table>
            }
        </>

    );
}