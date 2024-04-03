import { Table, Tag } from "antd";
import { books } from "../service/book";
import { Link } from "react-router-dom";


export default function CartItemTable() {
    const handleDeleteItem = (id) => {

    }

    let cartBooks = books.filter(book => 
        book.amount > 0 );

    const columns = [
        {
            title: 'Cover',
            dataIndex: 'imagePath',
            key: 'cover',
            render: (_,item) => <img src={item.imagePath} alt='cover' className="w-20 h-20" />
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_,book) => (<Link to={'/book/' + book.id } className=" text-blue-400 hover:underline">{book.name}</Link>),
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Tag',
            dataIndex: 'tag',
            key: 'tag',
            render: tag => {
                return (
                    <Tag color='geekblue' key={tag}>
                        {tag}
                    </Tag>
                );
            },
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: price => '￥'+ price
        },
        {
            title: 'Action',
            key: 'action',
            render: (_,item) => <button  className='btn-cart-delete max-h-10 flex items-center justify-center' onClick={(e) => {
                e.preventDefault();
                handleDeleteItem(item.id); 
            }}>delete</button>,
        }
    ]

    return (
        <Table columns={columns} dataSource={cartBooks} className=" w-full px-10" />
    );
}