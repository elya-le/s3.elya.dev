import React, { useState, useEffect } from "react";

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
        className="flex justify-center mx-auto"
        style={{
          width: responsiveDimensions.width,
          height: responsiveDimensions.height,
        }}
      >
        {/* first container */ }
        <div className="p-3 sm:p-5 bg-[#262900] w-full lg:w-[415px] lg:mr-auto md:w-[440px] md:mr-auto">
          <p className="text-lg font-thin">
            Full-Stack Engineer with a background in UI/UX, motion design, and 3D art. <br /> <br />
            Guided by my beliefs in autonomy, equity, and empowerment — I strive to build secure, meaningful tools that foster inclusion & uplift communities.
          </p>
        </div>
        {/* second container pleace holder */}
      </div>
    </section>
  );
};


export default About;