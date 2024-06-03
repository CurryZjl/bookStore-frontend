import { Table, Tag } from 'antd';
import { changeUserRole } from '../../service/admin';
import { message as antdMessage } from "antd";
import "../../css/cart.scss";
import { useState , useEffect } from 'react';

export default function UsersViewer({ users }) {
    const [usersState, setUsersState] = useState(users);

    useEffect(() => {
        // 在组件挂载或users发生变化时更新usersState
        setUsersState(users);
    }, [users]);

    const handleRoleChange = (uid, role) => {
        switch (role) {
            case "NORMAL":
                role = "BANNED";
                break;
            case "BANNED":
                role = "NORMAL";
                break;
            default:
                role = "NORMAL";
        }
        ChangeUserRole(uid, role);
    }

    const ChangeUserRole = async (uid, role) => {
        let res = await changeUserRole(uid, role);
        if (res.valid) {
            antdMessage.success(res.message);
            const updatedUsers = usersState.map(user => {
                if(user.uid === uid){
                    return {
                        ...user,
                        userRole: role
                    };
                }
                return user;
            });
            setUsersState(updatedUsers);
        } else {
            antdMessage.error(res.message);
        }
    }

    const columns = [
        {
            title: "用户ID",
            dataIndex: 'uid',
            key: 'uid',
            sorter: (a, b) => a.price - b.price,
            defaultSortOrder: 'ascend',
        },
        {
            title: '用户昵称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '用户邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '当前状态',
            dataIndex: 'userRole',
            key: 'userRole',
            render: (_, item) => {
                let Rcolor = 'geekblue';
                if(item.userRole === "BANNED")
                    Rcolor = 'red';
                return (
                    <Tag color={Rcolor} key={item.userRole}>
                        {item.userRole}
                    </Tag>
                );
            },
        },
        {
            title: '更改状态',
            key: 'action',
            render: (_, item) => <button className='btn-cart-delete max-h-10 flex items-center justify-center' onClick={(e) => {
                e.preventDefault();
                handleRoleChange(item.uid, item.userRole);
            }}>禁用/解禁</button>,
        }
    ]

    if(users)
    return (
        <Table className='w-full px-10'
            columns={columns}
            dataSource={usersState &&  usersState.map(user => ({
                ...user,
                key: user.uid
            }))}
        />
    );
    else{
        return(
            <Table className="w-full px-10"/>
        )
    }
}