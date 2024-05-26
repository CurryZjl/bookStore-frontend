import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <div id="error-page" style={{zIndex: 1}}>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>404 Not Found</i>
            </p>
            <Link to={'/'}>
                <p>Back to Login Page</p>
            </Link>
        </div>
    );
}