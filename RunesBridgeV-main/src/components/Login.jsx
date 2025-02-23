import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { message } from "antd";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const correctUser = import.meta.env.VITE_USERNAME;
    const correctPass = import.meta.env.VITE_PASSWORD;

    function handleLogin() {
        if (username === correctUser && password === correctPass) {
            navigate("/blogs");
            message.success("Login Successful!");
        } else {
            message.error("Incorrect details entered!");
        }
    }

    return (
        <div>
            <div className="min-h-96 flex justify-center items-center bg-gray-100">
                <div className="flex flex-col justify-center items-center space-y-6 bg-white shadow-lg p-8 rounded-lg w-[600px] h-[350px] mt-28 mb-36 ">
                    <h1 className="font-bold text-4xl mb-4 text-gray-800">Admin Login</h1>

                    <input
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-80 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-80 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                    />

                    <button
                        className={`w-80 bg-black text-white px-4 py-2 rounded-lg hover:cursor-pointer transition disabled:opacity-50`}
                        disabled={username === "" || password === ""}
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </div>
            </div>


            <Footer />
        </div>
    );
}

export default Login;
