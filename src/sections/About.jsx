import React, { useState, useEffect } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FiGithub } from "react-icons/fi";
import './About.css'; // Make sure your CSS file is imported here

const About = ({ animationName, toggleAnimation }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [marginTop, setMarginTop] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // update screen width on resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // track scroll progress and adjust margin-top
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxOverlap = window.innerHeight * 0.42;
      setMarginTop(-Math.min(scrollTop, maxOverlap));
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(Math.min(scrollTop / scrollHeight, 1));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getResponsiveDimensions = () => {
    if (screenWidth > 1024) return { height: "280px", width: "896px" };
    if (screenWidth > 768) return { height: "280px", width: "800px" };
    return { height: "260px", width: "99%" };
  };

  const responsiveDimensions = getResponsiveDimensions();

  return (
    <section
      id="about"
      className={`about-section relative z-10 flex flex-col justify-center items-center bg-transparent px-4 py-1 sm:px-4 sm:py-2 pb-2 sm:pb-10 mb-10 ${
        animationName === "Fast" ? "fast-animation" : "slow-animation"
      }`} // Apply different animation classes based on the animationName state
      style={{ marginTop: `${marginTop}px` }}
    >
      <div
        className="flex flex-col lg:flex-row justify-center mx-auto"
        style={{
          width: responsiveDimensions.width,
          height:"80px",
        }}
      >
        {/* toggle overlay */}
        <div
          className="p-3 flex flex-col sm:p-5 w-full lg:w-[415px] lg:mr-auto md:w-[440px] md:mr-auto"
          style={{
            left: 0,
          }}
        >
          <label className="toggle-switch flex">
            <input
              type="checkbox"
              checked={animationName === "Fast"}
              onChange={toggleAnimation} // toggleAnimation is passed as a prop
              className="hidden"
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
      {/* about section */}
      <div
        className="flex flex-col lg:flex-row justify-center mx-auto"
        style={{
          width: responsiveDimensions.width,
          height: responsiveDimensions.height,
        }}
      >
        <div className="p-3 flex flex-col sm:p-5 bg-[#262900] w-full lg:w-[415px] lg:mr-auto md:w-[440px] md:mr-auto">
          <div className="flex flex-col items-left justify-between">
            <p className="text-lg font-thin">
              Full-Stack Engineer with a background in UI/UX, motion design, and 3D art. <br />
              <br />
              Guided by my beliefs in autonomy, equity, and empowerment — I strive to build secure,
              meaningful tools that foster inclusion & uplift communities.
            </p>
            <div className="flex flex-row items-center mt-4 mb-2 space-x-2 justify-right">
              <a
                href="mailto:elyaj.le@gmail.com?subject=Resume%20Request&body=..."
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-sm inline-flex items-center border border-white rounded-full pl-4 pr-3 py-1.5 transition-colors hover:bg-[#5F6600] bg-[#4C5200]"
              >
                Request Resume
              </a>
              <a
                href="https://github.com/elya-le"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-sm inline-flex items-center border border-white rounded-full pl-3 pr-3 py-1.5 transition-colors hover:bg-[#5F6600] bg-[#4C5200]"
              >
                Github <span className="ml-1"><FiGithub /></span>
              </a>
              <a
                href="mailto:elyaj.le@gmail.com"
                className="text-white text-sm inline-flex items-center border border-white rounded-full pl-3 pr-3 py-1.5 transition-colors hover:bg-[#5F6600] bg-[#4C5200]"
              >
                Email <span className="ml-1"><AiOutlineMail /></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
