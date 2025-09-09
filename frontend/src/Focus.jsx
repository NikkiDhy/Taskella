import { useState, useEffect, useRef } from "react";
import focusBg from "./assets/focusBg.png";
import { FaTasks } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "./assets/MomentumLogo.jpg";
import confetti from "canvas-confetti"; // install with npm i canvas-confetti
import popSound from "./assets/pop.mp3"; // add your pop sound in assets

export default function Focus() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [initialTime, setInitialTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editMinutes, setEditMinutes] = useState(25);
  const [editSeconds, setEditSeconds] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            setIsCompleted(true);
            triggerCelebration();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  const triggerCelebration = () => {
    // play sound
    const audio = new Audio(popSound);
    audio.play();

    // burst confetti
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return {
      mins: String(mins).padStart(2, "0"),
      secs: String(secs).padStart(2, "0"),
    };
  };

  const handleEditClick = () => {
    if (!isRunning) {
      const current = formatTime(timeLeft);
      setEditMinutes(parseInt(current.mins));
      setEditSeconds(parseInt(current.secs));
      setIsEditing(true);
    }
  };

  const handleSaveEdit = () => {
    const newTime = editMinutes * 60 + editSeconds;
    setTimeLeft(newTime);
    setInitialTime(newTime);
    setIsEditing(false);
    setIsCompleted(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleStart = () => {
    if (timeLeft > 0) {
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
    setIsCompleted(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  const currentTime = formatTime(timeLeft);

  const progress = initialTime > 0 ? (initialTime - timeLeft) / initialTime : 0;

  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-8 font-todoFont bg-welcomeBg">
      {/* Navigation to Todo */}
      <div
        onClick={() => navigate("/Todo")}
        className="absolute z-50 flex items-center justify-center w-8 h-8 border rounded-md cursor-pointer group top-2 right-4 sm:top-4 sm:right-4 lg:top-12 lg:right-20 hover:bg-todoBlack border-todoBlack"
      >
        <FaTasks className="text-xl transition text-todoBlack group-hover:text-white" />
        <span className="absolute hidden px-2 py-1 font-mono text-xs -translate-x-1/2 text-todoBlack -bottom-8 left-1/2 whitespace-nowrap group-hover:block">
          Tasks mode
        </span>
      </div>

      {/* Logo */}
      <img
        src={logo}
        alt="Logo"
        className="absolute w-auto h-12 top-2 sm:top-4 lg:top-0 left-2 sm:left-4 sm:h-16 md:h-20 lg:h-25"
      />

      {/* Circular Timer */}
      <div className="relative mb-12 pointer-events-none">
        <svg width="350" height="350" className="transform -rotate-90">
          <circle
            cx="175"
            cy="175"
            r={radius}
            className="stroke-current text-todoBlack fill-welcomeBg"
            strokeWidth="0.5"
          />
          <circle
            cx="175"
            cy="175"
            r={radius}
            className="stroke-current text-todoBlack fill-none"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: "stroke-dashoffset 1s ease-in-out",
            }}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <img className="h-auto pointer-events-none w-60" src={focusBg} />
        </div>
      </div>

      {/* Timer Display */}
      <div className="mb-8 pointer-events-auto">
        {isEditing ? (
          <div className="flex items-center px-8 py-6 space-x-2 bg-transparent border rounded-lg shadow-lg">
            <input
              type="number"
              value={editMinutes}
              onChange={(e) =>
                setEditMinutes(
                  Math.max(0, Math.min(99, parseInt(e.target.value) || 0))
                )
              }
              onKeyDown={handleKeyPress}
              className="w-20 font-mono text-6xl font-bold text-center bg-transparent rounded focus:outline-none "
              min="0"
              max="99"
              autoFocus
            />
            <span className="font-mono text-6xl font-bold text-welcomeBg">
              :
            </span>
            <input
              type="number"
              value={editSeconds}
              onChange={(e) =>
                setEditSeconds(
                  Math.max(0, Math.min(59, parseInt(e.target.value) || 0))
                )
              }
              onKeyDown={handleKeyPress}
              className="w-20 font-mono text-6xl font-bold text-center bg-transparent rounded focus:bg-blue-50 focus:outline-none"
              min="0"
              max="59"
            />
            <div className="flex flex-col ml-4 space-y-2">
              <button
                onClick={handleSaveEdit}
                className="px-3 py-1 text-sm transition-colors bg-green-500 rounded text-beigeLight hover:bg-green-600"
              >
                ✓
              </button>
              <button
                onClick={handleCancelEdit}
                className="px-3 py-1 text-sm transition-colors bg-red-500 rounded text-beigeLight hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={handleEditClick}
            className={`bg-transparent shadow-lg border-1 border-todoBlack px-8 py-6 transition-colors ${
              !isRunning ? "cursor-pointer" : "cursor-default"
            }`}
          >
            <div className="font-mono text-6xl font-light text-todoBlack">
              {currentTime.mins}:{currentTime.secs}
            </div>
          </div>
        )}
      </div>

      {/* Control Buttons */}
      {!isEditing && (
        <div className="flex space-x-4 pointer-events-auto">
          {isCompleted ? (
            <button
              onClick={handleReset}
              className="py-2 text-sm font-medium transition-colors bg-transparent cursor-pointer border-1 text-todoBlack px-7 focus:outline-none focus:ring-1 focus:ring-beigeLight"
            >
              Reset
            </button>
          ) : !isRunning ? (
            <button
              onClick={handleStart}
              disabled={timeLeft === 0}
              className="py-2 text-sm font-medium transition-colors bg-transparent cursor-pointer px-7 border-1 text-todoBlack focus:outline-none focus:ring-1 focus:ring-beigeLight disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-todoBlack hover:text-beigeLight"
            >
              Start
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="py-2 text-sm font-medium transition-colors bg-transparent cursor-pointer border-1 text-todoBlack px-7 focus:outline-none focus:ring-1 focus:ring-beigeLight"
            >
              Reset
            </button>
          )}
        </div>
      )}
    </div>
  );
}
