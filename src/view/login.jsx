import '../css/tailwind.css'
import '../css/App.css'
import { Header, LoginCard, LoginInput, LoginButton, LoginCheckbox, Footer } from '../components/loginComponents';
import { useState } from 'react';
import { message as antdMessage } from 'antd';
import { checkLogin } from '../service/auth';

export default function LoginPage() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const checkInput = () => {
        if (name !== "" && password === "") {
            antdMessage.error("请先输入密码");
            return false;
        } else if (name === "" && password !== "") {
            antdMessage.error("请先输入用户名");
            return false;
        } else if (name === "" && password === "") {
            antdMessage.error("请先输入用户名和密码");
            return false;
        } else {
            return true;
        }
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (checkInput()) {
            let res = await checkLogin(name, password);
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
                    <LoginInput _name={'name'} onChange={handleNameChange} />
                    <LoginInput _name={'password'} onChange={handlePasswordChange} _type='password'/>
                    <LoginCheckbox />
                    <LoginButton name="Login" />
                </LoginCard>
                <Footer />
            </div>
        </div>
    );
};