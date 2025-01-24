import React, { useState } from "react";
import { navLinks } from "../constants/index.js"; // Ensure this is correctly imported

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(""); // Track active link
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track menu open state

  const handleClick = (e, href) => {
    e.preventDefault();
    setActiveLink(href);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to section
    }
    setIsMenuOpen(false); // Close menu after clicking a link
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#191B00] text-white py-4 px-6 z-50">
      <div className="flex justify-between items-center">
        <div className="text-lg">E</div>
        <button
          className="md:hidden text-white"
          onClick={toggleMenu}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>
      <ul className={`md:flex space-x-4 justify-center ${isMenuOpen ? "block text-right" : "hidden"} md:block`}>
        {navLinks.map((link) => (
          <li key={link.id} className="my-2 md:my-0">
            <a
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={`px-4 py-2 ${
                activeLink === link.href ? "text-white" : "text-white opacity-80"
              } hover:text-white hover:opacity-100`}
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
