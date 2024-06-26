import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import "../../css/admin.scss";

export const MyBreadCrumb = ({ activeIndex }) => {
  //console.log(activeIndex);
  const crumbInfo = [
    {
      to: "/admin/users",
      text: "用户管理",
    },
    {
      to: "/admin/books",
      text: "书籍管理", 
    },
    {
      to: "/admin/orders",
      text: "订单管理",
    },
    {
      to: "/admin/stat",
      text: "用户消费统计",
    },
  ];

  const linkItems = crumbInfo.map((item, index) => {
    return {
      title: (
        <Link to={item.to}>
          <span className="main-bread-literal">{item.text}</span>
        </Link>
      ),
      //className: `${activeIndex === index + 1  ? "is-active" : "" }`,
    };
  });

  return <Breadcrumb className="main-breadcrumb" items={linkItems} />;
};
