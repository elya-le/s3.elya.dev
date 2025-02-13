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
            animation: 'mainLine 2.5s ease-out infinite'
          }}
        />
        {/* Left side of arrowhead */}
        <path 
          d="M4 84 L20 100" 
          className="stroke-2 fill-none"
          strokeDasharray="30"
          strokeDashoffset="30"
          style={{
            animation: 'arrowLine 2.5s ease-out infinite'
          }}
        />
        {/* Right side of arrowhead */}
        <path 
          d="M36 84 L20 100" 
          className="stroke-2 fill-none"
          strokeDasharray="30"
          strokeDashoffset="30"
          style={{
            animation: 'arrowLine 2.5s ease-out infinite'
          }}
        />
      </svg>
      <style jsx>{`
        @keyframes mainLine {
          0% { stroke-dashoffset: 100; opacity: 1; }
          50% { stroke-dashoffset: 0; opacity: 1; }
          85% { stroke-dashoffset: 0; opacity: 1; }
          90% { stroke-dashoffset: 0; opacity: 0; }
          100% { stroke-dashoffset: 100; opacity: 0; }
        }
        @keyframes arrowLine {
          0%, 40% { stroke-dashoffset: 30; opacity: 1; }
          60% { stroke-dashoffset: 0; opacity: 1; }
          85% { stroke-dashoffset: 0; opacity: 1; }
          90% { stroke-dashoffset: 0; opacity: 0; }
          100% { stroke-dashoffset: 30; opacity: 0; }
      `}</style>
    </div>
  );
};

export default PageArrow;