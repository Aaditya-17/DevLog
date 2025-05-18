import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
            <Link to="/" className="text-xl font-bold text-blue-600">
                DevLogged!
            </Link>
            <div>
                <Link to="/" className="mx-2">
                    Home
                </Link>
                <Link to="/create" className="mx-2">
                    Create Post
                </Link>
                <Link to="/login" className="mx-2">
                    Login
                </Link>
                <Link to="/register" className="mx-2">
                    Register
                </Link>
            </div>
        </nav>
    );
}

export default NavBar;
