import React, { useState, useEffect, useRef } from "react";
import { GoArrowUpRight, GoArrowLeft, GoArrowRight } from "react-icons/go";
import { otherProjects } from "../constants/index.js";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "/src/awsConfig.js";

const NonCodeProjects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0); // state for current project
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // state to track screen width
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // state for internal image carousel
  const [videoSrc, setVideoSrc] = useState(null);
  const currentProject = otherProjects[selectedProjectIndex]; // get current project data
  const carouselRef = useRef(null); // reference for the internal image carousel

  // update screen width on resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // clean up event listener
  }, []);

  useEffect(() => {
    const fetchVideo = async () => {
      if (currentProject.videoLink) {
        const videoBody = await getVideoFromS3(currentProject.videoLink);
        setVideoSrc(URL.createObjectURL(videoBody));
      }
    };
    fetchVideo();
  }, [currentProject.videoLink]);

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
      return { height: 320, width: 390 };
    } else if (screenWidth > 768) {
      return { height: 350, width: 600 };
    } else {
      return { height: 290, width: 390 };
    }
  };

  const getResponsiveSubdescHeight = () => {
    if (screenWidth > 1024) {
      return "160px";
    } else if (screenWidth > 768) {
      return "390px";
    } else {
      return "140px";
    }
  };

  const getResponsiveVideoSize = () => {
    if (screenWidth > 1024) {
      return { height: "480px", width: "900px" };
    } else if (screenWidth > 768) {
      return { height: "400px", width: "700px" };
    } else {
      return { height: "200px", width: "100%" };
    }
  };
  
  const responsiveVideoSize = getResponsiveVideoSize();
  const responsiveSectionDimensions = getResponsiveSectionDimensions();
  const responsiveImageSize = getResponsiveImageSize();
  const subdescHeight = getResponsiveSubdescHeight();

  const handleImageClick = (index) => {
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
    const command = new GetObjectCommand({ Bucket: "elya.dev", Key: key });
    const response = await s3Client.send(command);
    return response.Body;
  };

  return (
    <div className="min-h-screen bg-[#191B00] pt-20">
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
          className="relative bg-opacity-80 flex flex-col justify-center bg-[#191B00] h-[responsiveSectionDimensions.height] w-[responsiveSectionDimensions.width] p-2 lg:p-5 md:p-4 sm:px-2 sm:py-4"
          style={{ backgroundColor: "#262900" }}
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
                    style={{
                      display: "inline-block",
                      verticalAlign: "top",
                      marginRight: "10px",
                      height: `${responsiveImageSize.height}px`,
                      width: `${responsiveImageSize.width}px`,
                      position: "relative",
                    }}
                    onClick={() => handleImageClick(index)}
                  >
                    <img
                      src={currentProject[key]}
                      alt={`${currentProject.title} screenshot ${index + 1}`}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}

                {videoSrc && (
                  <div className="video-container mt-4" style={{ width: responsiveVideoSize.width }}>
                    <iframe
                      src={`${videoSrc}?autoplay=1&muted=1&loop=1&title=0&byline=0&portrait=0`}
                      width="100%"
                      height={responsiveVideoSize.height}
                      style={{ borderRadius: "8px", border: "none" }}
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}

                {currentProject.videoLink && (
                  <div className="video-container mt-4" style={{ width: responsiveVideoSize.width }}>
                    <iframe
                      src={`${currentProject.videoLink}?autoplay=1&muted=1&loop=1&title=0&byline=0&portrait=0`}
                      width="100%"
                      height={responsiveVideoSize.height}
                      style={{ borderRadius: "8px", border: "none" }}
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    ></iframe>
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
              <div className="links">
                {currentProject.repoLink && currentProject.title === "Current Portfolio Site" ? (
                  <a
                    href={currentProject.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-sm inline-flex items-center border border-white rounded-full pl-4 pr-3 py-1.5 transition-colors hover:bg-[#5F6600] bg-[#4C5200]"
                  >
                    Github <GoArrowUpRight className="text-lg font-thin ml-1" />
                  </a>
                ) : currentProject.liveLink ? (
                  <a
                    href={currentProject.liveLink}
                    onClick={(e) => handleLiveLinkClick(e, currentProject.liveLink)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-sm inline-flex items-center border border-white rounded-full pl-4 pr-3 py-1.5 transition-colors hover:bg-[#5F6600] bg-[#4C5200]"
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
              className="text-lg flex items-center "
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
              className="text-lg flex items-center "
              onClick={() => handleNavigation("next")}
            >
              <GoArrowRight className="mr-1 text-grey transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default NonCodeProjects;
