"use client";
import React, { useEffect, useReducer, useState } from "react";
import "./login-form.scss";
import { useLoginMutation } from "@/redux/services/auth.service";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    router.push("/dashboard");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { data, isError, isSuccess }] = useLoginMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) {
      login({ email, password });
    } else {
      toast("Please fill in all fields");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Logged in successfully");
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("fullname", data.fullname);
      localStorage.setItem("role", data.role);
      router.push("/dashboard");
    }
    if (isError) {
      toast.error("Error logging in");
    }
  }, [data, isError, isSuccess]);

  return (
    <form
      className="w-100 d-flex flex-column align-items-center justify-content-center"
      onSubmit={handleSubmit}
    >
      <input
        className="w-100 auth-input mb-3"
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Email"
      />

      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-100 mb-4  auth-input"
        placeholder="Password"
      />
      <button className="w-100 mb-2 auth-btn" type="submit">
        Login
      </button>
      <div className="w-100 d-flex mt-4">
        <div className="break-line " />
        <div className=" text-bl d-flex align-items-center justify-content-center">
          <span className="text-center">or</span>
        </div>
        <div className="break-line " />
      </div>

      {/* fake  */}
      <div className="mt-4 mb-4" style={{ fontWeight: "500" }}>
        Do not have account?<span className="ms-2 nav-btn">Sign up</span>
      </div>

      <div className="w-100">
        <div className="third-party-btn w-100 d-flex align-items-center justify-content-center mb-2">
          <div
            style={{ width: "35%" }}
            className="d-flex align-items-center justify-content-end"
          >
            <img className="me-2" src="/images/google.png" alt="Google" />
          </div>
          <div style={{ width: "65%" }}>Continue with Google</div>
        </div>

        <div className="third-party-btn w-100 d-flex align-items-center justify-content-center mb-2">
          <div
            style={{ width: "35%" }}
            className="d-flex align-items-center justify-content-end"
          >
            <img className="me-2" src="/images/apple.png" alt="apple" />
          </div>
          <div style={{ width: "65%" }}>Continue with Apple</div>
        </div>

        <div className="third-party-btn w-100 d-flex align-items-center justify-content-center mb-2">
          <div
            style={{ width: "35%" }}
            className="d-flex align-items-center justify-content-end"
          >
            <img className="me-2" src="/images/twitter.png" alt="Twitter" />
          </div>
          <div style={{ width: "65%" }}>Continue with Twitter</div>
        </div>
      </div>
    </form>
  );
}
