import BookCard from "./book_card";
import { List, Pagination, Space } from "antd";

export default function BookList({ books, pageSize, current, total, onPageChange }) {
    return (
        <Space direction="vertical" align="center" style={{ width: "100%" }}>
            <List
                className="book-list-ant"
                grid={{
                    gutter: 25, column: 4
                }}
                dataSource={books &&  books.map(b => ({
                    ...b,
                    key: b.bid
                }))}
                renderItem={(book, _) => (
                    <List.Item>
                        <BookCard book={book} />
                    </List.Item>
                )}
            />
            <Pagination current={current} pageSize={pageSize}
                onChange={onPageChange} total={total} />
        </Space>
    );
}
