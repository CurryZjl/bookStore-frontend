import { Table, Tag, InputNumber, Button } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import PlaceOrderModal from "./place_order-modal";
import { deleteCartItem } from "../service/cart";
import { message as antdMessage } from "antd";
import "../css/cart.scss"

export default function CartItemTable({cartItems}) {
    const [selectedItems, setSelectedItems] = useState([]);
    const [showModel, setShowModel] = useState(false); 
    const [cartItemsState, setCartItemsState] = useState(cartItems);
    console.log(cartItems,cartItemsState);
    async function DeleteItem (cid){
        let res = await deleteCartItem(cid);
        if(res.valid){
            antdMessage.success(res.message);
            const updatedCartItems = cartItemsState.filter(item => item.cid !== cid);
            setCartItemsState(updatedCartItems);
        }else{
            antdMessage.error(res.message);
        }
    }

    const handleDeleteItem = (cid) => {
        DeleteItem(cid);
    }

    function computePrice() {
        const prices = selectedItems.map(item => item.bookDto.price * item.amount);
        return prices.length > 0 ?
            prices.reduce((prev, cur) => prev + cur) : 0;
    }

    function handleShowModel() {
        setShowModel(true);
    }

    function onCancel() {
        setShowModel(false);
    }

    function handleOrderSubmit() {
        setShowModel(false);
        console.log("submit");
    }

    const columns = [
        {
            title: 'Cover',
            dataIndex: 'bookDto.imagePath',//指定这一列的对象
            key: 'cover',
            render: (_, item) => <img src={item.bookDto.imagePath} alt='cover' className="w-20 h-20" /> //由于有了dataIndex，第一个参数就代表这行的值，即imagePath="***",这个‘***’字符串，第二个参数代表整行的数据对象，即现在的这本书
        },
        {
            title: 'Name',
            dataIndex: 'bookDto.name',
            key: 'name',
            render: (_, item) => (<Link to={'/book/' + item.bookDto.bid} className=" text-blue-400 hover:underline">{item.bookDto.name}</Link>),
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (number, item) => <InputNumber min={1} defaultValue={number} value={item.amount} onChange={(newNumber) => {
                console.log(newNumber);
                //TODO
            }} />
        },
        {
            title: 'Tag',
            dataIndex: 'bookDto.tag',
            key: 'tag',
            render: (_,item) => {
                return (
                    <Tag color='geekblue' key={item.bookDto.tag}>
                        {item.bookDto.tag}
                    </Tag>
                );
            },
        },
        {
            title: 'Price',
            dataIndex: 'bookDto.price',
            key: 'price',
            render: (_,item) => '￥' + item.bookDto.price
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, item) => <button className='btn-cart-delete max-h-10 flex items-center justify-center' onClick={(e) => {
                e.preventDefault();
                handleDeleteItem(item.cid);
            }}>delete</button>,
        }
    ]

    return (
        <>
            {showModel && <PlaceOrderModal onCancel={onCancel} sBooks={selectedItems} onSubmit={handleOrderSubmit} />}
            <Table columns={columns} dataSource={cartItemsState.map(b => ({
                ...b,
                key: b.cid
            }))} className=" w-full px-10"
                rowSelection={{
                    onChange: (_, selectedItems) => {
                        setSelectedItems(selectedItems);
                    }
                }}
            />
            <div className="cart-footer">
                <p>
                    总价：{computePrice()}元
                </p>
                <Button type="primary" disabled={selectedItems.length === 0} onClick={handleShowModel}
                    className="cart-buy-btn">
                    立即下单
                </Button>
            </div>
        </>
    );
}