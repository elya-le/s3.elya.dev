import React from 'react';

const PageArrow = ({ scrollProgress }) => {
  const shouldAnimate = scrollProgress < 1;

  return (
    <div style={{ opacity: shouldAnimate ? 1 : 0 }}>
      <svg 
        width="20" 
        height="90"  
        viewBox="0 0 40 180"  
        className="stroke-white"
      >
        {/* Main line */}
        <path 
          d="M20 0 L20 150"  
          className="stroke-2 fill-none"
          strokeDasharray="150"  
          strokeDashoffset="150"  
          style={{
            animation: shouldAnimate ? 'mainLine 3s ease-out infinite' : 'none'
          }}
        />
        {/* Left side of arrowhead */}
        <path 
          d="M4 134 L20 150"  
          className="stroke-2 fill-none"
          strokeDasharray="30"
          strokeDashoffset="30"
          style={{
            animation: shouldAnimate ? 'arrowLine 3s ease-out infinite' : 'none'
          }}
        />
        {/* Right side of arrowhead */}
        <path 
          d="M36 134 L20 150"  
          className="stroke-2 fill-none"
          strokeDasharray="30"
          strokeDashoffset="30"
          style={{
            animation: shouldAnimate ? 'arrowLine 3s ease-out infinite' : 'none'
          }}
        />
      </svg>
      <style jsx>{`
        @keyframes mainLine {
          0% { stroke-dashoffset: 150; opacity: 1; }
          50% { stroke-dashoffset: 0; opacity: 1; }
          85% { stroke-dashoffset: 0; opacity: 1; }
          90% { stroke-dashoffset: 0; opacity: 0; }
          91%, 100% { stroke-dashoffset: 150; opacity: 0; }
        }
        @keyframes arrowLine {
          0%, 40% { stroke-dashoffset: 30; opacity: 1; }
          60% { stroke-dashoffset: 0; opacity: 1; }
          85% { stroke-dashoffset: 0; opacity: 1; }
          90% { stroke-dashoffset: 0; opacity: 0; }
          91%, 100% { stroke-dashoffset: 30; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default PageArrow;