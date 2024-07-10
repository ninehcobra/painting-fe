"use client";
import { useRouter } from "next/navigation";
import "./login.scss";
import LoginForm from "./components/LoginForm";
export default function Login() {
  const router = useRouter();

  return (
    <div className="login-container vh-100 vw-100 d-flex">
      <div className="content-left content ">
        <div className="h-50">
          <div className="quote-icon-wrapper  d-flex justify-content-center align-items-center mt-3 ms-3">
            <i className="fa-solid fa-quote-left"></i>
          </div>
        </div>
        <div className="quote-content h-50  d-flex flex-column  justify-content-end p-3">
          <div>Van nhat</div>
          <div>vai</div>
        </div>
      </div>
      <div className="content-right content d-flex flex-column align-items-center pt-5 mt-5">
        <h1 className="mt-5">Welcome back!</h1>
        <div className="mt-3 ps-5 pe-5 w-100">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
