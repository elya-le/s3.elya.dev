import React from 'react';

const PageArrow = ({ scrollProgress }) => {
  // Stop animation when scrollProgress is greater than a certain threshold
  const shouldAnimate = scrollProgress < 0.1; // Adjust this threshold as needed

  return (
    <div style={{ opacity: shouldAnimate ? 1 : 0 }}>
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
            animation: shouldAnimate ? 'mainLine 2.5s ease-out infinite' : 'none'
          }}
        />
        {/* Left side of arrowhead */}
        <path 
          d="M4 84 L20 100" 
          className="stroke-2 fill-none"
          strokeDasharray="30"
          strokeDashoffset="30"
          style={{
            animation: shouldAnimate ? 'arrowLine 2.5s ease-out infinite' : 'none'
          }}
        />
        {/* Right side of arrowhead */}
        <path 
          d="M36 84 L20 100" 
          className="stroke-2 fill-none"
          strokeDasharray="30"
          strokeDashoffset="30"
          style={{
            animation: shouldAnimate ? 'arrowLine 2.5s ease-out infinite' : 'none'
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
        }
      `}</style>
    </div>
  );
};

export default PageArrow;