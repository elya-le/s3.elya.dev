import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import CanvasLoader from "../components/CanvasLoader";
import Cat from "../components/Cat.jsx";
// import "./Hero.css";
import { AiOutlineMail } from "react-icons/ai";
import { FiGithub } from "react-icons/fi";
import { LuTurtle } from "react-icons/lu";
import { PiShootingStarDuotone } from "react-icons/pi";
import { GoArrowDown } from "react-icons/go";
import PageArrow from "./PageArrow.jsx";

const Hero = ({ animationName, toggleAnimation }) => {
  const rectLightRef = useRef();
  const catRef = useRef();
  const cameraRef = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // dynamically calculate dimensions for the "Hi, I'm Elya" section
  const getResponsiveSectionDimensions = () => {
    if (screenWidth > 1024) {
      return { height: "450px", width: "650px" }; // fullscreen
    } else if (screenWidth > 668) {
      return { height: "340px", width: "580px" }; // tablet
    } else {
      return { height: "240px", width: "400px" }; // mobile
    }
  };

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFactor = 14;
      const adjustedScrollFraction = Math.min((scrollTop / docHeight) * scrollFactor, 1);
      setScrollProgress(adjustedScrollFraction);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getBasePosition = () => (screenWidth > 768 ? [-4, 3, 5] : [-8, 7, 7]);
  const getCatScale = () => (screenWidth > 1024 ? .7 : screenWidth > 768 ? 1 : 1.5);

  const rectLightSettings = screenWidth > 768 
    ? {
      position: [-0.7 * 0.7, 2.5 * 0.7, 1.6 * 0.7],
        rotation: [0.1, 0, 0],
        width: 1.2,
        height: 0.9,
        intensity: 30,
      }
    : {
        position: [-0.532, 1.862, 2.428],
        rotation: [0.1, 0, 0],
        width: 1.0,
        height: 0.7,
        intensity: 150,
      };

  // dimensions for "Hi, I'm Elya" section based on screen size
  const sectionDimensions = getResponsiveSectionDimensions();

  return (
    <section 
      id="home"
      className="relative z-10 w-full h-[100vh] sm:h-[120vh] bg-black bg-opacity-35 flex items-center justify-center z-10">
      <div
        className="pl-7 absolute text-white bg-transparent z-20
        left-1/2 md:left-[35%] lg:left-[37%]
        transform -translate-x-1/2 -translate-y-1/2 
        top-[22%] md:top-[23%] lg:top-[38%]
        py-0 md:py-6
        px-4 md:px-6 lg:px-8
        "
        style={{
          height: sectionDimensions.height,
          width: sectionDimensions.width,
          // top: '20%', // Default for small screens
          // '@media (min-width: 768px)': { top: '60%' }, // Medium screens
          // '@media (min-width: 1024px)': { top: '40%' } // Large screens
          // left: "50%",
          // top: "50%",
          // transform: "translate(-50%, -50%)",
          // padding: screenWidth > 1024 ? "32px" : screenWidth > 768 ? "24px" : "16px",
        }}
      >
        <h1 className="text-xl md:text-4xl lg:text-6xl font mb-1 md:mb-6 lg:mb-8">
          Hi, I'm Elya
        </h1>
        <p className="text-l md:text-2xl lg:text-3xl font-thin"> 
          Full-Stack Developer with a background in<br />
          UI/UX, motion design, 3D art and fabrication.
          <br className="hidden md:block" /><br />
          <span className="block md:inline pt-2">
          Driven by values rooted in care, equity, and autonomy —
          I am dedicated to building secure tools that empower communities.</span>
        </p>
        <div className="flex flex-row items-center space-x-3 mt-3 md:mt-8 lg:mt-10">
          <a
            href="https://github.com/elya-le"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-sm inline-flex items-center border border-white rounded-full 
              pl-3 pr-3 py-1.5 
              transition-colors hover:bg-[var(--bg-button-hover)] bg-[var(--bg-button)]
              sm:w-auto justify-center sm:justify-start"
          >
            Github <span className="ml-1"><FiGithub /></span>
          </a>
          <a
            href="mailto:hello@elya.dev"
            className="text-white text-sm inline-flex items-center border border-white rounded-full 
              pl-3 pr-3 py-1.5 
              transition-colors hover:bg-[var(--bg-button-hover)] bg-[var(--bg-button)]
              sm:w-auto justify-center sm:justify-start"
          >
            Email <span className="ml-1"><AiOutlineMail /></span>
          </a>
          <label className="toggle-switch flex items-center justify-center sm:justify-start w-full sm:w-auto">
            <input
              type="checkbox"
              checked={animationName === "Fast"}
              onChange={toggleAnimation}
              className="hidden"
            />
            <span className="slider">
              {animationName === "Fast" ? (
                <LuTurtle className="icon-slow" />
              ) : (
                <PiShootingStarDuotone className="icon-star-power" />
              )}
            </span>
          </label>
        </div>
        <p className="text-l md:text-xl lg:text-xl font-thin pt-2">
          Resume available upon request.
        </p>
      </div>
      <div className="absolute bottom-[25vh] z-30
        left-8 
        md:left-[calc(35%-290px)] 
        lg:left-[calc(38.5%-325px)]">
          {/* <GoArrowDown className="text-2xl text-white transition-colors animate-bounce" /> */}
          <PageArrow />
      </div>
      <Canvas
        className="w-full h-full z-10"
        style={{ height: "100%" }}
        onPointerDown={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        <Suspense fallback={<CanvasLoader />}>
          <PerspectiveCamera makeDefault ref={cameraRef} />
          <CameraZoom
            scrollProgress={scrollProgress}
            cameraRef={cameraRef}
            basePosition={getBasePosition()}
            screenWidth={screenWidth}
          />
          <color attach="background" args={["#191B00"]} />
          <rectAreaLight
            ref={rectLightRef}
            position={rectLightSettings.position}
            rotation={rectLightSettings.rotation}
            width={rectLightSettings.width}
            height={rectLightSettings.height}
            intensity={rectLightSettings.intensity}
            color={"#6F74F7"}
          />
          <ambientLight intensity={0.1} color={"#ffffff"} />
          <directionalLight position={[5, 10, 5]} intensity={0.01} color={"#ffffff"} castShadow />
          <Cat
            ref={catRef}
            animationName={animationName}
            origin={screenWidth < 768 ? [-.5, -1.2, 0] : [-.8, .2, 0]}
            scale={getCatScale()}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

const CameraZoom = ({ scrollProgress, cameraRef, basePosition, screenWidth }) => {
  const [baseX, baseY, baseZ] = basePosition;

  const xEnd = screenWidth > 768 ? 4.5 : 8;
  const yEnd = screenWidth > 768 ? -3 : -4;
  const zEnd = screenWidth > 768 ? 6.7 : 10;

  const startLookAt = screenWidth > 768 ? [-2, 1.0, .2] : [-0.5, 3, 0.5];
  const endLookAt = screenWidth > 768 ? [.5, 1, .4] : [0, .5, 0];

  useFrame(() => {
    if (cameraRef.current) {
      const progress = Math.min(Math.max(scrollProgress, 0), 1);

      const xPos = baseX + progress * xEnd;
      const yPos = baseY - progress * yEnd;
      const zPos = baseZ - progress * zEnd;

      const currentLookAt = startLookAt.map(
        (start, index) => start + progress * (endLookAt[index] - start)
      );

      cameraRef.current.position.set(xPos, yPos, zPos);
      cameraRef.current.lookAt(...currentLookAt);
    }
  });

  return null;
};

export default Hero;
