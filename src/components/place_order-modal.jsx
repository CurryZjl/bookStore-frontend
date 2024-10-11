import { Form, Modal, Input, Button } from "antd";
import { message as antdMessage, notification} from "antd";
import { postOrder } from "../service/order";
import { convertPriceStringToLong } from "../utils/price";

import "../css/order.scss";

export default function PlaceOrderModal({
    sBooks,
    onSubmit,
    onCancel,
    price }) {
    const [form] = Form.useForm();
    price = convertPriceStringToLong(price);
    const onFinish = async ({ address, receiver, phone }) => {
        if (!address || !receiver || !phone) {
            antdMessage.error("请填写完整信息");
            return;
        }
        let orderItems = sBooks.map(b => ({
            amount: b.amount,
            book:{
                bid: b.bookDto.bid
            }
        }));
        let orderInfor = {
            receiver,
            phone,
            address,
            orderItems,
            price
        }
        let res = await postOrder(orderInfor);
        if(res.valid){
            notification.success({
                message: res.message,
                placement: "top"
            });
            onSubmit(); //NOTE:: 这里只是确认订单发出后删除前端的购物车对象
        }else{
            notification.error({
                message: res.message,
                placement: "top"
            });
        }
    }

    return (
        <Modal
            title={"填写订单"}
            open
            width={800}
            
            onCancel={onCancel}
            className="order-modal"
            footer={
                null
            }
        >
            <Form className="order-modal-form"
                layout="vertical"
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    name="receiver"
                    label="收货人"
                    required
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="联系电话"
                    required
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="收货地址"
                    required
                >
                    <Input rows={2} maxLength={200} />
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