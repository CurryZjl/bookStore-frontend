import { Form, Modal, Input, Button } from "antd";
import useMessage from "antd/es/message/useMessage";
import { postOrder } from "../service/order";
import { handleBaseApiResponse } from "../utils/message";
import "../css/order.scss";

export default function PlaceOrderModal({
    sBooks,
    onSubmit,
    onCancel }) {
    const [form] = Form.useForm();
    const [messageApi,contextHolder] = useMessage();

    const onFinish = async ({ address, receiver, phone }) => {
        if (!address || !receiver || !phone) {
            messageApi.error("请填写完整信息");
            return;
        }
        let orderInfor = {
            address,
            receiver,
            phone,
            itemIds: sBooks.map(b => b.id)
        }
        let res = await postOrder(orderInfor);
        handleBaseApiResponse(res,messageApi,onSubmit);
    }

    return (
        <Modal
            title={"填写订单"}
            open
            width={800}
            onOk={onSubmit}
            onCancel={onCancel}
            className="order-modal"
            footer={
                null
            }
        >
            {contextHolder}
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