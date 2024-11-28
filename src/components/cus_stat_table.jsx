import { Table } from "antd";

export default function CusStatTable({ statItems }) {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Count',
            dataIndex: 'count',
            key: 'count',
        },
    ];
    return (
        <Table columns={columns} dataSource={statItems && statItems.map(b => ({
            ...b,
            key: b.bid
        }))} className="cus-stat-table"
        />
    );
}