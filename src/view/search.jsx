import BasicLayout from "../components/layout";
import { Input, Card } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { getBookAuthorByName } from "../service/author";
import "../css/order.scss";

const { Search } = Input;

export default function SearchPage() {
    const [author, setAuthor] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const bookName = searchParams.get("bookName") || "";

    useEffect(() => {
        searchAuthor();
    }, [bookName])

    const searchAuthor = async () => {
        let res;
        if(bookName != ""){
            res = await getBookAuthorByName(bookName);
        }
        try{
            setAuthor(res);
        }catch(e){
            console.log(e);
        }
    }

    const handleSearch = (bookName) => {
        setSearchParams({
            "bookName": bookName
        });
    };

    return (
     <BasicLayout>
        <h1 className="mt-5 text-lg"><b>通过书本名查找作者</b></h1>
        <div className="order-top-picker">
                <Search placeholder="输入书本名" onSearch={handleSearch} enterButton size="large" />
        </div>
        <Card title="搜索结果为：" bordered={false} style={{ width: 300, height: 300 }}>
            <p>{author === null ? "" : author}</p>
        </Card>
     </BasicLayout>
    );
}