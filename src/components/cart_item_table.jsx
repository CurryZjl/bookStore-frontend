import { Table, Tag, InputNumber, Button } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import PlaceOrderModal from "./place_order-modal";
import { deleteCartItem, changeCartItemAmount } from "../service/cart";
import { message as antdMessage } from "antd";
import { convertLongToPriceString , computeTotalPrice} from "../utils/price";
import "../css/cart.scss"

export default function CartItemTable({ cartItems }) {
    const [selectedItems, setSelectedItems] = useState([]);
    const [showModel, setShowModel] = useState(false);
    const [cartItemsState, setCartItemsState] = useState(cartItems);
    //console.log(cartItems,cartItemsState);
    async function DeleteItem(cid) {
        let res = await deleteCartItem(cid);
        if (res.valid) {
            antdMessage.success(res.message);
            const updatedCartItems = cartItemsState.filter(item => item.cid !== cid);
            setCartItemsState(updatedCartItems);
        } else {
            antdMessage.error(res.message);
        }
    }

    const handleDeleteItem = (cid) => {
        DeleteItem(cid);
    }

    function handleShowModel() {
        setShowModel(true);
    }

    function onCancel() {
        setShowModel(false);
    }

    function handleOrderSubmit() {
        setShowModel(false);
        const selectedCids = selectedItems.map(item => item.cid);
        // 从cartItemsState中删除已选择购买的对象
        selectedCids.map(cid => deleteCartItem(cid))
        const updatedCartItems = cartItemsState.filter(item => !selectedCids.includes(item.cid));
        setCartItemsState(updatedCartItems);
        setSelectedItems([]);
    }

    async function changeAmount(cid, amount) {
        if(amount <= 0 ){
            antdMessage.error("数量设置不合法，请输入正数")
            return;
        }
        let res = await changeCartItemAmount(cid, amount);
        if (res.valid) {
            antdMessage.success(res.message);
            const updatedCartItems = cartItemsState.map(item => {
                if (item.cid === cid) {
                    item.amount = amount;
                }
                return item;
            });
            const updatedSelectItems = selectedItems.map(item => {
                if (item.cid === cid) {
                    item.amount = amount;
                }
                return item;
            });
            setCartItemsState(updatedCartItems);
            setSelectedItems(updatedSelectItems);
        } else {
            antdMessage.error(res.message);
        }
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
            render: (_, item) =>
                <InputNumber min={1} value={item.amount}
                    onPressEnter={(e) => {
                        e.preventDefault();
                        changeAmount(item.cid, e.target.value);
                        e.target.blur();
                    }}
                />
        },
        {
            title: 'Tag',
            dataIndex: 'bookDto.tag',
            key: 'tag',
            render: (_, item) => {
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
            render: (_, item) => '￥' + convertLongToPriceString(item.bookDto.price) + "元"
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

    if(cartItems)
    return (
        <>
            {showModel && <PlaceOrderModal onCancel={onCancel} sBooks={selectedItems} onSubmit={handleOrderSubmit} price={computeTotalPrice(selectedItems)} />}
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
                    总价：{computeTotalPrice(selectedItems)}元
                </p>
                <Button type="primary" disabled={selectedItems.length === 0} onClick={handleShowModel}
                    className="cart-buy-btn">
                    立即下单
                </Button>
            </div>
        </>
    );
    else{
        return (
            <Table className="w-full px-10"/>
        )
    }
}