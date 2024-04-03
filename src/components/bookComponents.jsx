import { Link } from "react-router-dom";

export function BookLayout({ children }) {
    return (
        <div className="book-dialog">
            <div className="dialog-background">
                {children}
            </div>
        </div>
    );
}

export function BookIntro({ book }) {
    return (
        <div className="flex flex-row justify-center gap-10">
            <img
                src={book.imagePath}
                alt={book.name}
                className="w-96 h-96 object-cover mb-10 mt-10"
            />
            <div className="flex flex-col flex-nowrap justify-between py-3 mt-10 max-h-96">
                <h2 className="text-2xl font-bold mb-2">
                    {book.name}
                </h2>
                <p className="text-gray-600 ">
                    <span className="font-bold">作者： </span>
                    <span>
                        {book.author}
                    </span>
                </p>
                <p className="text-gray-600">
                    <span className="font-bold">分类： </span>
                    <span>
                        {book.tag}
                    </span>
                </p>
                <p className="text-gray-600">
                    <span className="font-bold">价格： </span>
                    <span className="text-lg text-red-500">
                        ¥{book.price}
                    </span>
                </p>
                <p className="text-gray-600">
                    <span className="font-bold">状态： </span>
                    <span className={book.status === 0 && 'text-red-500'}>
                        {book.status > 0 ? '有货' : '缺货'}
                    </span>
                    <span className="text-sm text-gray-400">  库存{book.status}件</span>
                </p>
                <p className="text-gray-600 font-bold">作品简历：</p>
                <p className="text-gray-500 overflow-hidden">
                    {book.intro}
                </p>
            </div>
        </div>
    );
}

export function BookButtons() {
    return (
        <div className="flex flex-row justify-center gap-20 pt-5 mb-10">
            <button className="btn-cart-detail">加入购物车</button>
            <button className="btn-buy-detail">立即购买</button>
            <Link to={{ pathname: '/' }}>
                <button className="btn-back" >返回首页</button>
            </Link>
        </div>
    );
}