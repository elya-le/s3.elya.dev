import React, { useState, useEffect } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FiGithub } from "react-icons/fi";

const About = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // state to track screen width
  const [marginTop, setMarginTop] = useState(0); // dynamic margin-top to control overlap

  // update screen width on resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // clean up event listener
  }, []);

  // track scroll and dynamically adjust margin-top
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY; // current scroll position
      const maxOverlap = window.innerHeight * 0.42; // 1/4 of the hero section height
      const newMarginTop = Math.min(scrollTop, maxOverlap); // gradually reduce margin-top
      setMarginTop(-newMarginTop); // set a negative margin to create overlap
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // cleanup on unmount
  }, []);


  // dynamically calculate dimensions based on screen size
  const getResponsiveDimensions = () => {
    if (screenWidth > 1024) {
      return { height: "240px", width: "896px" }; // fullscreen
    } else if (screenWidth > 768) {
      return { height: "240px", width: "800px" }; // tablet
    } else {
      return { height: "260px", width: "99%" }; // mobile
    }
  };

  const responsiveDimensions = getResponsiveDimensions();

  return (
    <section
      id="about"
      className="about-section relative z-10 flex justify-center items-center bg-transparent px-4 py-1 sm:px-4 sm:py-2 pb-2 sm:pb-10 mb-10"
      style={{
        marginTop: `${marginTop}px`, // dynamic margin-top for overlap
      }}
    >
      <div
        className="flex flex-col lg:flex-row justify-center mx-auto"
        style={{
          width: responsiveDimensions.width,
          height: responsiveDimensions.height,
        }}
      >
        {/* first container */ }
        <div className="p-3 flex flex-col sm:p-5 bg-[#262900] w-full lg:w-[415px] lg:mr-auto md:w-[440px] md:mr-auto">
          <div className="flex flex-col items-left justify-between">
            <p className="text-lg font-thin">
              Full-Stack Engineer with a background in UI/UX, motion design, and 3D art. <br /> <br />
              Guided by my beliefs in autonomy, equity, and empowerment — I strive to build secure, meaningful tools that foster inclusion & uplift communities.
            </p>
            <div className="flex flex-row items-center mt-4 mb-2 space-x-2 lg:mt-0 lg:ml-4">
              <a
                href='mailto:elyaj.le@gmail.com?subject=Resume%20Request&body=
                Hi%20Elya,%0D%0A%0D%0A
                My%20name%20is%20______
                %0D%0A%0D%0AI%20am%20interested%20in%20hiring%20you%20for%20______%0D%0A%0D%0A
                OR%0D%0A%0D%0A
                I%20would%20love%20to%20see%20if%20you%20are%20interested%20in%20______%0D%0A%0D%0A
                Could%20you%20please%20send%20me%20a%20copy%20of%20your%20resume?%0D%0A%0D%0A
                Thanks!%0D%0A%0D%0A
                ______'
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-sm inline-flex items-center border border-white rounded-full pl-4 pr-3 py-1.5 transition-colors hover:bg-[#5F6600] bg-[#4C5200]"
              > 
                Request Resume 
              </a>
              <a 
                href="https://github.com/elya-le" target="_blank" rel="noopener noreferrer"
                className="text-white text-sm inline-flex items-center border border-white rounded-full pl-2 pr-2 py-1.5 transition-colors hover:bg-[#5F6600] bg-[#4C5200]"
              >
              <FiGithub />
              </a>
              <a
                className="text-white text-sm inline-flex items-center border border-white rounded-full pl-2 pr-2 py-1.5 transition-colors hover:bg-[#5F6600] bg-[#4C5200]"
                href="mailto:elyaj.le@gmail.com"
              >
              <AiOutlineMail />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;