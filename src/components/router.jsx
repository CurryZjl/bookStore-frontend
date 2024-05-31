import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../view/login";
import HomePage from "../view/home";
import BookPage from "../view/book";
import CartPage from "../view/cart";
import ProfilePage from "../view/profile";
import OrderPage from "../view/order";
import ErrorPage from "../view/errorPage";
import SignUpPage from "../view/signUpPage";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route index element={<LoginPage />} />
                <Route path="/book/:bid" element={<BookPage />} />
                <Route path="/cart" element={<CartPage />} /> 
                <Route path="/profile" element={<ProfilePage/>} />
                <Route path="/order" element={<OrderPage/>} />
                <Route path="/signUp" element={<SignUpPage/>}/>
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
}