import { List, Avatar } from "antd";

export default function OrderItemList({orderItems}){
    return <List
        dataSource={orderItems}
        renderItem={(item,_) =>(
            <List.Item>
                <List.Item.Meta
                    avatar={<Avatar size={80} src = {item.book.imagePath} shape="square"/>}
                    title={item.book.name}
                    description={`数量：${item.amount}`}
                />
            </List.Item>
        )}
    />
}