"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function Login() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
       
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
    try{
            setLoading(true);
            const response=await axios.post("/api/users/login", user);
            toast.success("Login successful!");
            router.push("/profile");
        } catch (error) {
            console.error("Error logging in:", error);
        } finally {
            setLoading(false);
        }

    }
    useEffect(() => {
            if (user.email.length > 0 && user.password.length > 0 ) {
                setButtonDisabled(false);
            } else {
                setButtonDisabled(true);
            }
        }, [user]);


return (
   <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1>{loading ? "Logging in..." : "Login"}</h1>
    <hr />
    <label htmlFor="password">password</label>
    <input className="p-2 border border-gray-300  rounded-md mb-4 focus:outline-none  focus:ring-white-600 focus:border-transparent"
        type="password"
        id="password"
        value={user.password} 
        onChange={(e) => setUser({...user, password: e.target.value})}
        placeholder="password" />
    <label htmlFor="email">email</label>
    <input className="p-2 border border-gray-300  rounded-md mb-4 focus:outline-none  focus:ring-white-600 focus:border-transparent"
        type="text"
        id="email"
        value={user.email} 
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder="email" />
        <button 
  onClick={onLogin}
  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
>
  Login here
</button>
        <Link href="/signup" className="text-blue-500 hover:text-blue-700 mt-4">
            Don't have an account? Signup here
        </Link>
   </div>
)
}
