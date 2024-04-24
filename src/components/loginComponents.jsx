import { Link } from "react-router-dom";

export function Header() {
    return (
        <header className=" max-w-lg mx-auto">
            <h1 className="text-3xl font-bold text-white text-center">
                BookStore Login
            </h1>
        </header>
    );
}

export function Footer() {
    return (
        <footer className="max-w-lg mx-auto text-center mt-12 mb-6">
            <Link to="/" className="text-sm text-white font-bold hover:underline">
                New user? Sign up here
            </Link>
        </footer>
    )
}

export function LoginInput({ _name , onChange}) {
    return (
        <div className="mb-6 pt-2 rounded-md bg-gray-400">
            <label
                className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                htmlFor={_name}
            >
                {_name === 'email' ? "Email" : "Password"}
            </label>
            <input
                type="text"
                id={_name}
                placeholder={_name === 'email' ? "Email address" : "Password"}
                className="bg-gray-200 rounded w-full text-gray-700  border-b-4  outline-none px-3 pb-1 pt-2"
                maxLength={40}
                onChange={onChange}
            />
        </div>
    );
}

export function LoginCheckbox() {
    return (
        <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
                <input type="checkbox" id="rememberMe" className="mr-2" />
                <label htmlFor="rememberMe" className="text-gray-700 text-sm">
                    Remember me
                </label>
            </div>
            <Link href="/" className="text-sm text-blue-500 hover:underline">
                Forget password
            </Link>
        </div>
    );
}

export function LoginButton() { //单写一个onClick意思是直接执行这个函数，而用{}包裹就是传入一个函数
    return (
        <button
            id="btnLog"
            className="bg-blue-500 text-white font-bold py-2 rounded-lg shadow-lg hover:bg-blue-800 w-full"
        >
            Login
        </button>
    );
}
export function LoginCard({ children, onSubmit }) {
    return (
        <main className="bg-white max-w-2xl mx-auto p-12 my-10 mt-14 shadow-3xl rounded-2xl">
            <section>
                <h2 className="font-bold text-2xl">Welcome to my BookStore</h2>
            </section>
            <section className="mt-10">
                <form className="flex flex-col" onSubmit={onSubmit}>
                    {children}
                </form>
            </section>
        </main>
    );
}
