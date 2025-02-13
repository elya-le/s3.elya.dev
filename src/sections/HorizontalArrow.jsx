import React, { useEffect, useState } from 'react';

const HorizontalArrow = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 9000); // 3 times the animation duration (3 * 3s = 9s)

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <svg
        width="40"
        height="90"
        viewBox="0 0 33 120"
        className="stroke-white"
        style={{
          transform: 'rotate(-90deg) translateX(-4px)',
          transformOrigin: 'center'
        }}
      >
        <path
          d="M20 0 L20 75"
          className={`stroke-1 ${animationComplete ? 'fill-white' : 'fill-none'}`}
          strokeDasharray="75"
          strokeDashoffset={animationComplete ? '0' : '75'}
          style={{
            animation: animationComplete ? 'none' : 'horizontalLine 3s ease-out 3'
          }}
        />
        <path
          d="M12 67 L20 75"
          className={`stroke-1 ${animationComplete ? 'fill-white' : 'fill-none'}`}
          strokeDasharray="15"
          strokeDashoffset={animationComplete ? '0' : '15'}
          style={{
            animation: animationComplete ? 'none' : 'horizontalArrow 3s ease-out 3'
          }}
        />
        <path
          d="M28 67 L20 75"
          className={`stroke-1 ${animationComplete ? 'fill-white' : 'fill-none'}`}
          strokeDasharray="15"
          strokeDashoffset={animationComplete ? '0' : '15'}
          style={{
            animation: animationComplete ? 'none' : 'horizontalArrow 3s ease-out 3'
          }}
        />
      </svg>
      <style jsx>{`
        @keyframes horizontalLine {
          0% { stroke-dashoffset: 75; opacity: 1; }
          50% { stroke-dashoffset: 0; opacity: 1; }
          85% { stroke-dashoffset: 0; opacity: 1; }
          90%, 100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes horizontalArrow {
          0%, 40% { stroke-dashoffset: 15; opacity: 1; }
          60% { stroke-dashoffset: 0; opacity: 1; }
          85% { stroke-dashoffset: 0; opacity: 1; }
          90%, 100% { stroke-dashoffset: 0; opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default HorizontalArrow;