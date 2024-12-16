import '../css/tailwind.css';
import '../css/App.css';
import BacisLayout from '../components/layout.jsx';
import BookList from '../components/book_list.jsx';
import { searchBooksByTagName } from '../service/book.js';
import { Input} from 'antd';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const { Search } = Input;

export default function TagNamePage() {
    const [books, setBooks] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("tag") || "";

    const getBooksByTag = async () => {
        let res = await searchBooksByTagName(query);
        setBooks(res);
    }

    const handleSearch = (tagName) => {
        setSearchParams({
            "tag": tagName
        });
    };


    useEffect(() => {
        getBooksByTag();
    }, [query])

    return (
        <BacisLayout>
            <h1 className="mt-5 text-lg"><b>通过标签名查找书籍</b></h1>
            <div className="order-top-picker">
             <Search placeholder="输入标签名" onSearch={handleSearch} enterButton size="large" />
             </div>
            <BookList books={books} pageSize={books.length} total={books.length} current={1} />
        </BacisLayout>
    );
}