import React, { useEffect, useState } from 'react';

const HorizontalArrow = ({ direction = 'right' }) => {
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
        width="90"
        height="33"
        viewBox="0 0 120 33"
        className="stroke-white"
        style={{
          transform: direction === 'left' ? 'rotate(180deg)' : 'rotate(0deg)',
          transformOrigin: 'center'
        }}
      >
        <path
          d="M0 20 L75 20"
          className={`stroke-1 ${animationComplete ? 'fill-white' : 'fill-none'}`}
          strokeDasharray="75"
          strokeDashoffset={animationComplete ? '0' : '75'}
          style={{
            animation: animationComplete ? 'none' : 'horizontalLine 3s ease-out 3'
          }}
        />
        <path
          d="M67 12 L75 20"
          className={`stroke-1 ${animationComplete ? 'fill-white' : 'fill-none'}`}
          strokeDasharray="15"
          strokeDashoffset={animationComplete ? '0' : '15'}
          style={{
            animation: animationComplete ? 'none' : 'horizontalArrow 3s ease-out 3'
          }}
        />
        <path
          d="M67 28 L75 20"
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