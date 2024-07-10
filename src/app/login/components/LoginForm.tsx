"use client";
import React, { useState } from "react";
import "./login-form.scss";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Xử lý logic đăng nhập ở đây
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <form
      className="w-100 d-flex flex-column align-items-center justify-content-center"
      onSubmit={handleSubmit}
    >
      <input
        className="w-100 auth-input mb-2"
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
        className="w-100 mb-2  auth-input"
        placeholder="Password"
      />
      <button className="w-100 mb-2 auth-btn" type="submit">
        Login
      </button>
    </form>
  );
}
