import '../css/tailwind.css';
import '../css/App.css';
import BacisLayout from '../components/layout.jsx';
import BookList from '../components/book_list.jsx';
import BookCard from '../components/book_card.jsx';
import TopSearchBox from '../components/top_search_box.jsx';
import ImageSlider from '../components/image_slider.jsx';

export default function HomePage() {
    return (
        <BacisLayout>
            <link
                rel="stylesheet"
                href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
            />
            <TopSearchBox />
            <ImageSlider />
            <BookList>
                <BookCard _name={'chiikawa1'} />
                <BookCard _name={'chiikawa2'} />
                <BookCard _name={'chiikawa3'} />
                <BookCard _name={'chiikawa4'} />
                <BookCard _name={'chiikawa5'} />
                <BookCard _name={'chiikawa6'} />
                <BookCard _name={'chiikawa7'} />
                <BookCard _name={'chiikawa8'} />
            </BookList>
        </BacisLayout>
    );
}