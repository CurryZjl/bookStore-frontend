import '../css/tailwind.css'
import '../css/App.css'
import { Header, LoginCard, LoginInput, LoginButton, LoginCheckbox, Footer } from '../components/loginComponents';
import { useEffect, useState } from 'react';
import { getUserEmail, getUserPassword } from '../service/profile';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailU, setEmailU] = useState("");
    const [passwordU, setPasswordU] = useState("");

    const getEP = async () => {
        let pEmail = await getUserEmail();
        setEmailU(pEmail);
        let pPassword = await getUserPassword();
        setPasswordU(pPassword);
    }

    useEffect(() => {
        getEP();
    }, [])

    const checkLogin = () => {
        if (email === emailU && password === passwordU) {
            window.location.href = '/home';
        } else if (email !== emailU && password !== "") {
            alert("邮箱输入错误!");
        } else if (password !== passwordU && email !== "") {
            alert("密码输入错误!");
        } else if (email !== "" && password === "") {
            alert("请先输入密码");
        } else if (email === "" && password !== "") {
            alert("请先输入邮箱");
        } else if (email === "" && password === "") {
            alert("请先输入邮箱和密码");
        }
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        checkLogin();
    }

    return (
        <div id='loginHtml'>
            {emailU && passwordU &&
                <div className="body-bg content pt-12 pb-12" id="loginBody">
                    <Header />
                    {console.log(emailU, " ",passwordU)
                    }
                    <LoginCard onSubmit={handleSubmit}>
                        <LoginInput _name={'email'} onChange={handleEmailChange} />
                        <LoginInput _name={'password'} onChange={handlePasswordChange} />
                        <LoginCheckbox />
                        <LoginButton /> {/* 传递函数引用，而不是执行函数checkLogin() */}
                    </LoginCard>
                    <Footer />
                </div>
            }
        </div>
    );
};