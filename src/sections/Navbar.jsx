import React, { useState, useEffect, useRef } from "react";
import { navLinks } from "../constants/index.js"; // ensure this is correctly imported
import { TfiLoop } from "react-icons/tfi";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(""); // track active link
  const [isMenuOpen, setIsMenuOpen] = useState(false); // track menu open state
  const [isTransparent, setIsTransparent] = useState(true); // track transparency state
  const [displayText, setDisplayText] = useState("Elya"); // dynamic text for logo (no initial underscore here)
  const [isTyping, setIsTyping] = useState(false); // track typing animation
  const [isFlashing, setIsFlashing] = useState(true); // track flashing underscore state
  const heroRef = useRef(null);

  // typing animation variables
  const words = ["Full Stack Developer", "Motion Designer", "Fabricator", "3D Artist"];  
  const typingSpeed = 70; // milliseconds per character
  const delayBetweenWords = 2000; // delay before next word starts typing
  const cursorDelay = 500; // delay before showing cursor
  const flashDuration = 2000; // 2 seconds before typing starts

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTransparent(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  const typeWords = async () => {
    // flash underscore for 2 seconds before starting typing
    setTimeout(() => setIsFlashing(false), flashDuration);

    // wait for the flash duration before starting to type words
    await new Promise((resolve) => setTimeout(resolve, flashDuration));

    // Add the dash after the flashing is done
    setDisplayText("Elya —");

    // start typing words after the flash duration
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      setIsTyping(true);

      // typing effect
      for (let j = 0; j <= word.length; j++) {
        await new Promise((resolve) => {
          setTimeout(() => {
            setDisplayText(`Elya — ${word.substring(0, j)}`); // remove underscore during typing
            resolve();
          }, typingSpeed);
        });
      }

      setIsTyping(false);

      // pause after word is typed
      await new Promise((resolve) => {
        setTimeout(resolve, delayBetweenWords);
      });

      // erase effect
      for (let j = word.length; j >= 0; j--) {
        await new Promise((resolve) => {
          setTimeout(() => {
            setDisplayText(`Elya — ${word.substring(0, j)}`); // remove underscore during erasing
            resolve();
          }, typingSpeed / 2);
        });
      }
    }

    // stop after one loop, type out "Full Stack Developer"
    setIsTyping(true);

    const finalText = "Full Stack Developer ";
    // typing effect for the final "Full Stack Developer"
    for (let i = 0; i <= finalText.length; i++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          setDisplayText("Elya — " + finalText.substring(0, i)); // typing the final text
          resolve();
        }, typingSpeed);
      });
    }

    setIsTyping(false);

    // add delay before showing the icon
    setTimeout(() => {
      setDisplayText([
        "Elya — Full Stack Developer ",
        <TfiLoop key="loop-icon" className="inline-block ml-1" style={{ marginBottom: "3px", fontSize: "15px" }} />,
      ]);
    }, 200); // 1-second delay before showing the icon
  };

  useEffect(() => {
    typeWords(); // Initial typing effect

    // cleanup timeouts on unmount
    return () => {
      clearTimeout();
    };
  }, []); // Empty dependency array ensures the effect runs only once after the initial mount

  const handleClick = (e, href) => {
    e.preventDefault();
    setActiveLink(href);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" }); // smooth scroll to section
    }
    setIsMenuOpen(false); // close menu after clicking a link
    typeWords(); // Restart typing animation when logo is clicked
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div ref={heroRef} id="hero"></div> {/* add this div to mark the Hero section */}
      <nav
        className={`fixed top-0 left-0 w-full text-white py-2 md:py-3 px-6 z-50 transition-all duration-300 ${
          isTransparent
            ? "bg-transparent border-transparent"
            : "bg-[#191B00] border-b border-white border-opacity-10"
        }`}
      >
        {/* container for E and menu/hamburger */}
        <div className="flex justify-between items-center">
          {/* 'E' icon with typing effect */}
          <a href="#home" onClick={(e) => handleClick(e, "#home")} className="logo">
            <span>{displayText}</span>
            {isFlashing && displayText === "Elya" && <span className="flashing-underscore">_</span>}
          </a>

          {/* hamburger menu (hidden on desktop) */}
          <button className="md:hidden text-white m-0 pb-1 flex items-center justify-center" onClick={toggleMenu}>
            {isMenuOpen ? "✕" : "☰"}
          </button>

          {/* links for desktop (hidden on mobile) */}
          <ul className="hidden md:flex space-x-4 items-center ml-auto">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`px-4 py-2 ${
                    activeLink === link.href
                      ? "text-white"
                      : "text-white opacity-80"
                  } hover:text-white hover:opacity-100`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* links for mobile view (toggleable) */}
        <ul
          className={`${
            isMenuOpen ? "block text-right mt-4" : "hidden"
          } md:hidden`}
        >
          {navLinks.map((link) => (
            <li key={link.id} className="my-2">
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`px-4 py-2 ${
                  activeLink === link.href
                    ? "text-white"
                    : "text-white opacity-80"
                } hover:text-white hover:opacity-100`}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
