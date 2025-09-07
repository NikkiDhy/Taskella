import React, { useState } from "react";
import signupImg from "./assets/signupImg.png";
import { useNavigate, Link } from "react-router-dom";
import logo from "./assets/MomentumLogo.jpg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Register() {
  const [formData, setFormData] = useState({
    fullname: "",
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
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.fullname) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/v1/user/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          FullName: formData.fullname,
          Username: formData.username,
          Password: formData.password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/Todo");
      } else {
        alert(data.message || "Something went wrong");
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      alert(data.message);

      // navigate("/login", {
      //   state: { username: formData.username, password: formData.password },
      // });
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
      alert("Signup failed. Please try again.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  // Toggle function
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="flex flex-col min-h-screen overflow-hidden lg:flex-row bg-welcomeBg"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      {/* Left side - Image section with responsive layout */}
      <div className="relative flex items-center justify-center w-full h-40 overflow-hidden lg:w-3/5 sm:h-48 md:h-60 lg:h-screen bg-welcomeBg">
        <img
          src={logo}
          alt="Logo"
          className="absolute w-auto h-12 top-2 sm:top-4 left-2 sm:left-4 sm:h-16 lg:h-20"
        />
        <img
          className="object-contain w-auto h-24 sm:h-32 md:h-40 lg:h-160"
          src={signupImg}
          alt="Signup illustration"
        />
      </div>

      {/* Right side - Form section with responsive layout */}
      <div className="flex flex-col items-center justify-center w-full lg:w-2/5 px-6 sm:px-8 lg:px-10 py-8 sm:py-12 lg:py-16 bg-todoBlack min-h-[60vh] lg:min-h-screen">
        <div className="flex flex-col w-full max-w-sm gap-6 sm:gap-8 lg:gap-10">
          {/* Signup Header */}
          <div className="text-center">
            <h1 className="mb-2 text-2xl sm:text-3xl lg:text-4xl font-todoFont text-beigeLight">
              Signup
            </h1>
            <p className="text-xs sm:text-sm text-beigeLight font-todoFont font-extralight">
              Welcome to Momentum
            </p>
          </div>

          {/* Signup Form */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
            {/* FullName Field */}
            <div className="form-group">
              <input
                type="text"
                className="form-field"
                placeholder="fullname"
                name="fullname"
                id="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                required
              />
              <label
                htmlFor="fullname"
                className="font-extralight form-label font-todoFont"
              >
                FullName
              </label>
            </div>

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
            <div className="relative form-group">
              <input
                type={showPassword ? "text" : "password"}
                className="pr-10 form-field"
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
              <button
                type="button"
                className="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-700 focus:outline-none"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible
                    className="cursor-pointer text-beigeLight"
                    size={16}
                  />
                ) : (
                  <AiOutlineEye
                    className="cursor-pointer text-beigeLight"
                    size={16}
                  />
                )}
              </button>
            </div>

            {/* Signup Actions */}
            <div className="flex flex-col gap-4 mt-4 sm:gap-5 sm:mt-6 lg:mt-8">
              <button
                onClick={handleSubmit}
                className="w-full px-4 py-3 text-sm transition-all duration-300 border cursor-pointer sm:px-6 sm:py-4 sm:text-base text-beigeDark font-todoFont login-btn rounded-4xl"
                disabled={isLoading}
              >
                {isLoading ? "Signing up..." : "Signup"}
              </button>

              <div className="text-xs font-light text-center sm:text-sm text-beigeLight font-todoFont">
                Already have an account?{" "}
                <Link
                  className="font-semibold cursor-pointer text-beigeLight hover:underline"
                  to="/login"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
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
          font-size: 16px;
          color: var(--color-beigeLight);
          padding: 7px 0;
          background: transparent;
          transition: border-color 0.2s;
        }

        .form-field::placeholder {
          color: transparent;
        }

        .form-field:placeholder-shown ~ .form-label {
          font-size: 14px;
          cursor: text;
          top: 25px;
        }

        .form-label {
          position: absolute;
          top: 0;
          display: block;
          transition: 0.2s;
          font-size: 12px;
          color: var(--color-beigeLight);
          cursor: text;
        }

        .form-field:focus ~ .form-label,
        .form-field:not(:placeholder-shown) ~ .form-label {
          position: absolute;
          top: 0;
          display: block;
          transition: 0.2s;
          font-size: 12px;
          color: var(--color-beigeLight);
          font-weight: 300;
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

        /* Responsive adjustments for form fields */
        @media (max-width: 1024px) {
          .form-field {
            font-size: 18px;
          }
          .form-field:placeholder-shown ~ .form-label {
            font-size: 13px;
            top: 23px;
          }
        }

        @media (max-width: 768px) {
          .form-field {
            font-size: 16px;
            padding: 6px 0;
          }
          .form-field:placeholder-shown ~ .form-label {
            font-size: 12px;
            top: 20px;
          }
          .form-label {
            font-size: 11px;
          }
          .form-field:focus ~ .form-label,
          .form-field:not(:placeholder-shown) ~ .form-label {
            font-size: 11px;
          }
        }

        @media (max-width: 640px) {
          .form-field {
            font-size: 14px;
          }
          .form-field:placeholder-shown ~ .form-label {
            font-size: 11px;
            top: 18px;
          }
        }
      `}</style>
    </div>
  );
}

export default Register;
