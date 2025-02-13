import React, { useEffect, useState } from 'react';

const HorizontalArrow = ({ direction = 'right' }) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // function to check if element is in view
    const checkElementVisibility = () => {
      const element = document.querySelector('.horizontal-arrow-container');
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // check if the element is near the bottom of the viewport
      const isNearBottom = rect.bottom <= windowHeight && rect.bottom > 0;
      
      if (isNearBottom && !isVisible) {
        setIsVisible(true);
      }
    };

    // add scroll event listener
    window.addEventListener('scroll', checkElementVisibility);
    
    // initial check
    checkElementVisibility();

    // cleanup
    return () => {
      window.removeEventListener('scroll', checkElementVisibility);
    };
  }, [isVisible]);

  useEffect(() => {
    let timer;
    if (isVisible) {
      timer = setTimeout(() => {
        setAnimationComplete(true);
      }, 9000); // 3 times the animation duration (3 * 3s = 9s)
    }

    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <div className="horizontal-arrow-container flex items-center justify-center w-full h-full">
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
            animation: (isVisible && !animationComplete) ? 'horizontalLine 3s ease-out 3' : 'none'
          }}
        />
        <path
          d="M67 12 L75 20"
          className={`stroke-1 ${animationComplete ? 'fill-white' : 'fill-none'}`}
          strokeDasharray="15"
          strokeDashoffset={animationComplete ? '0' : '15'}
          style={{
            animation: (isVisible && !animationComplete) ? 'horizontalArrow 3s ease-out 3' : 'none'
          }}
        />
        <path
          d="M67 28 L75 20"
          className={`stroke-1 ${animationComplete ? 'fill-white' : 'fill-none'}`}
          strokeDasharray="15"
          strokeDashoffset={animationComplete ? '0' : '15'}
          style={{
            animation: (isVisible && !animationComplete) ? 'horizontalArrow 3s ease-out 3' : 'none'
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