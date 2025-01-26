import React, { useState, useEffect, useRef } from "react";
import { navLinks } from "../constants/index.js"; // ensure this is correctly imported

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(""); // track active link
  const [isMenuOpen, setIsMenuOpen] = useState(false); // track menu open state
  const [isTransparent, setIsTransparent] = useState(true); // track transparency state
  const heroRef = useRef(null);

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

  const handleClick = (e, href) => {
    e.preventDefault();
    setActiveLink(href);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" }); // smooth scroll to section
    }
    setIsMenuOpen(false); // close menu after clicking a link
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div ref={heroRef} id="hero"></div> {/* add this div to mark the Hero section */}
      <nav
  className={`fixed top-0 left-0 w-full text-white py-2 md:py-3 px-6 z-50 transition-all duration-300 ${
    isTransparent ? "bg-transparent border-transparent" : "bg-[#191B00] border-b border-white border-opacity-10"
  }`}
>
        {/* container for E and menu/hamburger */}
        <div className="flex justify-between items-center">
          {/* 'E' icon */}
          <a href="#home" onClick={(e) => handleClick(e, "#home")} className="logo">
            <span>Elya</span>
            <span className="flashing-underscore">_</span>
          </a>

          {/* hamburger menu (hidden on desktop) */}
          <button
            className="md:hidden text-white"
            onClick={toggleMenu}
          >
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