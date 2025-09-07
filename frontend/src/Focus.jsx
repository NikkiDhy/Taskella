import { useState, useEffect, useRef } from "react";
import focusBg from "./assets/focusBg.png";

export default function Focus() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [initialTime, setInitialTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editMinutes, setEditMinutes] = useState(25);
  const [editSeconds, setEditSeconds] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
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
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  const currentTime = formatTime(timeLeft);

  // Calculate progress (0 to 1, where 1 is complete)
  const progress = initialTime > 0 ? (initialTime - timeLeft) / initialTime : 0;

  // Circle properties
  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen p-8 font-todoFont bg-welcomeBg">
      {/* Circular Image Section */}
      <div className="relative mb-12">
        <svg width="350" height="350" className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="175"
            cy="175"
            r={radius}
            className="stroke-current text-todoBlack fill-welcomeBg"
            strokeWidth="0.5"
          />
          {/* Progress circle */}
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

        {/* Image inside circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* <div className="flex items-center justify-center w-32 h-32 rounded-full shadow-lg bg-gradient-to-br from-blue-400 to-purple-500"> */}
          {/* <svg
              className="w-16 h-16 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg> */}
          {/* </div> */}
          <img className="h-auto w-60" src={focusBg} />
        </div>
      </div>
      {/* Editable Timer Display */}
      <div className="mb-8">
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
        <div className="flex space-x-4">
          {!isRunning ? (
            <button
              onClick={handleStart}
              disabled={timeLeft === 0}
              className="py-2 text-sm font-medium transition-colors bg-transparent cursor-pointer px-7 border-1 text-todoBlack focus:outline-none focus:ring-1 focus:ring-beigeLight disabled:bg-gray-400 disabled:cursor-not-allowed"
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
