import BasicLayout from "../components/layout";
import { getBookById } from "../service/book";
import { BookLayout, BookIntro, BookButtons } from "../components/bookComponents";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function BookPage() {
    const params = useParams();
    const _id = params.bid;
    const [book, setBook] = useState(null);

    const getBook = async () => {
        let pbook = await getBookById(_id);
        setBook(pbook);
    }

    useEffect(() => {
        getBook();
    }, [])

    return (
        <>
            { book && (
                <BasicLayout>
                    <BookLayout>
                        <BookIntro book={book} />
                        <BookButtons />
                    </BookLayout>
                </BasicLayout>

            )}
        </>
    );
};