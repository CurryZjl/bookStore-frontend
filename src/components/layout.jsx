import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getRole } from "../service/profile";

export default function BasicLayout({ children }) {
    const [role, setRole] = useState("");

    const getCurRole = async () => {
        let res = await getRole();
        setRole(res);
    }

    useEffect(() => {
        getCurRole();
    }, [])

    return (
        <div className="font-sans flex flex-row">
            <div id="sidebar" className="min-h-screen flex flex-col w-32">
                <h1 className="text-lg font-bold mb-4 text-center mt-5 text-blue-200 shadow-2xl">
                    Book Store
                </h1>
                <ul className="text-center mt-20 text-xl font-bold">
                    {/*列表*/}
                    <li className="mb-10">
                        <Link to='/home' className="text-white hover:underline">
                            首页
                        </Link>
                    </li>
                    <li className="mb-10">
                        <Link to='/cart' className="text-white hover:underline">
                            购物车
                        </Link>
                    </li>
                    <li className="mb-10">
                        <Link to='/order' className="text-white hover:underline">
                            订单
                        </Link>
                    </li>
                    <li className="mb-10">
                        <Link to='/author' className="text-white hover:underline">
                            搜索
                        </Link>
                    </li>
                    {
                        role === "ADMIN" &&
                        <li className="mb-10">
                            <Link to='/rank' className="text-white hover:underline">
                                排行
                            </Link>
                        </li>
                    }
                    <li className="mb-10">
                        <Link to='/profile' className="text-white hover:underline">
                            我的
                        </Link>
                    </li>
                    {
                        role === "NORMAL" &&
                        <li className="mb-10">
                            <Link to='/stat' className="text-white hover:underline">
                                统计
                            </Link>
                        </li>
                    }
                    {
                        role === "ADMIN" &&
                        <li className="mb-10">
                            <Link to='/admin/users' className="text-white hover:underline">
                                管理
                            </Link>
                        </li>
                    }
                </ul>
            </div>
            <div id="content" className="relative flex flex-col w-full min-h-screen bg-gray-100 overflow-auto">
                <div>
                    <div className="flex  flex-col items-center gap-2">
                        {children}
                        <div className="flex flex-col text-center mb-10">
                            <a href="https://github.com/CurryZjl" className="text-blue-500 hover:underline">关于作者</a>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}