import { LoginCard, LoginButton, LoginInput } from "../components/loginComponents";
import { message as antdMessage } from "antd";
import { useState } from "react";
import { checkName, postNewUser } from "../service/auth";
import "../css/signUp.scss"
import "../css/tailwind.css"


export default function SignUpPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const checkInput = async() => {
        let resName = await checkName(name);
        let passwordCheck = (password === password2);
        let emailCheck = checkEmail(email);
        if(!resName.valid){
            antdMessage.error(resName.message);
        } else if(!passwordCheck){
            antdMessage.error("两次输入的密码不一致");
        } else if(!emailCheck){
            antdMessage.error("邮箱格式错误");
        }
        else{
            return true;
        }
        return false;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(await checkInput()){
            let res = await postNewUser(name, password, email);
            if(res.valid){
                antdMessage.success(res.message);
                antdMessage.info("请登录");
                setTimeout(()=>{
                    window.location.href = '/';
                }, 1000);
               
            }
            else{
                antdMessage.error(res.message);
            }
        }
    }

    const checkEmail = () => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    
    const handlePassword2Change = (e) => {
        setPassword2(e.target.value);
    }
    

    return (
        <div className="body-bg" id="signupBody">
            <LoginCard onSubmit={handleSubmit} id="singup-card">
                <LoginInput _name={'New name'} onChange={handleNameChange} />
                <LoginInput _name={'Input email'} onChange={handleEmailChange} />
                <LoginInput _name={'Input password'} onChange={handlePasswordChange} _type="password"/>
                <LoginInput _name={'Input password again'} onChange={handlePassword2Change} _type="password" />
                <LoginButton name="Sign Up" />
            </LoginCard>
        </div>
    );
}