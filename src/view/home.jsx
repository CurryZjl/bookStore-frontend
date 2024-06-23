import '../css/tailwind.css';
import '../css/App.css';
import BacisLayout from '../components/layout.jsx';
import BookList from '../components/book_list.jsx';
import TopSearchBox from '../components/top_search_box.jsx';
import ImageSlider from '../components/image_slider.jsx';
import { searchBooksByName } from '../service/book.js';
import { getPosters } from '../service/poster.js';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function HomePage() {
    const [books, setBooks] = useState([]);
    const [posters, SetPosters] = useState([]);


    const [totalPage, setTotalPage] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query") || "";
    const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 0;
    const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 8;

    const getBooks = async () => {
        let res = await searchBooksByName(query, pageIndex, pageSize);
        let books = res.content;
        let totalP = res.totalPages;
        setBooks(books);
        setTotalPage(totalP);
    }
    const setPosters = async () => {
        let posters = await getPosters();
        SetPosters(posters);
    }


    useEffect(() => {
        getBooks();
    }, [query, pageIndex, pageSize])

    useEffect(() => {
        setPosters();
    }, [])

    const handlePageChange = (page) => {
        if (query !== "")
            setSearchParams({ pageSize: pageSize, query: query, pageIndex: page - 1 });
        else{
            setSearchParams({ pageSize: pageSize, pageIndex: page - 1 });
        }
}

return (
    <BacisLayout>
        {posters &&
            <>
                <link
                    rel="stylesheet"
                    href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
                />
                <TopSearchBox />
                <ImageSlider posters={posters} />
                <BookList books={books} pageSize={pageSize} total={totalPage * pageSize} current={pageIndex + 1} onPageChange={handlePageChange} />
            </>
        }
    </BacisLayout>
);
}