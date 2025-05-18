import { useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import axios from "../../api/axios";

const mdParser = new MarkdownIt();
const user = JSON.parse(localStorage.getItem("user"));
console.log(user);
const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [markdown, setMarkdown] = useState("");
    const [tags, setTags] = useState("");
    const [coverImage, setCoverImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleEditorChange = ({ text }) => {
        setMarkdown(text);
    };

    const handleImageUpload = (e) => {
        setCoverImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("id", user.id);
            formData.append("title", title);
            formData.append("content", markdown);
            formData.append("tags", tags);
            formData.append("cover_image", coverImage);

            const res = await axios.post("/post/create-post", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Post created!");
            setTitle("");
            setMarkdown("");
            setTags("");
            setCoverImage(null);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto p-6 space-y-6 bg-white shadow rounded-md">
            <h2 className="text-3xl font-bold">Create New Post</h2>

            <div className="mt-4">
                <MdEditor
                    value={markdown}
                    style={{ height: "400px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                />
            </div>
            <input
                type="text"
                placeholder="Post Title"
                className="w-full p-3 border rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full border p-2"
            />

            <input
                type="text"
                placeholder="Tags (comma-separated, e.g. react,markdown)"
                className="w-full p-3 border rounded"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />
            <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={loading}
            >
                {loading ? "Publishing..." : "Publish"}
            </button>
        </div>
    );
};

export default CreatePost;
