import React, { useState, useRef, useEffect } from "react";

const ProgressCircle = ({ size, progress }) => {
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    let timer;
    if (currentProgress < progress) {
      timer = setTimeout(() => {
        setCurrentProgress(currentProgress + 1);
      }, 10);
    } else if (progress == 0) {
      setCurrentProgress(-1);
    }
    return () => clearTimeout(timer);
  }, [currentProgress, progress]);

  return <Circle size={size} progress={currentProgress} />;
};

const Circle = ({ size, progress }) => {
  const stroke = 1.8;
  const stroke1 = 5.4;
  const radius = (size - stroke * 2) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={stroke}
        stroke="#7f7f7f"
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={stroke1}
        stroke="#08c"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
        fill="none"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset 1s linear infinite" }}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize={size / 5}
        fill="#08c"
      >
        {progress}%
      </text>
    </svg>
  );
};

export default ProgressCircle;
