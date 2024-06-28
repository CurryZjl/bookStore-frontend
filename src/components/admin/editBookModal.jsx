import { Form, Modal, Input, Button, InputNumber, Upload } from "antd";
import { useState } from "react";
import { message as antdMessage } from "antd";
import { updateBook } from "../../service/book";
import "../../css/order.scss";

export default function EditBookModal({
    onCancel,
 }) {
    const [form] = Form.useForm();
    const [newImage, setNewImage] = useState(null);

    const onFinish = async ({ name, tag, author, isbn,intro,price,status }) => {
        if (!name || !tag || !author || !isbn || !intro || !price || !status || !newImage) {
            antdMessage.warning("请填写完整信息");
            return;
        }
        let bookDto = {
            name,
            tag,
            author,
            isbn,
            intro,
            price,
            status,
            imagePath: newImage
        }
        console.log("send:", bookDto);
        let res = await updateBook(bookDto);
        if(res.valid){
            antdMessage.success(res.message);
            onCancel();
        }else{
            antdMessage.error(res.message);
        }
    }

    return (
        <Modal
            title={"添加新图书"}
            open
            width={800}
            
            onCancel={onCancel}
            className="order-modal"
            footer={
                null
            }
        >
            <Form className="order-modal-form"
                layout='horizontal'
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    name="name"
                    label="书名"
                    required
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="tag"
                    label="标签"
                    required
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="author"
                    label="作者"
                    required
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="isbn"
                    label="ISBN编号"
                    required
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="intro"
                    label="介绍"
                    required
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="售价（单位：分）"
                    required
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name="status"
                    label="库存"
                    required
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    label="上传图片"
                >
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
                        <Button>上传图片</Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="order-button-submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}