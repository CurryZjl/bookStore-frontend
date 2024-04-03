import { getBookByName } from "../service/book";
import { Link } from "react-router-dom";
export default function BookCard({ _name }) {
    let book = getBookByName(_name);
    const path = book.imagePath;
    return (
        <Link to={'/book/' + book.id} className='flex flex-col justify-start'>
            <div className="book-card">
                <img
                    src={path}
                    alt={book.name}
                    className="book-image"
                />
                <h2 className="text-lg font-bold mb-2">{book.name}</h2>
                <p className="text-gray-600">作者：{book.author}</p>
                <p className="text-gray-600">价格：¥{book.price}</p>
                <Link to=''>
                    <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                        购买
                    </button>
                </Link>
            </div>
        </Link>

    );
}