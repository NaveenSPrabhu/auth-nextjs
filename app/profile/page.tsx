"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useState } from "react"
import Link from "next/link"

export default function UserProfile() {

    const router = useRouter()

    const [data, setData] = useState("nothing")

    const logout = async () => {
        try {

            await axios.get("/api/users/logout")

            toast.success("Logout successful")

            router.push("/login")

        } catch (error:any) {

            console.log(error.message)

        }
    }

    const getUserData = async () => {
        try {

            const res = await axios.get("/api/users/me")

            console.log(res.data)

            setData(res.data.user._id)

        } catch (error:any) {

            console.log(error.message)

        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">

            <h1 className="text-3xl">Profile Page</h1>

            <h2 className="p-2 bg-green-500 text-white">
                {data !== "nothing" 
                    ? <Link href={`/profile/${data}`}>{data}</Link> 
                    : "No User Data"}
            </h2>

           

            <button
                onClick={logout}
                className="p-2 mt-5 bg-red-500 text-white rounded"
            >
                Logout
            </button>
             <button
                onClick={getUserData}
                className="p-2 mt-5 bg-blue-500 text-white rounded"
            >
                Get User Data
            </button>

        </div>
    )
}