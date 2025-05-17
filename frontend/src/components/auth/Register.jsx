import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        bio: "",
        profile_image: null,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [usernameStatus, setUsernameStatus] = useState(null);
    const [emailStatus, setEmailStatus] = useState(null);
    const usernameTimeout = useRef();
    const emailTimeout = useRef();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setError("");
        setSuccess("");

        if (name === "username") {
            setUsernameStatus("checking");
            clearTimeout(usernameTimeout.current);
            usernameTimeout.current = setTimeout(() => {
                checkUsername(value);
            }, 1000);
        }
        if (name === "email") {
            setEmailStatus("checking");
            clearTimeout(emailTimeout.current);
            emailTimeout.current = setTimeout(() => {
                checkEmail(value);
            }, 1000);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setForm({ ...form, profile_image: file });
    };

    const checkUsername = async (username) => {
        if (!username) {
            setUsernameStatus(null);
            return;
        }
        try {
            const res = await fetch(
                `http://localhost:3000/api/v1/auth/check-username/${username}`
            );
            const data = await res.json();
            setUsernameStatus(data.exists ? "exists" : "available");
        } catch {
            setUsernameStatus(null);
        }
    };

    const checkEmail = async (email) => {
        if (!email) {
            setEmailStatus(null);
            return;
        }
        try {
            const res = await fetch(
                `http://localhost:3000/api/v1/auth/check-email/${email}`
            );
            const data = await res.json();
            setEmailStatus(data.exists ? "exists" : "available");
        } catch {
            setEmailStatus(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        const formData = new FormData();
        formData.append("username", form.username);
        formData.append("email", form.email);
        formData.append("password", form.password);
        formData.append("bio", form.bio);
        if (form.profile_image) {
            formData.append("profile_image", form.profile_image);
        }
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
        try {
            const res = await fetch(
                "http://localhost:3000/api/v1/auth/register",
                {
                    method: "POST",
                    body: formData,
                }
            );
            if (!res.ok) {
                throw new Error("Registration failed");
            }
            setSuccess("Registration successful! You can now log in.");
            setForm({
                username: "",
                email: "",
                password: "",
                bio: "",
                profile_image: null,
            });
            setUsernameStatus(null);
            setEmailStatus(null);
            navigate("/login");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
                Create Your Account
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                        className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                            usernameStatus === "exists"
                                ? "border-red-500 focus:ring-red-300"
                                : usernameStatus === "available"
                                ? "border-green-500 focus:ring-green-300"
                                : "focus:ring-blue-400"
                        }`}
                        placeholder="Enter your username"
                    />
                    {usernameStatus === "checking" && (
                        <span className="text-xs text-gray-500">
                            Checking username...
                        </span>
                    )}
                    {usernameStatus === "exists" && (
                        <span className="text-xs text-red-600">
                            Username already exists
                        </span>
                    )}
                    {usernameStatus === "available" && (
                        <span className="text-xs text-green-600">
                            Username available
                        </span>
                    )}
                </div>
                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                            emailStatus === "exists"
                                ? "border-red-500 focus:ring-red-300"
                                : emailStatus === "available"
                                ? "border-green-500 focus:ring-green-300"
                                : "focus:ring-blue-400"
                        }`}
                        placeholder="Enter your email"
                    />
                    {emailStatus === "checking" && (
                        <span className="text-xs text-gray-500">
                            Checking email...
                        </span>
                    )}
                    {emailStatus === "exists" && (
                        <span className="text-xs text-red-600">
                            Email already exists
                        </span>
                    )}
                    {emailStatus === "available" && (
                        <span className="text-xs text-green-600">
                            Email available
                        </span>
                    )}
                </div>
                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your password"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        Bio
                    </label>
                    <textarea
                        name="bio"
                        value={form.bio}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Tell us about yourself"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium text-gray-700">
                        Profile Image
                    </label>
                    <input
                        type="file"
                        name="profile_image"
                        onChange={handleFileChange}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        accept="image/*"
                    />
                </div>
                <button
                    type="submit"
                    disabled={
                        loading ||
                        usernameStatus === "exists" ||
                        emailStatus === "exists" ||
                        usernameStatus === "checking" ||
                        emailStatus === "checking"
                    }
                    className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
                >
                    {loading ? "Registering..." : "Register"}
                </button>
                {error && (
                    <div className="text-red-600 text-center">{error}</div>
                )}
                {success && (
                    <div className="text-green-600 text-center">{success}</div>
                )}
            </form>
        </div>
    );
}

export default Register;
