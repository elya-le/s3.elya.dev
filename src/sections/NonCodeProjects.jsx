import React, { useState, useEffect, useRef } from "react";
import { GoArrowUpRight, GoArrowUpLeft, GoArrowLeft, GoArrowRight } from "react-icons/go";
import { otherProjects } from "../constants/index.js";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "/src/awsConfig.js";
import AspectRatioImage from "./AspectRatioImage";
import { Link, useNavigate } from 'react-router-dom';
import HorizontalArrow from "./HorizontalArrow";
import PercentageLoadingCircle from "../components/PercentageLoadingCircle";

const NonCodeProjects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);
  const currentProject = otherProjects[selectedProjectIndex];
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset video state when project changes
  useEffect(() => {
    setCurrentVideoIndex(0);
    setIsLoading(false);
    setLoadingProgress(0);
    setVideoError(false);
  }, [selectedProjectIndex]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getResponsiveSectionDimensions = () => {
    if (screenWidth > 1024) {
      return { height: "630px", width: "900px" };
    } else if (screenWidth > 768) {
      return { height: "660px", width: "800px" };
    } else {
      return { height: "600px", width: "99%" };
    }
  };

  const getResponsiveImageSize = () => {
    if (screenWidth > 1024) {
      return { width: 790 };
    } else if (screenWidth > 768) {
      return { width: 600 };
    } else {
      return { width: 420 };
    }
  };

  const getResponsiveSubdescHeight = () => {
    if (screenWidth > 1024) {
      return "190px";
    } else if (screenWidth > 768) {
      return "140px";
    } else {
      return "180px";
    }
  };

  const getResponsiveVideoSize = () => {
    if (screenWidth > 1024) {
      const width = 840;
      return { width: `${width}px`, height: `${(width * 9) / 16}px` };
    } else if (screenWidth > 768) {
      const width = 700;
      return { width: `${width}px`, height: `${(width * 9) / 16}px` };
    } else {
      return { 
        width: "100%", 
        height: `${(screenWidth * 9) / 16}px` 
      };
    }
  };

  const getCurrentVideoUrl = () => {
    if (currentProject.videos && currentProject.videos.length > 0) {
      return currentProject.videos[currentVideoIndex]?.url;
    }
    return currentProject.videoLink;
  };

  const getCurrentPlaceholder = () => {
    if (currentProject.videos && currentProject.videos.length > 0) {
      return currentProject.videos[currentVideoIndex]?.placeholder;
    }
    return null;
  };

  const hasMultipleVideos = () => {
    return currentProject.videos && currentProject.videos.length > 1;
  };

  const handleVideoSwitch = () => {
    if (hasMultipleVideos()) {
      const nextIndex = (currentVideoIndex + 1) % currentProject.videos.length;
      setCurrentVideoIndex(nextIndex);
      setIsLoading(true);
      setLoadingProgress(0);
      setVideoError(false);
    }
  };

  const handleVideoLoadStart = () => {
    setIsLoading(true);
    setLoadingProgress(10);
    setVideoError(false);
  };

  const handleVideoProgress = () => {
    if (videoRef.current) {
      try {
        const video = videoRef.current;
        if (video.buffered.length > 0) {
          const buffered = video.buffered.end(0);
          const duration = video.duration;
          if (duration > 0) {
            const progress = Math.min(Math.round((buffered / duration) * 100), 95);
            setLoadingProgress(progress);
          }
        }
      } catch (error) {
        // Silently handle any buffering errors
      }
    }
  };

  const handleVideoCanPlay = () => {
    setLoadingProgress(100);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const handleVideoError = () => {
    setVideoError(true);
    setIsLoading(false);
    console.error("Video failed to load");
  };

  const handleImageClick = (index) => {
    const totalImages = Object.keys(currentProject).filter((key) =>
      key.startsWith("previewImg")
    ).length;

    if (index === currentImageIndex) {
      if (index === 0) {
        const nextIndex = (index + 1) % totalImages;
        const scrollPosition = nextIndex * (getResponsiveImageSize().width * 1.05);
        setCurrentImageIndex(nextIndex);
        carouselRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
      } else {
        const prevIndex = (index - 1 + totalImages) % totalImages;
        const scrollPosition = prevIndex * (getResponsiveImageSize().width * 1.05);
        setCurrentImageIndex(prevIndex);
        carouselRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
      }
    } else {
      const newIndex = index % totalImages;
      const scrollPosition = newIndex * (getResponsiveImageSize().width * 1.05);
      setCurrentImageIndex(newIndex);
      carouselRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }
  };

  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === "previous") {
        return prevIndex === 0 ? otherProjects.length - 1 : prevIndex - 1;
      } else if (direction === "next") {
        return prevIndex === otherProjects.length - 1 ? 0 : prevIndex + 1;
      }
    });
    setCurrentImageIndex(0);
  };

  const responsiveVideoSize = getResponsiveVideoSize();
  const responsiveSectionDimensions = getResponsiveSectionDimensions();
  const responsiveImageSize = getResponsiveImageSize();
  const subdescHeight = getResponsiveSubdescHeight();
  const currentVideoUrl = getCurrentVideoUrl();
  const currentPlaceholder = getCurrentPlaceholder();

  return (
    <div className="min-h-screen pt-20 mb-24" style={{ backgroundColor: "var(--color-primary)" }}>
      <section
        className="non-code-projects"
        id="non-code-projects"
      >
        <div
          style={{
            height: responsiveSectionDimensions.height,
            width: responsiveSectionDimensions.width,
          }}
        >
          <div className="projects-header-text">
            <p className={screenWidth > 640 ? "text-xl" : "text-lg"}>Non-Code Projects</p>
          </div>
          
          <div
            className="noncode-projects-main-container"
            style={{
              height: responsiveSectionDimensions.height,
              width: responsiveSectionDimensions.width,
              backgroundColor: "var(--projects-bg-secondary)"
            }}
          >
            <div className="p-1 flex-1 w-full">
              <div
                ref={carouselRef}
                className="projects-image-carousel"
              >
                {Object.keys(currentProject)
                  .filter((key) => key.startsWith("previewImg"))
                  .map((key, index) => (
                    <div
                      key={index}
                      className="noncode-img-item inline-block align-top mr-2.5"
                      style={{
                        width: responsiveImageSize.width,
                        position: "relative",
                      }}
                      onClick={() => handleImageClick(index)}
                    >
                      <AspectRatioImage
                        src={currentProject[key]}
                        alt={`${currentProject.title} screenshot ${index + 1}`}
                      />
                    </div>
                  ))}
                  
                {/* Video Section */}
                {currentVideoUrl && (
                  <div 
                    className="noncode-video-container" 
                    style={{ width: responsiveVideoSize.width }}
                  >
                    <div className="noncode-video-wrapper relative">
                      {/* Video Element */}
                      <video
                        ref={videoRef}
                        key={`${selectedProjectIndex}-${currentVideoIndex}`}
                        className="noncode-video-element"
                        autoPlay
                        loop
                        playsInline
                        muted={isMuted}
                        preload="metadata"
                        onLoadStart={handleVideoLoadStart}
                        onProgress={handleVideoProgress}
                        onCanPlay={handleVideoCanPlay}
                        onCanPlayThrough={handleVideoCanPlay}
                        onError={handleVideoError}
                        style={{ 
                          display: isLoading ? 'none' : 'block',
                          width: '100%',
                          height: '100%'
                        }}
                      >
                        <source src={currentVideoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>

                      {/* Loading Overlay */}
                      {isLoading && (
                        <div 
                          className="absolute inset-0 flex items-center justify-center"
                          style={{ 
                            height: responsiveVideoSize.height,
                            backgroundImage: currentPlaceholder ? `url(${currentPlaceholder})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundColor: currentPlaceholder ? 'transparent' : 'white'
                          }}
                        >
                          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                          <div className="relative z-10">
                            <PercentageLoadingCircle 
                              percentage={loadingProgress}
                              size={80} 
                              text="Loading video content..." 
                              textSize="text-lg"
                              color="#ffffff"
                              className="text-white"
                            />
                          </div>
                        </div>
                      )}

                      {/* Video Error */}
                      {videoError && (
                        <div 
                          className="absolute inset-0 flex items-center justify-center bg-gray-800"
                          style={{ height: responsiveVideoSize.height }}
                        >
                          <div className="text-center text-white">
                            <p className="text-lg mb-2">Video failed to load</p>
                            <button 
                              onClick={() => {
                                setVideoError(false);
                                setIsLoading(true);
                                setLoadingProgress(0);
                                if (videoRef.current) {
                                  videoRef.current.load();
                                }
                              }}
                              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                              Retry
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Mute Button */}
                      {!isLoading && !videoError && hasMultipleVideos() && currentVideoIndex === 1 && (
                        <button
                          onClick={() => {
                            setIsMuted(!isMuted);
                            if (videoRef.current) {
                              videoRef.current.muted = !isMuted;
                            }
                          }}
                          className="noncode-mute-button"
                        >
                          {isMuted ? "Click for sound" : "Mute"}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="project-header-row">
                <p className={`project-title-text ${screenWidth > 1024 ? "text-2xl" : "text-xl"}`}>
                  {currentProject.title}
                </p>
                <div className="noncode-link-container">
                  {hasMultipleVideos() && !isLoading && (
                    <button
                      onClick={handleVideoSwitch}
                      className="project-link-button noncode-button"
                    >
                      {currentVideoIndex === 0 ? (
                        <>
                          Behind the scenes video <GoArrowUpRight className="project-link-icon" />
                        </>
                      ) : (
                        <>
                          Back to Parallax <GoArrowLeft className="project-link-icon" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
              
              <p className={`project-description-text ${screenWidth > 768 ? "md:text-lg lg:text-lg" : "text-sm"} ${screenWidth > 640 ? "sm:text-base" : ""}`}>
                {currentProject.desc}
              </p>
              
              <div
                className={`noncode-subdesc-content project-subdesc-content ${screenWidth > 768 ? "md:text-lg lg:text-lg" : "text-sm"} ${screenWidth > 640 ? "sm:text-base" : ""}`}
                dangerouslySetInnerHTML={{ __html: currentProject.subdesc }}
                style={{ height: subdescHeight }}
              ></div>
              
              <div className="project-tag-container">
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
                {otherProjects.map((_, index) => (
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

          {/* Link to code projects */}
          <div className="w-full flex justify-center mt-4">
            <Link 
              to="/#projects"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
                setTimeout(() => {
                  const projectsSection = document.querySelector('#projects');
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
              className="noncode-back-link"
            > 
              <div className="noncode-back-arrow">
                <HorizontalArrow direction="left" />
              </div>
              <span className="noncode-back-text">
                Code Projects
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NonCodeProjects;