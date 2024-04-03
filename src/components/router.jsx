import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../view/login";
import HomePage from "../view/home";
import BookPage from "../view/book";
import CartPage from "../view/cart";
import { LoginButton } from "./loginComponents";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/book/:bid" element={<BookPage />} />
                <Route path="/cart" element={<CartPage />} /> 
                <Route path="/*" element={<HomePage/>} />
                <Route exact strict path="/" component={LoginButton} />
            </Routes>
        </BrowserRouter>
    );
}