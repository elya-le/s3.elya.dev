import React, { useState, useEffect, useRef } from "react";
import { GoArrowUpRight, GoArrowUpLeft, GoArrowLeft, GoArrowRight } from "react-icons/go";
import { otherProjects } from "../constants/index.js";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "/src/awsConfig.js";
import AspectRatioImage from "./AspectRatioImage";
import { Link, useNavigate } from 'react-router-dom';
import HorizontalArrow from "./HorizontalArrow";

const NonCodeProjects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [videoSources, setVideoSources] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPlaceholder, setCurrentPlaceholder] = useState('');
  const videoRef = useRef(null);
  const currentProject = otherProjects[selectedProjectIndex];
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle video loading and cleanup
  useEffect(() => {
    setIsLoading(true);
    
    videoSources.forEach(src => {
      if (src) URL.revokeObjectURL(src);
    });
    setVideoSources([]);
    setCurrentVideoIndex(0);

    const fetchVideos = async () => {
      if (currentProject.videos) {
        // Set initial placeholder immediately
        if (currentProject.videos[0]?.placeholder) {
          setCurrentPlaceholder(currentProject.videos[0].placeholder);
        }

        const sources = await Promise.all(
          currentProject.videos.map(async (video) => {
            try {
              const videoBody = await getVideoFromS3(video.url);
              return videoBody ? URL.createObjectURL(videoBody) : null;
            } catch (error) {
              console.error("Error fetching video:", error);
              return null;
            }
          })
        );
        setVideoSources(sources.filter(Boolean));
        setIsLoading(false);
      } else if (currentProject.videoLink) {
        try {
          const videoBody = await getVideoFromS3(currentProject.videoLink);
          if (videoBody) {
            setVideoSources([URL.createObjectURL(videoBody)]);
          }
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching video:", error);
          setIsLoading(false);
        }
      }
    };

    fetchVideos();

    return () => {
      videoSources.forEach(src => {
        if (src) URL.revokeObjectURL(src);
      });
    };
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

  const handleVideoSwitch = () => {
    if (videoSources.length > 1) {
      const nextIndex = (currentVideoIndex + 1) % videoSources.length;
      setCurrentVideoIndex(nextIndex);
      // Update placeholder when switching videos
      if (currentProject.videos[nextIndex]?.placeholder) {
        setCurrentPlaceholder(currentProject.videos[nextIndex].placeholder);
      }
      setIsLoading(true);
    }
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

  const getVideoFromS3 = async (key) => {
    try {
      const cleanKey = key.replace('https://s3.us-east-2.amazonaws.com/elya.dev/', '');
      const command = new GetObjectCommand({ 
        Bucket: "elya.dev", 
        Key: cleanKey
      });
      const response = await s3Client.send(command);
      const blob = await response.Body.transformToByteArray();
      return new Blob([blob], { type: 'video/mp4' });
    } catch (error) {
      console.error("Error fetching video:", error);
      return null;
    }
  };

  const responsiveVideoSize = getResponsiveVideoSize();
  const responsiveSectionDimensions = getResponsiveSectionDimensions();
  const responsiveImageSize = getResponsiveImageSize();
  const subdescHeight = getResponsiveSubdescHeight();

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
                  
                {videoSources.length > 0 && (
                  <div 
                    className="noncode-video-container" 
                    style={{ width: responsiveVideoSize.width }}
                  >
                    <div className="noncode-video-wrapper">
                      <video
                        ref={videoRef}
                        key={videoSources[currentVideoIndex]}
                        className="noncode-video-element"
                        autoPlay
                        loop
                        playsInline
                        muted={isMuted}
                      >
                        <source src={videoSources[currentVideoIndex]} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      {currentVideoIndex === 1 && (
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
                  {videoSources.length > 1 && (
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