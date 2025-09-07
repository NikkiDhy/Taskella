import bg from "./assets/bgWelcome.png";
import logo from "./assets/MomentumLogo.jpg";
import { useEffect, useState } from "react";
import Login from "./Login.jsx";
import { Link } from "react-router-dom";

function Home() {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const text = "Welcome";
    let i = 0;

    const typeWriter = () => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
        setTimeout(typeWriter, 200); // Adjust speed here (200ms per character)
      } else {
        // Optional: hide cursor after typing is complete
        setTimeout(() => setShowCursor(false), 1000);
      }
    };

    typeWriter();
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-welcomeBg">
      {/* Logo - Responsive positioning */}
      <div className="absolute z-10 left-4 sm:left-8 lg:left-20 top-4 sm:top-6">
        <img
          src={logo}
          alt="Logo"
          className="w-auto h-16 sm:h-20 md:h-24 lg:h-30"
        />
      </div>

      {/* Navigation - Responsive positioning */}
      <div className="absolute z-10 top-4 sm:top-6 right-4 sm:right-6">
        <div className="flex space-x-2 sm:space-x-4 sm:mr-10">
          <Link
            to="/login"
            className="px-2 py-2 text-sm font-light transition-colors sm:text-base font-todoFont text-todoBlack hover:border-b-2"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-2 py-2 text-sm font-light transition-colors sm:text-base font-todoFont text-todoBlack hover:border-b-2"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Main content container - Responsive layout */}
      <div className="flex flex-col h-full px-4 pt-20 mx-auto lg:flex-row lg:items-center lg:justify-between sm:px-6 lg:px-8 max-w-7xl sm:pt-24 lg:pt-0">
        {/* Left side - Text content */}
        <div className="flex-1 max-w-2xl mb-8 lg:mb-0">
          {/* Responsive heading */}
          <h1 className="mb-4 text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-todoFont text-todoBlack">
            {displayText}
            {showCursor && (
              <span className="font-bold font-todoBlack animate-pulse">_</span>
            )}
          </h1>

          {/* Responsive paragraph */}
          <p className="max-w-2xl text-sm font-light leading-relaxed sm:text-base lg:text-md text-todoBlack font-todoFont">
            Stay focused, stay moving — your tasks, your momentum.
            <br className="hidden sm:block" />
            <span className="block sm:inline">
              {" "}
              We believe productivity should be simple, focused, and free of
              clutter.
            </span>
            <br className="hidden sm:block" />
            <span className="block sm:inline">
              {" "}
              With tasks that reset every day, you stay disciplined and present.
            </span>
            <br className="hidden sm:block" />
            <span className="block sm:inline">
              {" "}
              Start fresh, stay consistent, and keep moving forward with
              Momentum.
            </span>
          </p>
        </div>

        {/* Right side - Image with responsive sizing */}
        <div className="flex-shrink-0">
          <img
            src={bg}
            alt="Welcome"
            className="object-contain w-64 h-64 mx-auto sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-auto lg:h-96 xl:h-120"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
