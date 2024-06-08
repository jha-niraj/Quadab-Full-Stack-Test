import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

import InputBox from "../components/InputBox";
import Button from "../components/Button";

const userAuthentication = ({ type }) => {
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const response = await axios.post("http://localhost:5001/user/register", {
                fullname,
                username,
                password
            })
            toast.success("Sign Up Successful");
            navigate("/signin");
        } catch(err) {
            toast.error("Error Occured!!!")
        } 
    }
    const handleSignin = async () => {
        try {
            const response = await axios.post("http://localhost:5001/user/login", {
                username,
                password
            })
            toast.success("Login Successful")
            localStorage.setItem("token", response.data.token);
            setTimeout(() => {
                navigate("/");
            }, 2000)
        } catch(err) {
            toast.error("Error Occured!!!")
        }
    }

    return (
        <section className="flex items-center justify-center mt-10" style={{ height: "90vh" }}>
            <Toaster />
            <form className="shadow-2xl rounded-2xl p-8 m-12">
                <div className="">
                    {
                        type == "signup" ?
                            <div className="flex flex-col items-center justify-center">
                                <div className="p-8">
                                    <h1 className="text-4xl font-semibold font-serif capitalize text-center">
                                        {
                                            type == "signup" ? "Sign Up" : "Sign In"
                                        }
                                    </h1>
                                    <p className="text-xl font-serif text-center font-medium">Enter your information to create an account</p>
                                </div>
                                <div className="w-full">
                                    <h1 className="text-md pl-3 font-semibold">Full Name</h1>
                                    <InputBox
                                        name="fullname"
                                        type="text"
                                        id="fullname"
                                        onChange={e => {
                                            setFullname(e.target.value);
                                        }}
                                        placeholder="Niraj Jha"
                                        label="Full Name"
                                    />
                                </div>
                            </div>
                            :
                            <div className="p-8">
                                <h1 className="text-4xl font-semibold font-serif capitalize text-center">
                                    {
                                        type == "signup" ? "Sign Up" : "Sign In"
                                    }
                                </h1>
                                <p className="text-xl font-serif text-center font-medium">Enter your credentials to access your account</p>
                            </div>
                    }
                    <h1 className="text-md pl-3 font-semibold">Username</h1>
                    <InputBox
                        name="username"
                        type="username"
                        id="username"
                        onChange={e => {
                            setUsername(e.target.value);
                        }}
                        value={username}
                        placeholder="nirajjha"
                        label="Username"
                    />
                    <h1 className="text-md pl-3 font-semibold">Password</h1>
                    <InputBox
                        name="password"
                        type="password"
                        id="password"
                        onChange={e => {
                            setPassword(e.target.value);
                        }}
                        value={password}
                        placeholder="12345678"
                        label="Password"
                    />
                </div>
                <div className="flex flex-col items-center justify-center">
                    {
                        type == "signup" ?
                            <Button onClick={handleSignup} label="signup" />
                            :
                            <Button onClick={handleSignin} label="signin" />
                    }
                    {
                        type == "signup" ?
                            <p>Already have an account,
                                <Link to="/signin" className="underline font-semibold"> Login here</Link>
                            </p>
                            :
                            <p>Don't have an account?
                                <Link to="/signup" className="underline font-semibold"> Create here</Link>
                            </p>
                    }
                </div>
            </form>
        </section>
    )
}

export default userAuthentication;