import { Routes, Route } from "react-router-dom";
import Home from "../components/home/Home";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import CreatePost from "../components/posts/CreatePost";
import EditPost from "../components/posts/EditPost";
import PostDetail from "../components/posts/PostDetail";
import NotFound from "../components/NotFound";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/post/:slug" element={<PostDetail />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoutes;
