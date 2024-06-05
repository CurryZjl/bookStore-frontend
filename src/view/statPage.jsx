import BasicLayout from "../components/layout";
import CusStatTable from "../components/cus_stat_table";
import CusStatTimePicker from "../components/cus_stat_time_picker";
import { convertLongToPriceString } from "../utils/price";
import { useState, useEffect } from "react";
import { Card, Row, Col } from "antd";
import { getStatItem } from "../service/stat";
import "../css/order.scss";


export default function StatPage() {
    const [statItem, setStatItem] = useState(null);

    const seachStatItem = async () => {
        let item = await getStatItem();
        setStatItem(item);
    }

    useEffect(() => {
        seachStatItem();
    }, [])


    return (
        <BasicLayout>
            <h1 className="mt-5 text-lg"><b>订单统计</b></h1>
            <Row gutter={36}>
                <Col span={8}>
                    <Card title="购书总本数" bordered={false}>
                      <div>{ statItem !== null ? statItem.bookNums : "0"}</div>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="购书总金额" bordered={false}>
                       <div> { statItem !== null ? convertLongToPriceString(statItem.allPrice) + "￥" : "0"}</div>
                    </Card>
                </Col>
                <Col span={8}>
                    <CusStatTimePicker setStatItem={setStatItem}/>
                </Col>
            </Row>
            <CusStatTable statItems={statItem === null ? null :  statItem.books} />
        </BasicLayout>
    )
}