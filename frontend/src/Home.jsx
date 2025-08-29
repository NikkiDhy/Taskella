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
      <div className="absolute z-10 left-20">
        <img src={logo} alt="Logo" className="w-auto h-30" />
      </div>
      <div className="absolute z-10 top-6 right-6">
        <div className="flex mr-10 space-x-4">
          {/* <button
            className="px-2 py-2 font-light transition-colors font-todoFont text-todoBlack hover:border-b-2"
            onClick={Login}
          >
            Login
          </button> */}

          <Link
            to="/login"
            className="px-2 py-2 font-light transition-colors font-todoFont text-todoBlack hover:border-b-2"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-2 py-2 font-light transition-colors font-todoFont text-todoBlack hover:border-b-2"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Main content container */}
      <div className="flex items-center justify-between h-full px-8 mx-auto max-w-7xl">
        {/* Left side - Text content */}
        <div className="flex-1 max-w-2xl">
          {/* <h1 className="mb-6 text-5xl leading-tight font-todoFont text-todoBlack md:text-6xl">
            Welcome
          </h1> */}
          <h1 className="mb-4 text-5xl leading-tight font-todoFont text-todoBlack md:text-6xl">
            {displayText}
            {showCursor && (
              <span className="font-bold font-todoBlack animate-pulse ">_</span>
            )}
          </h1>
          <p className="max-w-2xl font-light leading-relaxed text-md text-todoBlack font-todoFont font">
            Stay focused, stay moving — your tasks, your momentum.
            <br /> We believe productivity should be simple, focused, and free
            of clutter. <br />
            With tasks that reset every day, you stay disciplined and present.
            <br />
            Start fresh, stay consistent, and keep moving forward with Momentum.
          </p>
        </div>

        {/* Right side - Image placeholder */}
        <div className="">
          <img src={bg} alt="Welcome" className="mx-auto mb-4 h-120" />
        </div>
      </div>
    </div>
  );
}

export default Home;
