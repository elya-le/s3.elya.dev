import { useState, useEffect, useRef } from "react";
import { myProjects } from "../constants/index.js";
import { GoArrowUpRight, GoArrowLeft, GoArrowRight } from "react-icons/go";

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0); // state for current project
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // state to track screen width
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // state for internal image carousel
  const [scrollPosition, setScrollPosition] = useState(0);
  const currentProject = myProjects[selectedProjectIndex]; // get current project data
  const carouselRef = useRef(null); // reference for the internal image carousel
  const scrollRef = useRef(null); // reference for the scroll animation
  const interactionTimeoutRef = useRef(null); // reference for interaction timeout
  const projectsSectionRef = useRef(null);

  // Add scroll position tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // update screen width on resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // clean up event listener
  }, []);

  // auto-scroll functionality
  useEffect(() => {
    const scroll = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += 1; // Adjust the scroll speed as needed
        if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth - carouselRef.current.clientWidth) {
          carouselRef.current.scrollLeft = 0; // Reset scroll position to create a loop
        }
      }
      scrollRef.current = requestAnimationFrame(scroll);
    };
    scrollRef.current = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(scrollRef.current); // Clean up the animation frame on component unmount
  }, []);

  // pause auto-scroll on interaction
  const pauseAutoScroll = () => {
    cancelAnimationFrame(scrollRef.current);
    clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => {
      scrollRef.current = requestAnimationFrame(scroll);
    }, 3000); // Resume auto-scroll after 3 seconds of inactivity
  };

  // dynamically calculate dimensions based on screen size
  const getResponsiveSectionDimensions = () => {
    if (screenWidth > 1024) {
      return { height: "770px", width: "900px" }; // fullscreen
    } else if (screenWidth > 768) {
      return { height: "750px", width: "800px" }; // tablet
    } else {
      return { height: "650px", width: "99%" }; // mobile
    }
  };

  const getResponsiveImageSize = () => {
    if (screenWidth > 1024) {
      return { height: 348, width: 500 }; // fullscreen
    } else if (screenWidth > 768) {
      return { height: 308, width: 440 }; // tablet
    } else {
      return { height: 218, width: 310 }; // mobile
    }
  };

  const getResponsiveSubdescHeight = () => {
    if (screenWidth > 1024) {
      return "145px"; // height for desktop
    } else if (screenWidth > 768) {
      return "140px"; // height for tablet
    } else {
      return "140px"; // height for mobile
    }
  };

  const responsiveSectionDimensions = getResponsiveSectionDimensions();
  const responsiveImageSize = getResponsiveImageSize();
  const subdescHeight = getResponsiveSubdescHeight(); // get height dynamically

  // click on an image to navigate and toggle visibility
  const handleImageClick = (index) => {
    pauseAutoScroll();
    const totalImages = Object.keys(currentProject).filter((key) =>
      key.startsWith("previewImg")
    ).length;

    if (index === currentImageIndex) {
      // Special case: if the first image is clicked again, scroll to the second image
      if (index === 0) {
        const nextIndex = (index + 1) % totalImages; // Move to the second image
        const scrollPosition = nextIndex * (responsiveImageSize.width * 1.05);
        setCurrentImageIndex(nextIndex);
        carouselRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
      } else {
        // Otherwise, go back to the previous image
        const prevIndex = (index - 1 + totalImages) % totalImages; // Wrap around if necessary
        const scrollPosition = prevIndex * (responsiveImageSize.width * 1.05);
        setCurrentImageIndex(prevIndex);
        carouselRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
      }
    } else {
      // Otherwise, scroll to make the clicked image fully visible
      const newIndex = index % totalImages;
      const scrollPosition = newIndex * (responsiveImageSize.width * 1.05);
      setCurrentImageIndex(newIndex);
      carouselRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }
  };

  const handleNavigation = (direction) => {
    pauseAutoScroll();
    setSelectedProjectIndex((prevIndex) => {
      if (direction === "previous") {
        return prevIndex === 0 ? myProjects.length - 1 : prevIndex - 1; // move to previous project
      } else if (direction === "next") {
        return prevIndex === myProjects.length - 1 ? 0 : prevIndex + 1; // move to next project
      }
    });
    setCurrentImageIndex(0); // reset the internal image index when changing projects
  };

  // added: handle warning for mobile view when clicking "Live Link"
  const handleLiveLinkClick = (e, link) => {
    if (screenWidth <= 768) {
      // mobile screen threshold
      e.preventDefault(); // prevent default navigation
      const userConfirmed = window.confirm(
        "This project is best viewed on a desktop. Mobile experience will be limited. Proceed anyway?"
      );
      if (userConfirmed) {
        window.open(link, "_blank"); // open the link if confirmed
      }
    }
  };

  const getOverlapHeight = () => {
    const viewportHeight = window.innerHeight;
    return `${viewportHeight * 0.1}px`; // 20% of viewport height
  };

  const getParallaxOffset = () => {
    if (!projectsSectionRef.current) return 0;
    const sectionTop = projectsSectionRef.current.offsetTop;
    const scrolled = Math.max(0, scrollPosition - sectionTop + window.innerHeight);
    return Math.min(scrolled * 0.4, window.innerHeight * 0.1); // Maximum 20% parallax
  };

  return (
    <section
      ref={projectsSectionRef}
      className="projects-section relative z-10 flex flex-col justify-center items-center bg-transparent px-4 py-2 pb-5"
      id="projects"
      style={{
        marginTop: `-${getOverlapHeight()}`,
        position: 'relative',
        background: 'transparent',
        paddingTop: getOverlapHeight(),
        transform: `translateY(${-getParallaxOffset()}px)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      {/* header section for "Selected Projects" */}

      <div
        className=""
        style={{
          height: responsiveSectionDimensions.height,
          width: responsiveSectionDimensions.width,
        }}
      >
        <div className="w-full text-left mb-2 pl-3 sm:pl-6 sm:mb-4">
          <p className="text-white text-lg sm:text-3xl font-thin">Selected Projects</p>
        </div>
        {/* project grid container */}
        <div
          className="relative bg-opacity-80 flex flex-col justify-center h-[responsiveSectionDimensions.height] w-[responsiveSectionDimensions.width] p-2 lg:p-5 md:p-4 sm:px-2 sm:py-4"
          style={{
            backgroundColor: "var(--bg-secondary)",
          }}
        >
          <div className="p-1 flex-1 w-full">
            {/* internal image carousel */}
            <div
              ref={carouselRef}
              className="whitespace-nowrap overflow-x-auto hide-scrollbar"
              style={{
                overflowX: "scroll", // enable horizontal scrolling
                overflowY: "hidden",
                cursor: "pointer",
              }}
            >
              {Object.keys(currentProject)
                .filter((key) => key.startsWith("previewImg"))
                .map((key, index) => (
                  <div
                    key={index}
                    style={{
                      display: "inline-block", // display images inline
                      verticalAlign: "top",
                      marginRight: "10px", // spacing between images
                      height: `${responsiveImageSize.height}px`, // dynamically apply height
                      width: `${responsiveImageSize.width}px`, // dynamically apply width
                      // border: "1px solid #fff", 
                      position: "relative", // for aspect ratio
                    }}
                    onClick={() => handleImageClick(index)} // attach click handler
                  >
                    <img
                      src={currentProject[key]}
                      alt={`${currentProject.title} screenshot ${index + 1}`}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        objectPosition: "top",
                        objectFit: "cover", // maintain image aspect ratio
                      }}
                    />
                  </div>
                ))}
            </div>
            {/* project title and live link/github repo */}
            <div className="mt-4 flex justify-between items-center w-full">
              <p
                className={`text-white font-medium ${
                  screenWidth > 1024 ? "text-2xl" : "text-xl"
                }`}
              >
                {currentProject.title}
              </p>
              <div className="links">
                {currentProject.repoLink && currentProject.title === "Current Portfolio Site" ? (
                  <a
                    href={currentProject.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-sm inline-flex items-center border border-white rounded-full pl-4 pr-3 py-1.5 transition-colors hover:bg-[var(--bg-button-hover)] bg-[var(--bg-button)]"
                  >
                    Github <GoArrowUpRight className="text-lg font-thin ml-1" />
                  </a>
                ) : currentProject.liveLink ? (
                  <>
                    <a
                      href={currentProject.liveLink}
                      onClick={(e) => handleLiveLinkClick(e, currentProject.liveLink)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-sm inline-flex items-center border border-white rounded-full pl-4 pr-3 py-1.5 transition-colors hover:bg-[var(--bg-button-hover)] bg-[var(--bg-button)]"
                    >
                      Live Link <GoArrowUpRight className="text-lg font-thin ml-1" />
                    </a>
                  </>
                ) : null}
              </div>
            </div>
            {/* project description */}
            <p className="mt-2 text-white font-thin text-sm sm:text-base md:text-lg lg:text-lg">
              {currentProject.desc}
            </p>
            <div
              className="subdesc mt-4 text-sm sm:text-base md:text-lg lg:text-lg"
              dangerouslySetInnerHTML={{ __html: currentProject.subdesc }}
              style={{
                height: subdescHeight,
              }}
            ></div>
            {/* add tags */}
            <div className="tags my-4 flex flex-wrap gap-2">
              {currentProject.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 text-sm font-thin rounded-full text-white"
                  style={{
                    backgroundColor: tag.color,
                    color: tag.textColor || "#ffffff",
                  }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
          {/* navigation buttons for projects */}
          <div className="flex justify-between items-center px-1 pb-1 w-full">
            {/* previous button */}
            <button
              className="text-lg flex items-center "
              onClick={() => handleNavigation("previous")}
            >
              <GoArrowLeft className="ml-1 text-white transition-colors" />
              {/* Prev */}
            </button>
            {/* slider counter as dots */}
            <div className="flex gap-2">
              {myProjects.map((_, index) => (
                <span
                  key={index}
                  className={`w-2 h-2 rounded-full border ${
                    index === selectedProjectIndex ? "bg-white border-white" : "border-white"
                  }`}
                ></span>
              ))}
            </div>
            {/* next button */}
            <button
              className="text-lg flex items-center "
              onClick={() => handleNavigation("next")}
            >
              <GoArrowRight className="mr-1 text-grey transition-colors" />
              {/* Next */}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;