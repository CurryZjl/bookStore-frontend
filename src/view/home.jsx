import '../css/tailwind.css';
import '../css/App.css';
import BacisLayout from '../components/layout.jsx';
import BookList from '../components/book_list.jsx';
import BookCard from '../components/book_card.jsx';
import TopSearchBox from '../components/top_search_box.jsx';
import ImageSlider from '../components/image_slider.jsx';
import { searchBooks } from '../service/book.js';
import { getPosters } from '../service/poster.js'; 
import { useEffect, useState } from 'react';

export default function HomePage() {
    const [books, setBooks] = useState([]);
    const [posters, SetPosters] = useState([]);

    const getBooks = async () => {
        let books = await searchBooks();
        setBooks(books);
    }
    const setPosters = async () => {
        let posters = await getPosters();
        SetPosters(posters);
    }
    

    useEffect(() => {
        getBooks();
        setPosters();
    }, [])

    return (
        <BacisLayout>
        {books && posters &&  
            <>
            <link
                rel="stylesheet"
                href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
            />
            <TopSearchBox />
            <ImageSlider posters={posters}/>
            <BookList>
                {books.map((book) => <BookCard key={book.id} book={book} />)}
            </BookList>
            </>
        }
        </BacisLayout>
    );
}