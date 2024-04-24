import { Table, Tag } from "antd";
import { Link } from "react-router-dom";
import { useEffect , useState } from "react";
import { searchCartBooks } from "../service/cart"


export default function CartItemTable() {
    const [cBooks,setCBooks] = useState([]);

    const getCBooks = async () =>{
        let pcBooks = await searchCartBooks();

        setCBooks(pcBooks);
    }

    useEffect(()=>{
        getCBooks();
    },[])

    const handleDeleteItem = (id) => {

    }

    const columns = [
        {
            title: 'Cover',
            dataIndex: 'imagePath',//指定这一列的对象
            key: 'cover',
            render: (_,item) => <img src={item.imagePath} alt='cover' className="w-20 h-20" /> //由于有了dataIndex，第一个参数就代表这行的值，即imagePath="***",这个‘***’字符串，第二个参数代表整行的数据对象，即现在的这本书
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
        <>
        {cBooks &&
            <Table columns={columns} dataSource={cBooks.map(b => ({
                ...b,
                key: b.id
            }))} className=" w-full px-10" />
        }
        </>
    );
}