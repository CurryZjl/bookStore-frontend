import { formatTime, calcTime } from "../../utils/time";
import OrderItemList from "../order_item_list";
import { convertLongToPriceString } from "../../utils/price";
import { Table, Pagination } from 'antd';

export default function AdminOrderItemTable({ orders, pageSize, current, total, onPageChange }) {

    const columns = [
        {
            title: '用户ID',
            dataIndex: 'uid',
            key: 'uid',
        },
        {
            title: "总价",
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
            defaultSortOrder: 'ascend',
            render: (price) => ("￥" + convertLongToPriceString(price) + "元"),
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
            defaultSortOrder: 'ascend',
            sorter: (a, b) => calcTime(a, b),
            sortDirections: ['ascend', 'descend', 'ascend'],
            render: (time) => {
                let fTime = formatTime(time);
                return fTime;
            }
        }
    ]

    if (orders)
        return (
            <>
                <Table className="w-full px-10"
                    columns={columns}
                    pagination = {{
                        position: ["none", "none"],
                      }}
                    expandable={{
                        expandedRowRender: (record) => (
                            <OrderItemList orderItems={record.orderItems} />
                        ),
                    }}
                    dataSource={orders.map(order => ({
                        ...order,
                        key: order.oid
                    }))}
                />
                <Pagination current={current} pageSize={pageSize}
                    onChange={onPageChange} total={total} />
            </>
        )
    else
        return (
            <Table className="w-full px-10" />
        );
}