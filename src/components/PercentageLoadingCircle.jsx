import React, { useState, useEffect } from 'react';

const PercentageLoadingCircle = ({ 
  percentage = 0,
  size = 60, 
  text = "Loading video content...", 
  className = "",
  strokeWidth = 4,
  color = null, // will use CSS variable if null
  isDark = false // dark theme override
}) => {
  const [displayPercentage, setDisplayPercentage] = useState(0);
  
  // animate the percentage counter
  useEffect(() => {
    let start = 0;
    const end = percentage;
    const duration = 300; // animation duration in ms
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

  // use CSS variables or fallback to prop colors
  const progressColor = color || 'var(--loading-circle-progress-color)';
  const backgroundColor = 'var(--loading-circle-background-color)';

  return (
    <div className={`loading-circle-container ${isDark ? 'loading-circle-dark' : ''} ${className}`}>
      {/* percentage Circle */}
      <div className="loading-circle-svg-container" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="loading-circle-svg"
        >
          {/* background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={progressColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="loading-circle-progress"
          />
        </svg>
        {/* percentage text in center */}
        <div className="loading-circle-percentage-container">
          <span className="loading-circle-percentage">
            {displayPercentage}%
          </span>
        </div>
      </div>
      
      {/* loading Text */}
      <p className="loading-circle-text">
        {text}
      </p>
    </div>
  );
};

export default PercentageLoadingCircle;