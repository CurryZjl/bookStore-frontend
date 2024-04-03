import BasicLayout from "../components/layout";
import { getBookById } from "../service/book";
import { BookLayout, BookIntro, BookButtons } from "../components/bookComponents";
import { useParams } from "react-router-dom";


export default function BookPage() {
    const params = useParams();
    const _id = params.bid;
    const _book = getBookById(parseInt(_id));
    if (_book == null) {
        console.log('NO')
        return <></>
    }
    return (
        <BasicLayout>
            <BookLayout>
                <BookIntro book={_book} />
                <BookButtons />
            </BookLayout>
        </BasicLayout>
    );
};