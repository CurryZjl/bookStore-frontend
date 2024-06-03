import { useParams } from "react-router-dom";
import BasicLayout from "../components/layout";
import { MyBreadCrumb } from "../components/admin/bread_crumd";
import BooksViewer from "../components/admin/booksViewer";
import UsersViewer from "../components/admin/usersViewer";
import OrdersViewer from "../components/admin/ordersViewer";
import StatViewer from "../components/admin/statViewer";
import { useEffect, useState } from "react";
import { getUsers } from "../service/admin";
import "../css/admin.scss";

export default function AdminView() {
    const [users, setUsers] = useState([]);

    const searchUsers = async() =>{
        let res = await getUsers();
        setUsers(res);
    }

    useEffect(()=>{
        searchUsers();
    },[]);

    let adminTab  = useParams();
    let tab = adminTab.indexTab;
    let activeIdx = 0;
    let currentTab = null;

    switch (tab) {
        case "books":
            activeIdx = 2;
            currentTab = <BooksViewer />
            break;
        case "orders":
            activeIdx = 3;
            currentTab = <OrdersViewer />
            break;
        case "stat":
            activeIdx = 4;
            currentTab = <StatViewer />
            break;
        default:
            currentTab =  <UsersViewer users={users}/>
            activeIdx = 1;
    }

    return (
        <BasicLayout>
            <h1 className="mt-5 text-lg"><b>管理员页面</b></h1>
            <MyBreadCrumb activeIndex={activeIdx} />
            {currentTab }
        </BasicLayout>
    );
}