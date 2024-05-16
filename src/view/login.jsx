import '../css/tailwind.css'
import '../css/App.css'
import { Header, LoginCard, LoginInput, LoginButton, LoginCheckbox, Footer } from '../components/loginComponents';
import { useState } from 'react';
import { message as antdMessage } from 'antd';
import { checkLogin } from '../service/auth';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const checkInput = () => {
        if (email !== "" && password === "") {
            antdMessage.error("请先输入密码");
            return false;
        } else if (email === "" && password !== "") {
            antdMessage.error("请先输入邮箱");
            return false;
        } else if (email === "" && password === "") {
            antdMessage.error("请先输入邮箱和密码");
            return false;
        } else {
            return true;
        }
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (checkInput()) {
            let res = await checkLogin(email, password);
            if (!res.valid) {
                antdMessage.error(res.message);
            }
            else {
                antdMessage.success(res.message);
                window.location.href = '/home';
            }
        }
    }

    return (
        <div id='loginHtml'>
            <div className="body-bg content pt-12 pb-12" id="loginBody">
                <Header />
                <LoginCard onSubmit={handleSubmit}>
                    <LoginInput _name={'email'} onChange={handleEmailChange} />
                    <LoginInput _name={'password'} onChange={handlePasswordChange} />
                    <LoginCheckbox />
                    <LoginButton /> {/* 传递函数引用，而不是执行函数checkLogin() */}
                </LoginCard>
                <Footer />
            </div>
        </div>
    );
};