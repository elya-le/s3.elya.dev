import React, { useState, useEffect } from 'react';

const PercentageLoadingCircle = ({ 
  percentage = 0,
  size = 60, 
  text = "Loading video content...", 
  textSize = "text-lg",
  className = "",
  strokeWidth = 4,
  color = "#3b82f6" // blue-500
}) => {
  const [displayPercentage, setDisplayPercentage] = useState(0);
  
  // Animate the percentage counter
  useEffect(() => {
    let start = 0;
    const end = percentage;
    const duration = 300; // Animation duration in ms
    const stepTime = 16; // ~60fps
    const steps = duration / stepTime;
    const increment = (end - start) / steps;
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayPercentage(end);
        clearInterval(timer);
      } else {
        setDisplayPercentage(Math.floor(start));
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [percentage]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (displayPercentage / 100) * circumference;

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      {/* Percentage Circle */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.3s ease-in-out',
            }}
          />
        </svg>
        {/* Percentage text in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-gray-700">
            {displayPercentage}%
          </span>
        </div>
      </div>
      
      {/* Loading Text */}
      <p className={`text-gray-600 ${textSize} font-medium text-center`}>
        {text}
      </p>
    </div>
  );
};

export default PercentageLoadingCircle;