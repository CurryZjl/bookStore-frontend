import { Table } from "antd";
import { formatTime } from "../utils/time";
import OrderItemList from "./order_item_list";

export default function OrderItemTable({ orders }) {

    const columns = [
        {
            title: "总价",
            dataIndex: 'price',
            key: 'price',
            render: (price) => ("￥" + price + "元")
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
        {
            title: '下单时间',
            dataIndex: 'createOn',
            key: 'createOn',
            render: (time) => {
                let fTime = formatTime(time);
                return fTime;
            }
        }
    ]

    return (
        <Table className="w-full px-10"
            columns={columns}
            expandable={{
                expandedRowRender: (record) => (
                    <OrderItemList orderItems={record.orderItems} />
                ),
            }}
            dataSource={orders.map(order => ({
                ...order,
                key: order.id
            }))}
        />
    );
}