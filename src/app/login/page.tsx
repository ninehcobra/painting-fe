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
        <div className="h-50 quote-content  d-flex flex-column just p-3 justify-content-between pt-5">
          <div
            onClick={() => router.push("https://github.com/Kindaka")}
            className="link-btn d-flex align-items-center justify-content-center mt-5"
          >
            github.com/Kindaka
            <span className="ms-1">
              <i className="fa-solid fa-link"></i>
            </span>
          </div>
          <div className="quote-text ">
            &quot;Painting app is not just a tool for creating stunning paint
            colors; it&apos;s a comprehensive solution that empowers users to
            visualize, experiment, and manage every aspect of their paint
            projects with ease. From inception to execution, it seamlessly
            integrates creative ideas into tangible realities, simplifying the
            process with intuitive controls and unparalleled convenience. &quot;
          </div>

          <div className="owner-text mb-3">
            Nguyễn Văn Nhật - FullStack Web Developer
            <div className="break-line w-100 mt-3 rainbow-line" />
          </div>
        </div>
      </div>
      <div className="content-right content d-flex flex-column align-items-center pt-5 mt-5">
        <div className="mt-3 ps-5 pe-5 w-100 h-100 d-flex align-items-center justify-content-center flex-column">
          <h1 className="mb-5">Welcome back!</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
