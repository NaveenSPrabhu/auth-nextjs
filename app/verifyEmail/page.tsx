"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Login from "../login/page";

export default function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  const verifyEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (err: any) {
      setError(err.message);
      console.log(err);
    }
  };

  useEffect(() => {
    const urlToken =window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token]);

 return (
  <div className="flex flex-col items-center justify-center h-screen" >
    <h1 className="text-3xl font-bold mb-4">Email Verification</h1>

    <h2>{token ? token : "No token found"}</h2>

    {verified && <p>Email verified successfully</p>}

    {error && <p>{error}</p>}

    {verified && (
      <Link href="/login">
        Go to Login
      </Link>
    )}
  </div>
);
}