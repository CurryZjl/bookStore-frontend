import '../css/tailwind.css';
import '../css/App.css';
import BacisLayout from '../components/layout.jsx';
import BookList from '../components/book_list.jsx';
import BookCard from '../components/book_card.jsx';
import TopSearchBox from '../components/top_search_box.jsx';
import ImageSlider from '../components/image_slider.jsx';
import { searchBooks } from '../service/book.js';
import { useEffect, useState } from 'react';

export default function HomePage() {
    const [books, setBooks] = useState([]);

    const getBooks = async () => {
        let books = await searchBooks();
        setBooks(books);
    }

    useEffect(() => {
        getBooks();
    }, [])

    return (
        <BacisLayout>
        {books && 
            <>
            <link
                rel="stylesheet"
                href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
            />
            <TopSearchBox />
            <ImageSlider />
            <BookList>
                {books.map((book) => <BookCard key={book.id} book={book} />)}
            </BookList>
            </>
        }
        </BacisLayout>
    );
}