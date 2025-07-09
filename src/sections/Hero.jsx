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
import * as THREE from "three";

const Hero = ({ animationName, toggleAnimation }) => {
  const rectLightRef = useRef();
  const catRef = useRef();
  const cameraRef = useRef();
  const directionalLightRef = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [catScrollProgress, setCatScrollProgress] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);

  // detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent;
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // configure shadow settings after light is created for shadow performance
  // and to ensure it works well on mobile devices
  useEffect(() => {
    if (directionalLightRef.current) {
      const light = directionalLightRef.current;
      
      // mobile-specific shadow settings
      if (isMobile) {
        light.shadow.camera.near = 0.01;  // much closer near plane
        light.shadow.camera.far = 25;
        light.shadow.bias = -0.005;       // more aggressive bias
        light.shadow.normalBias = 0.1;    // migher normal bias
        light.shadow.mapSize.setScalar(512); // even lower resolution for testing
      } else {
        light.shadow.camera.near = 0.1;
        light.shadow.camera.far = 50;
        light.shadow.bias = -0.0001;
        light.shadow.normalBias = 0.02;
        light.shadow.mapSize.setScalar(2048);
      }
      
      // set shadow camera bounds
      light.shadow.camera.left = -15;
      light.shadow.camera.right = 15;
      light.shadow.camera.top = 15;
      light.shadow.camera.bottom = -15;
      
      // update the shadow camera
      light.shadow.camera.updateProjectionMatrix();
    }
  }, [isMobile]);

  // responsive dimensions using CSS custom properties approach
  const getContentStyles = () => {
    // Calculate text opacity - fade out as user scrolls (mobile only)
    const getTextOpacity = () => {
      // Only apply fade effect on mobile devices
      if (screenWidth > 768) {
        return 1; // always fully visible on desktop/tablet
      }
      
      // Mobile: Start fading out after 20% scroll progress, fully transparent at 80%
      if (scrollProgress <= 0.2) {
        return 1; // fully visible
      } else if (scrollProgress >= 0.8) {
        return 0; // fully transparent
      } else {
        // Linear fade between 20% and 80%
        return 1 - ((scrollProgress - 0.2) / 0.6);
      }
    };

    const baseStyles = {
      position: 'absolute',
      zIndex: 20,
      color: 'var(--color-text-primary)',
      padding: 'var(--space-lg)',
      transform: 'translate(-50%, -50%)',
      opacity: getTextOpacity(), // Add opacity animation
      // border: '1px solid var(--color-text-primary)',
      transition: 'all 0.1s ease-out', // smooth transition for position changes
    };

    // calculate animated position based on scroll progress
    const getAnimatedPosition = (initialTop, finalTop, initialLeft, finalLeft) => {
      const animatedTop = initialTop + (scrollProgress * (finalTop - initialTop));
      const animatedLeft = initialLeft + (scrollProgress * (finalLeft - initialLeft));
      return { top: `${animatedTop}%`, left: `${animatedLeft}%` };
    };

    if (screenWidth > 1024) {
      const { top, left } = getAnimatedPosition(38, 70, 35, 35); // moves down from 38% to 70%
      return {
        ...baseStyles,
        left,
        top,
        width: '590px',
        height: '450px',
      };
    } else if (screenWidth > 768) {
      const { top, left } = getAnimatedPosition(23, 65, 33, 33); // moves down from 23% to 65%
      return {
        ...baseStyles,
        left,
        top,
        width: '520px',
        height: '340px',
      };
    } else {
      const { top, left } = getAnimatedPosition(15, 60, 50, 50); // moves down from 15% to 60%
      return {
        ...baseStyles,
        left,
        top,
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
      const heroSection = document.getElementById('home');
      const projectsSection = document.getElementById('projects'); // assuming your projects section has id="projects"
      
      if (heroSection && projectsSection) {
        const heroHeight = heroSection.offsetHeight;
        const projectsTop = projectsSection.offsetTop;
        
        // content animation progress (multiply by 2 for faster content)
        const progress = Math.min(Math.max((scrollTop / heroHeight) * 2, 0), 1);
        setScrollProgress(progress);
        
        // cat camera animation progress (multiply by 4 for even faster cat movement)
        const catProgress = Math.min(Math.max((scrollTop / heroHeight) * 4, 0), 1);
        setCatScrollProgress(catProgress);
      } else {
        // fallback to original calculation if sections not found
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // content animation
        const scrollFactor = 25; // Increased from 14 to make animation faster
        const adjustedScrollFraction = Math.min((scrollTop / docHeight) * scrollFactor, 1);
        setScrollProgress(adjustedScrollFraction);
        
        // cat animation (even faster)
        const catScrollFactor = 40; // Higher number for faster cat animation
        const catScrollFraction = Math.min((scrollTop / docHeight) * catScrollFactor, 1);
        setCatScrollProgress(catScrollFraction);
      }
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
      // Mobile: move arrow up higher
      return {
        ...baseStyles,
        bottom: '30vh', // Changed from 20vh to 30vh to move up
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
      {/* introduction */}
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

      {/* page Arrow */}
      <div style={getArrowStyles()}>
        <PageArrow scrollProgress={scrollProgress} isMobile={isMobile} />
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
            scrollProgress={catScrollProgress}
            cameraRef={cameraRef}
            basePosition={getBasePosition()}
            screenWidth={screenWidth}
          />
          <color attach="background" args={["#90D5FF"]} />

          <ambientLight intensity={1} color={"#ffffff"} />
          <directionalLight 
            ref={directionalLightRef}
            position={[5, 10, 5]} 
            intensity={1} 
            color={"#ffffff"}   
            castShadow 
          />
          <Cat
            ref={catRef}
            animationName={animationName}
            origin={screenWidth < 768 ? [-0.5, -1.2, 0] : [-0.8, 0.2, 0]}
            scale={getCatScale()}
          />
          {/* shadow floor - adjusted position for mobile */}
          <mesh 
            rotation={[-Math.PI / 2, 0, 0]} 
            position={[0, isMobile ? -1.5 : -0.07, 0]} 
            receiveShadow
          >
            <planeGeometry args={[50, 50]} />
            <shadowMaterial transparent opacity={0.4} />
          </mesh>
        </Suspense>
      </Canvas>
    </section>
  );
};

const CameraZoom = ({ scrollProgress, cameraRef, basePosition, screenWidth }) => {
  const [baseX, baseY, baseZ] = basePosition;

  const xEnd = screenWidth > 768 ? 4.5 : 10;
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