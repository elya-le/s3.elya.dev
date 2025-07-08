import { useState, useEffect, useRef } from "react";
import { myProjects } from "../constants/index.js";
import { GoArrowUpRight, GoArrowLeft, GoArrowRight } from "react-icons/go";

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const currentProject = myProjects[selectedProjectIndex];
  const carouselRef = useRef(null);
  const scrollRef = useRef(null);
  const interactionTimeoutRef = useRef(null);
  const projectsSectionRef = useRef(null);
  const videoRef = useRef(null);

  // add scroll position tracking
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
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // auto-scroll functionality
  useEffect(() => {
    const scroll = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += 1;
        if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth - carouselRef.current.clientWidth) {
          carouselRef.current.scrollLeft = 0;
        }
      }
      scrollRef.current = requestAnimationFrame(scroll);
    };
    scrollRef.current = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(scrollRef.current);
  }, []);

  // auto loop video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video play failed:", error);
      });
    }
  }, [currentProject.videoLink]);

  // pause auto-scroll on interaction
  const pauseAutoScroll = () => {
    cancelAnimationFrame(scrollRef.current);
    clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => {
      scrollRef.current = requestAnimationFrame(scroll);
    }, 3000);
  };

  // dynamically calculate dimensions based on screen size
  const getResponsiveSectionDimensions = () => {
    if (screenWidth > 1024) {
      return { height: "770px", width: "900px" };
    } else if (screenWidth > 768) {
      return { height: "750px", width: "800px" };
    } else {
      return { height: "650px", width: "99%" };
    }
  };

  const getResponsiveImageSize = () => {
    if (screenWidth > 1024) {
      return { height: 348, width: 500 };
    } else if (screenWidth > 768) {
      return { height: 308, width: 440 };
    } else {
      return { height: 218, width: 310 };
    }
  };

  const getResponsiveSubdescHeight = () => {
    if (screenWidth > 1024) {
      return "145px";
    } else if (screenWidth > 768) {
      return "140px";
    } else {
      return "140px";
    }
  };

  const responsiveSectionDimensions = getResponsiveSectionDimensions();
  const responsiveImageSize = getResponsiveImageSize();
  const subdescHeight = getResponsiveSubdescHeight();

  // click on an image to navigate and toggle visibility
  const handleImageClick = (index) => {
    pauseAutoScroll();
    const totalImages = Object.keys(currentProject).filter((key) =>
      key.startsWith("previewImg")
    ).length;

    if (index === currentImageIndex) {
      if (index === 0) {
        const nextIndex = (index + 1) % totalImages;
        const scrollPosition = nextIndex * (responsiveImageSize.width * 1.05);
        setCurrentImageIndex(nextIndex);
        carouselRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
      } else {
        const prevIndex = (index - 1 + totalImages) % totalImages;
        const scrollPosition = prevIndex * (responsiveImageSize.width * 1.05);
        setCurrentImageIndex(prevIndex);
        carouselRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
      }
    } else {
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
        return prevIndex === 0 ? myProjects.length - 1 : prevIndex - 1;
      } else if (direction === "next") {
        return prevIndex === myProjects.length - 1 ? 0 : prevIndex + 1;
      }
    });
    setCurrentImageIndex(0);
  };

  // handle warning for mobile view when clicking "Live Link"
  const handleLiveLinkClick = (e, link) => {
    if (screenWidth <= 768) {
      e.preventDefault();
      const userConfirmed = window.confirm(
        "This project is best viewed on a desktop. Mobile experience will be limited. Proceed anyway?"
      );
      if (userConfirmed) {
        window.open(link, "_blank");
      }
    }
  };

  const getOverlapHeight = () => {
    const viewportHeight = window.innerHeight;
    return `${viewportHeight * 0.1}px`;
  };

  const getParallaxOffset = () => {
    if (!projectsSectionRef.current) return 0;
    const sectionTop = projectsSectionRef.current.offsetTop;
    const scrolled = Math.max(0, scrollPosition - sectionTop + window.innerHeight);
    return Math.min(scrolled * 0.4, window.innerHeight * 0.1);
  };

  return (
    <section
      ref={projectsSectionRef}
      className="projects-section"
      id="projects"
      style={{
        marginTop: `-${getOverlapHeight()}`,
        marginBottom: "40px",
        position: 'relative',
        background: 'transparent',
        paddingTop: getOverlapHeight(),
        transform: `translateY(${-getParallaxOffset()}px)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      <div
        style={{
          height: responsiveSectionDimensions.height,
          width: responsiveSectionDimensions.width,
        }}
      >
        <div className="projects-header-text">
          <p className={screenWidth > 640 ? "text-3xl" : "text-lg"}>Selected Projects</p>
        </div>
        
        <div
          className="projects-main-container"
          style={{
            height: responsiveSectionDimensions.height,
            width: responsiveSectionDimensions.width,
            border: `1px solid rgba(255, 255, 255, 0.2)`,
          }}
        >
          <div className="p-1 flex-1 w-full">
            <div
              ref={carouselRef}
              className="projects-image-carousel"
            >
              {Object.keys(currentProject)
                .filter((key) => key.startsWith("previewImg") || key === "videoLink")
                .map((key, index) => {
                  if (key === "videoLink") {
                    return (
                      <div
                        key={index}
                        className="project-media-item-video"
                        style={{
                          height: `${responsiveImageSize.height}px`,
                          width: `${responsiveImageSize.width}px`,
                        }}
                      >
                        <video
                          ref={videoRef}
                          autoPlay={true}
                          loop={true}
                          muted={true}
                          playsInline={true}
                          className="project-media-content"
                          onLoadedData={(e) => {
                            const video = e.target;
                            video.play()
                              .then(() => console.log("Video playing"))
                              .catch(err => console.log("Video play error:", err));
                          }}
                          onError={(e) => {
                            console.log("Video error:", e);
                          }}
                        >
                          <source 
                            src={currentProject[key]} 
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    );
                  }
                  return (
                    <div
                      key={index}
                      className="project-media-item-img"
                      style={{
                        height: `${responsiveImageSize.height}px`,
                        width: `${responsiveImageSize.width}px`,
                      }}
                      onClick={() => handleImageClick(index)}
                    >
                      <img
                        src={currentProject[key]}
                        alt={`${currentProject.title} screenshot ${index + 1}`}
                        className="project-media-content"
                      />
                    </div>
                  );
                })}
            </div>
            
            <div className="project-header-row">
              <p className={`project-title-text ${screenWidth > 1024 ? "text-2xl" : "text-xl"}`}>
                {currentProject.title}
              </p>
              <div className="links">
                {currentProject.repoLink && currentProject.title === "Current Portfolio Site" ? (
                  <a
                    href={currentProject.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-button"
                  >
                    Github <GoArrowUpRight className="project-link-icon" />
                  </a>
                ) : currentProject.liveLink ? (
                  <a
                    href={currentProject.liveLink}
                    onClick={(e) => handleLiveLinkClick(e, currentProject.liveLink)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-button"
                  >
                    Live Link <GoArrowUpRight className="project-link-icon" />
                  </a>
                ) : null}
              </div>
            </div>
            
            <p className={`project-description-text ${screenWidth > 768 ? "md:text-lg lg:text-lg" : "text-sm"} ${screenWidth > 640 ? "sm:text-base" : ""}`}>
              {currentProject.desc}
            </p>
            
            <div
              className={`project-subdesc-content ${screenWidth > 768 ? "md:text-lg lg:text-lg" : "text-sm"} ${screenWidth > 640 ? "sm:text-base" : ""}`}
              dangerouslySetInnerHTML={{ __html: currentProject.subdesc }}
              style={{
                height: subdescHeight,
              }}
            ></div>
            
            <div className="project-tag-container">
              Built With: 
              {currentProject.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="project-tag-item"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
          
          <div className="project-navigation-row">
            <button
              className="project-nav-button"
              onClick={() => handleNavigation("previous")}
            >
              <GoArrowLeft className="project-nav-icon" />
            </button>
            
            <div className="project-dots-container">
              {myProjects.map((_, index) => (
                <span
                  key={index}
                  className={`project-dot ${
                    index === selectedProjectIndex ? "project-dot-active" : "project-dot-inactive"
                  }`}
                ></span>
              ))}
            </div>
            
            <button
              className="project-nav-button"
              onClick={() => handleNavigation("next")}
            >
              <GoArrowRight className="project-nav-icon" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;