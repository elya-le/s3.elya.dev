import React from 'react';

const PageArrow = () => {
  return (
    <div>
      <svg 
        width="20" 
        height="60" 
        viewBox="0 0 40 120" 
        className="stroke-white"
      >
        {/* Main line */}
        <path 
          d="M20 0 L20 100" 
          className="stroke-2 fill-none"
          strokeDasharray="100"
          strokeDashoffset="100"
          style={{
            animation: 'drawLine 2s ease-out forwards'
          }}
        />
        {/* Left side of arrowhead */}
        <path 
          d="M4 84 L20 100" 
          className="stroke-2 fill-none"
          strokeDasharray="30"
          strokeDashoffset="30"
          style={{
            animation: 'drawLine 0.5s ease-out 1.5s forwards'
          }}
        />
        {/* Right side of arrowhead */}
        <path 
          d="M36 84 L20 100" 
          className="stroke-2 fill-none"
          strokeDasharray="30"
          strokeDashoffset="30"
          style={{
            animation: 'drawLine 0.5s ease-out 1.5s forwards'
          }}
        />
      </svg>
      <style jsx>{`
        @keyframes drawLine {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default PageArrow;