import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setResult("");

        // Basic validation
        if (!email || !password) {
            setResult("Email and password are required.");
            setLoading(false);
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setResult("Invalid email format.");
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:3000/api/v1/auth/login",
                {
                    email,
                    password,
                }
            );
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            if (res.data.success) {
                setResult("Login Successful");
                navigate("/");
            } else {
                setResult("Invalid Credentials");
            }
        } catch (err) {
            console.log(err);
            setResult("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
                Login to Your Account
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        name="email"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded font-semibold transition ${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
                {result && (
                    <div
                        className={`text-center ${
                            result === "Login Successful"
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >
                        {result}
                    </div>
                )}
            </form>
        </div>
    );
}

export default Login;
