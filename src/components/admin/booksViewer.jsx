import { Table, Tag, InputNumber, Button, Pagination, Input, Form, Upload } from "antd";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { message as antdMessage } from "antd";
import { convertLongToPriceString } from "../../utils/price";
import { deleteBookByBid, searchBooksByName, updateBook } from "../../service/book";

const { Search } = Input;

export default function BooksViewer() {
    const [showModel, setShowModel] = useState(false);
    const [books, setBooks] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [editingKey, setEditingKey] = useState(-1);
    const [newImage, setNewImage] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query") || "";
    const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 0;
    const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 8;

    const getBooks = async () => {
        try {
            let res = await searchBooksByName(query, pageIndex, pageSize);
            setBooks(res.content);
            setTotalPage(res.totalPages);
        } catch (error) {
            console.error("Failed to fetch books:", error);
        }
    }

    useEffect(() => {
        getBooks();
    }, [query, pageIndex, pageSize])

    const handleSearch = (bookName) => {
        setSearchParams({
            "query": bookName,
            "pageIndex": 0,
            "pageSize": 8
        })
    }

    const handleDeleteItem = async (bid) => {
        let res = await deleteBookByBid(bid);
        if (res.valid) {
            antdMessage.success(res.message);
            const updatedBooks = books.filter(item => item.bid !== bid);
            setBooks(updatedBooks);
        } else {
            antdMessage.error(res.message);
        }
    }

    const handleSave = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...books];
            const index = newData.findIndex((item) => key === item.bid);

            if (index > -1) {
                const item = newData[index];
                const updatedRow = { ...item, ...row };

                if (newImage) {
                    updatedRow.imagePath = newImage;
                }

                console.log("editing:", updatedRow);
                if (updatedRow.status > 10000 || updatedRow.status < 0) {
                    antdMessage.warning("书籍数量输入错误(范围0~10000)");
                    return;
                }

                const res = await updateBook(updatedRow);
                if (res.valid) {
                    newData.splice(index, 1, updatedRow);
                    setBooks(newData);
                    setEditingKey(-1);
                    antdMessage.success(res.message);
                }
                else{
                    antdMessage.error(res.message);
                }

            } else {
                antdMessage.error('Book not found');
            }

        } catch (err) {
            console.log(err);
        }
    }

    const edit = (record) => {
        console.log(record);
        form.setFieldsValue({
            name: record.name,
            author: record.author,
            isbn: record.isbn,
            status: record.status,
        });
        setEditingKey(record.bid);
    }

    const handleCancel = () => {
        setEditingKey(-1);
    }

    const isEditing = (record) => record.bid === editingKey;

    const handlePageChange = (page) => {
        if (query !== "")
            setSearchParams({ pageSize: pageSize, query: query, pageIndex: page - 1 });
        else {
            setSearchParams({ pageSize: pageSize, pageIndex: page - 1 });
        }
    }

    const columns = [
        {
            title: 'Cover',
            dataIndex: 'imagePath',//指定这一列的对象
            key: 'cover',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <Upload
                        accept="image/*"
                        beforeUpload={file => {
                            // Convert image file to Base64 string
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = () => {
                                setNewImage(reader.result); // This is the Base64 string
                            };
                            return false; // Prevent default upload behavior
                        }}
                    >
                        <Button>Upload</Button>
                    </Upload>
                ) : (
                    <img src={record.imagePath} alt='cover' className="w-20 h-20" />
                );
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            editable: true,
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <Form.Item
                        name="name"
                        initialValue={record.name}
                        rules={[{ required: true, message: 'Please input book name!' }]}
                    >
                        <Input />
                    </Form.Item>
                ) : (
                    record.name
                );
            },
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <Form.Item
                        name="author"
                        initialValue={record.author}
                        rules={[{ required: true, message: 'Please input author!' }]}
                    >
                        <Input />
                    </Form.Item>
                ) : (
                    record.author
                );
            },
        },
        {
            title: 'Tag',
            dataIndex: 'tag',
            key: 'tag',
            render: (tag) => {
                return (
                    <Tag color='geekblue' key={tag}>
                        {tag}
                    </Tag>
                );
            },
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => '￥' + convertLongToPriceString(price) + "元"
        },
        {
            title: 'ISBN',
            dataIndex: 'isbn',
            key: 'isbn',
            editable: true,
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <Form.Item
                        name="isbn"
                        initialValue={record.isbn}
                        rules={[{ required: true, message: 'Please input ISBN!' }]}
                    >
                        <Input />
                    </Form.Item>
                ) : (
                    record.isbn
                );
            },
        },
        {
            title: 'Inventory',
            dataIndex: 'status',
            key: 'status',
            editable: true,
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <Form.Item
                        name="status"
                        initialValue={record.status}
                        rules={[{ required: true, message: 'Please input inventory!' }]}
                    >
                        <InputNumber />
                    </Form.Item>
                ) : (
                    record.status
                );
            },
        },
        {
            title: 'Delete',
            key: 'delete',
            render: (_, item) => <button className='btn-cart-delete max-h-10 flex items-center justify-center' onClick={(e) => {
                e.preventDefault();
                handleDeleteItem(item.bid);
            }}>Delete</button>,
        },
        {
            title: 'Change',
            key: 'change',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Button type="primary" onClick={() => handleSave(record.bid)} style={{ marginRight: 8, backgroundColor: 'white', color: 'black' }}>
                            Save
                        </Button>
                        <Button onClick={handleCancel}>Cancel</Button>
                    </span>
                ) : (
                    <Button disabled={editingKey !== -1} onClick={() => edit(record)}>
                        Edit
                    </Button>
                );
            },
        },
    ]

    const mergedColumns = columns.map(col => ({
        ...col,
        onCell: (record) => ({
            record,
            inputType: col.dataIndex === 'inventory' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
        }),
    }));

    const form = Form.useForm()[0];

    return (
        <>
            <div className="order-top-picker">
                <Search placeholder="输入书本名" onSearch={handleSearch} enterButton size="large" className="mx-4" />
            </div>
            <Form form={form} component={false}>
                <Table columns={mergedColumns}
                    pagination={{
                        position: ["none", "none"],
                    }}
                    dataSource={books && books.map(b => ({
                        ...b,
                        key: b.bid
                    }))} className=" w-full px-10"
                />
            </Form>
            <Pagination current={pageIndex + 1} pageSize={pageSize}
                onChange={handlePageChange} total={totalPage * pageSize}
            />
        </>
    );
}