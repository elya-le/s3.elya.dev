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
    // Cleanup previous video URLs
    videoSources.forEach(src => {
      if (src) URL.revokeObjectURL(src);
    });
    setVideoSources([]);
    setCurrentVideoIndex(0);

    const fetchVideos = async () => {
      if (currentProject.videos) {
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
      } else if (currentProject.videoLink) {
        // Handle legacy single video format
        try {
          const videoBody = await getVideoFromS3(currentProject.videoLink);
          if (videoBody) {
            setVideoSources([URL.createObjectURL(videoBody)]);
          }
        } catch (error) {
          console.error("Error fetching video:", error);
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
      setCurrentVideoIndex((prev) => 
        (prev + 1) % videoSources.length
      );
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
    <div className="min-h-screen bg-[var(--bg-primary)] pt-20 mb-24">
      <section
        className="non-code-projects relative z-10 flex flex-col justify-center items-center bg-transparent px-4 py-2 pb-5"
        id="non-code-projects"
      >
        <div
          style={{
            height: responsiveSectionDimensions.height,
            width: responsiveSectionDimensions.width,
          }}
        >
          <div className="w-full text-left mb-2 pl-3 sm:pl-6 sm:mb-4">
            <p className="text-white text-lg sm:text-xl font-thin">Non-Code Projects</p>
          </div>
          <div
            className="relative bg-opacity-80 flex flex-col justify-center bg-[var(--bg-primary)] h-[responsiveSectionDimensions.height] w-[responsiveSectionDimensions.width] p-2 lg:p-5 md:p-4 sm:px-2 sm:py-4"
            style={{ backgroundColor: "var(--bg-secondary)" }}
          >
            <div className="p-1 flex-1 w-full">
              <div
                ref={carouselRef}
                className="whitespace-nowrap overflow-x-auto hide-scrollbar"
                style={{ overflowX: "scroll", overflowY: "hidden", cursor: "pointer" }}
              >
                {Object.keys(currentProject)
                  .filter((key) => key.startsWith("previewImg"))
                  .map((key, index) => (
                    <div
                      key={index}
                      className="inline-block align-top mr-2.5"
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
                    className="video-container mt-4 inline-block" 
                    style={{ width: responsiveVideoSize.width }}
                  >
                    <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                      <video
                        ref={videoRef}
                        key={videoSources[currentVideoIndex]}
                        className="absolute inset-0 w-full h-full"
                        autoPlay
                        loop
                        playsInline
                        muted={isMuted}
                        style={{ objectFit: 'cover' }}
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
                          className="absolute bottom-4 right-4 px-3 py-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all"
                        >
                          {isMuted ? "Click for sound" : "Mute"}
                        </button>
                      )}
                    </div>
                  
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex justify-between items-center w-full">
                <p
                  className={`text-white font-medium ${
                    screenWidth > 1024 ? "text-2xl" : "text-xl"
                  }`}
                >
                  {currentProject.title}
                </p>
                <div className="links flex gap-2">
                  {videoSources.length > 1 && (
                    <button
                      onClick={handleVideoSwitch}
                      className="text-white text-sm inline-flex items-center border border-white rounded-full pl-4 pr-3 py-1.5 transition-colors hover:bg-[var(--bg-button-hover)] bg-[#4C5200]"
                    >
                      {currentVideoIndex === 0 ? (
                        <>
                          Behind the scenes video <GoArrowUpRight className="text-lg font-thin ml-1" />
                        </>
                      ) : (
                        <>
                          Back to Parallax <GoArrowLeft className="text-lg font-thin ml-1" />
                        </>
                      )}
                    </button>
                  )}
                  {currentProject.repoLink && currentProject.title === "Current Portfolio Site" ? (
                    <a
                      href={currentProject.repoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-sm inline-flex items-center border border-white rounded-full pl-4 pr-3 py-1.5 transition-colors hover:bg-[var(--bg-button-hover)] bg-[#4C5200]"
                    >
                      Github <GoArrowUpRight className="text-lg font-thin ml-1" />
                    </a>
                  ) : currentProject.liveLink ? (
                    <a
                      href={currentProject.liveLink}
                      onClick={(e) => handleLiveLinkClick(e, currentProject.liveLink)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-sm inline-flex items-center border border-white rounded-full pl-4 pr-3 py-1.5 transition-colors hover:bg-[var(--bg-button-hover)] bg-[#4C5200]"
                    >
                      Live Link <GoArrowUpRight className="text-lg font-thin ml-1" />
                    </a>
                  ) : null}
                </div>
              </div>
              
              <p className="mt-2 text-white font-thin text-sm sm:text-base md:text-lg lg:text-lg">
                {currentProject.desc}
              </p>
              <div
                className="subdesc mt-4 text-sm sm:text-base md:text-lg lg:text-lg"
                dangerouslySetInnerHTML={{ __html: currentProject.subdesc }}
                style={{ height: subdescHeight }}
              ></div>
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
            <div className="flex justify-between items-center px-1 pb-1 w-full">
              <button
                className="text-lg flex items-center"
                onClick={() => handleNavigation("previous")}
              >
                <GoArrowLeft className="ml-1 text-white transition-colors" />
              </button>
              <div className="flex gap-2">
                {otherProjects.map((_, index) => (
                  <span
                    key={index}
                    className={`w-2 h-2 rounded-full border ${
                      index === selectedProjectIndex ? "bg-white border-white" : "border-white"
                    }`}
                  ></span>
                ))}
              </div>
              <button
                className="text-lg flex items-center"
                onClick={() => handleNavigation("next")}
              >
                <GoArrowRight className="mr-1 text-grey transition-colors" />
              </button>
            </div>
          </div>
          {/* Link to ode projects */}
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
              className="text-white text-lg sm:text-xl font-thin hover:opacity-80 transition-opacity duration-300 inline-flex items-center gap-4 p-4 -ml-9"
            > 
              <div className="w-24 h-8 flex items-center justify-center mt-2">
                <HorizontalArrow direction="left" />
              </div>
              <span className="underline decoration-[0.5px] underline-offset-4 -ml-3">
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