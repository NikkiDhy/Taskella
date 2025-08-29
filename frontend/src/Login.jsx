import React, { useState } from "react";
import loginImg from "./assets/loginImg.png";
import { useNavigate, Link } from "react-router-dom";
import logo from "./assets/MomentumLogo.jpg";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      alert("Please fill in both fields");
      return;
    }

    setIsLoading(true);

    // Simulate login process - replace with your actual login logic
    try {
      // Your login API call would go here
      // const response = await loginAPI(formData);

      setTimeout(() => {
        setIsLoading(false);
        console.log("Login attempt:", formData);
        alert("Login successful!");
        // Handle successful login (e.g., redirect, update auth state, etc.)
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div
      className="flex min-h-screen overflow-hidden"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      {/* Login Section */}
      <div className="flex flex-col items-center justify-center w-2/5 px-10 py-16 bg-todoBlack">
        <div className="flex flex-col w-full max-w-sm gap-10">
          {/* Login Header */}
          <div className="text-center">
            <h1 className="mb-2 text-4xl font-todoFont text-beigeLight">
              Login
            </h1>
            <p className="text-sm text-beigeLight font-todoFont font-extralight">
              Welcome back! Please enter your details.
            </p>
          </div>

          {/* Login Form */}
          <div className="flex flex-col gap-6">
            {/* Username Field */}
            <div className="form-group">
              <input
                type="text"
                className="form-field"
                placeholder="Username"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                required
              />
              <label
                htmlFor="username"
                className="font-extralight form-label font-todoFont"
              >
                Username
              </label>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <input
                type="password"
                className="form-field"
                placeholder="Password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                required
              />
              <label
                htmlFor="password"
                className="font-extralight form-label font-todoFont"
              >
                Password
              </label>
            </div>

            {/* Login Actions */}
            <div className="flex flex-col gap-5 mt-8">
              <button
                onClick={handleSubmit}
                className="w-full px-6 py-4 transition-all duration-300 border cursor-pointer text-beigeDark font-todoFont login-btn rounded-4xl"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>

              <div className="text-sm font-light text-center text-beigeLight font-todoFont">
                Don't have an account?{" "}
                <Link
                  className="font-semibold cursor-pointer text-beigeLight hover:underline"
                  to="/signup"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex items-center justify-center w-3/5 overflow-hidden bg-welcomeBg">
        <img
          src={logo}
          alt="Logo"
          className="absolute top-0 w-auto h-20 right-4"
        />
        <img className="w-auto h-160" src={loginImg} />
      </div>

      {/* Styles */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");

        .form-group {
          position: relative;
          padding: 15px 0 0;
          margin-top: 10px;
          width: 100%;
        }

        .form-field {
          font-family: inherit;
          width: 100%;
          border: 0;
          border-bottom: 1px solid var(--color-beigeLight);
          outline: 0;
          font-size: 1.3rem;
          color: var(--color-beigeLight);
          padding: 7px 0;
          background: transparent;
          transition: border-color 0.2s;
        }

        .form-field::placeholder {
          color: transparent;
        }

        .form-field:placeholder-shown ~ .form-label {
          font-size: 16px;
          cursor: text;
          top: 30px;
        }

        .form-label {
          position: absolute;
          top: 0;
          display: block;
          transition: 0.2s;
          font-size: 10px;
          color:  var(--color-beigeLight);
          cursor: text;
        }

        .form-field:focus ~ .form-label,
        .form-field:not(:placeholder-shown) ~ .form-label {
          position: absolute;
          top: 0;
          display: block;
          transition: 0.2s;
          font-size: 1rem;
          color: var(--color-beigeLight);
          font-light
        }

        .form-field:focus {
          padding-bottom: 6px;
          font-weight: 700;
          border-width: 2px;
          border-image: var(--color-beigeLight);
          border-image-slice: 1;
        }

        .form-field:required,
        .form-field:invalid {
          box-shadow: none;
        }

        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          background-color: var(--color-beigeLight);
         color: var(--color-todoBlack);
         }

        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        @media (max-width: 1024px) {
          .w-3\\/4 {
            width: 70%;
          }
          .w-1\\/4 {
            width: 30%;
          }
        }

        @media (max-width: 768px) {
          .min-h-screen {
            flex-direction: column;
          }
          .w-3\\/4,
          .w-1\\/4 {
            width: 100%;
          }
          .w-3\\/4 {
            height: 60vh;
          }
          .w-1\\/4 {
            height: 40vh;
            padding: 30px 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default Login;
