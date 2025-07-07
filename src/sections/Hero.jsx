import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import CanvasLoader from "../components/CanvasLoader";
import Cat from "../components/Cat.jsx";
import { AiOutlineMail } from "react-icons/ai";
import { FiGithub } from "react-icons/fi";
import { LuTurtle } from "react-icons/lu";
import { PiShootingStarDuotone } from "react-icons/pi";
import PageArrow from "./PageArrow.jsx";

const Hero = ({ animationName, toggleAnimation }) => {
  const rectLightRef = useRef();
  const catRef = useRef();
  const cameraRef = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Responsive dimensions using CSS custom properties approach
  const getContentStyles = () => {
    const baseStyles = {
      position: 'absolute',
      zIndex: 20,
      color: 'var(--color-text-primary)',
      background: 'transparent',
      padding: 'var(--space-lg)',
      transform: 'translate(-50%, -50%)',
    };

    if (screenWidth > 1024) {
      return {
        ...baseStyles,
        left: '37%',
        top: '38%',
        width: '650px',
        height: '450px',
      };
    } else if (screenWidth > 768) {
      return {
        ...baseStyles,
        left: '35%',
        top: '23%',
        width: '580px',
        height: '340px',
      };
    } else {
      return {
        ...baseStyles,
        left: '50%',
        top: '22%',
        width: '400px',
        height: '240px',
      };
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
  const getCatScale = () => (screenWidth > 1024 ? 0.7 : screenWidth > 768 ? 1 : 1.5);

  const getArrowStyles = () => {
    const baseStyles = {
      position: 'absolute',
      zIndex: 30,
    };

    if (screenWidth > 1024) {
      return {
        ...baseStyles,
        bottom: '25vh',
        left: 'calc(38.5% - 325px)',
      };
    } else if (screenWidth > 768) {
      return {
        ...baseStyles,
        bottom: '25vh',
        left: 'calc(35% - 290px)',
      };
    } else {
      return {
        ...baseStyles,
        bottom: '20vh',
        left: 'var(--space-xl)',
      };
    }
  };

  return (
    <section 
      id="home"
      className="hero-section"
      style={{ 
        height: screenWidth > 640 ? '120vh' : '100vh',
        backgroundColor: 'rgba(0,0,0,0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
      }}
    >
      {/* Content Section */}
      <div style={getContentStyles()}>
        <h1 className="text-display">
          Hi, I'm Elya
        </h1>
        
        <p className="text-subtitle mb-md">
          Full-Stack Developer with a background in<br />
          UI/UX, motion design, 3D art and fabrication.
        </p>
        
        <p className="text-subtitle">
          Driven by values rooted in care, equity, and autonomy —
          I am dedicated to building secure tools that empower communities.
        </p>

        <div className="flex-start gap-md mt-lg">
          <a
            href="https://github.com/elya-le"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Github <FiGithub />
          </a>
          
          <a
            href="mailto:hello@elya.dev"
            className="btn"
          >
            Email <AiOutlineMail />
          </a>
          
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={animationName === "Fast"}
              onChange={toggleAnimation}
            />
            <span className="slider">
              {animationName === "Fast" ? (
                <LuTurtle className="toggle-icon icon-slow" />
              ) : (
                <PiShootingStarDuotone className="toggle-icon icon-star-power" />
              )}
            </span>
          </label>
        </div>

        <p className="text-body mt-sm">
          Resume available upon request.
        </p>
      </div>

      {/* Page Arrow */}
      <div style={getArrowStyles()}>
        <PageArrow scrollProgress={scrollProgress} />
      </div>

      {/* 3D Canvas */}
      <Canvas
        style={{ 
          width: '100%', 
          height: '100%', 
          zIndex: 10 
        }}
        onPointerDown={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        shadows 
      >
        <Suspense fallback={<CanvasLoader />}>
          <PerspectiveCamera makeDefault ref={cameraRef} />
          <CameraZoom
            scrollProgress={scrollProgress}
            cameraRef={cameraRef}
            basePosition={getBasePosition()}
            screenWidth={screenWidth}
          />
          <color attach="background" args={["#90D5FF"]} />

          <ambientLight intensity={1} color={"#ffffff"} />
          <directionalLight 
            position={[5, 10, 5]} 
            intensity={1} 
            color={"#ffffff"}   
            castShadow 
            shadow-mapSize={[2048, 2048]}
          />
          <Cat
            ref={catRef}
            animationName={animationName}
            origin={screenWidth < 768 ? [-0.5, -1.2, 0] : [-0.8, 0.2, 0]}
            scale={getCatScale()}
          />
          {/* Shadow floor */}
          <mesh 
            rotation={[-Math.PI / 2, 0, 0]} 
            position={[0, -0.07, 0]} 
            receiveShadow
          >
            <planeGeometry args={[50, 50]} />
            <shadowMaterial transparent opacity={0.3} />
          </mesh>
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

  const startLookAt = screenWidth > 768 ? [-2, 1.0, 0.2] : [-0.5, 3, 0.5];
  const endLookAt = screenWidth > 768 ? [0.5, 1, 0.4] : [0, 0.5, 0];

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




