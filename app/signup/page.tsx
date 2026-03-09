"use client";
import Link from "next/link";
import React, { use } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { useEffect } from "react";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const onSignup = async () => {
        try{
            setLoading(true);
            const response=await axios.post("/api/users/signup", user);
            router.push("/login");

        } catch (error) {
            console.error("Error signing up:", error);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    
return (
   <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1>{loading?"Loading...":"Signup"}</h1>
    <hr />
    <label htmlFor="username">username</label>
    <input className="p-2 border border-white-300  rounded-md mb-4 focus:outline-none  focus:ring-white-600 focus:border-transparent"
        type="text"
        id="username"
        value={user.username} 
        onChange={(e) => setUser({...user, username: e.target.value})}
        placeholder="username" />
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
        onClick={onSignup}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
           {buttonDisabled ? "No Sign" : "Signup"}
        </button>
        <Link href="/login" className="text-blue-500 hover:text-blue-700 mt-4">
            Already have an account? Login here
        </Link>
   </div>
)
}
