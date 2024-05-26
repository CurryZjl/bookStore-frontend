import { Link } from "react-router-dom";
import { putNewCartBook } from "../service/cart";
import { message as antdMessage } from "antd";
import { convertLongToPriceString } from "../utils/price";

export default function BookCard({ book }) {
    async function  handleAddBookInCart() {
        let res = await putNewCartBook(book.bid);
        if(res.valid){
            antdMessage.success(res.message);
        }else{
            antdMessage.error(res.message);
        }
        
    }

    const path = book.imagePath;
    return (
        
            <div className="book-card">
                <Link to={'/book/' + book.bid} className='flex flex-col justify-start'>
                <img
                    src={path}
                    alt={book.name}
                    className="book-image"
                />
                <h2 className="text-lg font-bold mb-2">{book.name}</h2>
                <p className="text-gray-600">作者：{book.author}</p>
                <p className="text-gray-600">价格：¥{convertLongToPriceString(book.price)}</p>
                </Link>
                <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" onClick={handleAddBookInCart}>
                    加入购物车
                </button>
            </div>
        

    );
}