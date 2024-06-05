import { Link } from "react-router-dom";
import { Table } from "antd";

export default function CusStatTable({ statItems }) {
    const columns = [
        {
            title: 'Cover',
            dataIndex: 'imagePath',//指定这一列的对象
            key: 'cover',
            render: (_, item) => <img src={item.imagePath} alt='cover' className="w-20 h-20" />
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, item) => (<Link to={'/book/' + item.bid} className=" text-blue-400 hover:underline">{item.name}</Link>),
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