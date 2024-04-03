import '../css/tailwind.css'
import '../css/App.css'
import { Header, LoginCard, LoginInput, LoginButton, LoginCheckbox, Footer } from '../components/loginComponents';
import { Link } from 'react-router-dom';

export default function LoginPage() {
    return (
        <div id='loginHtml'>
            <div className="body-bg content pt-12 pb-12" id="loginBody">
                <Header />
                <LoginCard>
                    <LoginInput _name={'email'} />
                    <LoginInput _name={'password'} />
                    <LoginCheckbox />
                    <Link to={{pathname: '/'}} className='flex w-full'>
                        <LoginButton />
                    </Link>
                </LoginCard>
                <Footer />
            </div>
        </div>
    );
};