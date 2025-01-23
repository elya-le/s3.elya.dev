import { useState, useEffect, useRef } from "react";
import { navLinks } from "../constants/index.js";

const NavItems = ({ onClick = () => {} }) => (
  <ul className="nav-ul">
    {navLinks.map((item) => (
      <li key={item.id} className="nav-li">
        <a
          href={item.href}
          className="nav-li_a"
          onClick={(e) => {
            e.preventDefault(); // prevent default link behavior
            const targetElement = document.querySelector(item.href);
            const navbarHeight = document.querySelector("header").offsetHeight; // get navbar height
            window.scrollTo({
              top: targetElement.offsetTop - navbarHeight, // adjust scroll position by navbar height
              behavior: "smooth", // smooth scroll to section
            });
            onClick(); // close the menu after clicking on mobile
          }}
        >
          {item.name}
        </a>
      </li>
    ))}
  </ul>
);

const Navbar = ({ animationName, toggleAnimation }) => {
  const [isOpen, setIsOpen] = useState(false); // state for menu
  const [isVisible, setIsVisible] = useState(true); // state for navbar visibility
  const [activeSection, setActiveSection] = useState(""); // track the active section
  const aboutSectionRef = useRef(null); // ref for "About" section
  const projectsSectionRef = useRef(null); // ref for "Projects" section

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset; // get current scroll position

      // hide navbar when scrolling down, show when scrolling up
      setIsVisible(
        currentScrollPos <= 0 || currentScrollPos < document.body.scrollTop
      );

      document.body.scrollTop = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // cleanup on unmount
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id); // set active section
          }
        });
      },
      { threshold: 0.5 } // trigger when 50% of the section is visible
    );

    // observe the "About" and "Projects" sections
    if (aboutSectionRef.current) observer.observe(aboutSectionRef.current);
    if (projectsSectionRef.current) observer.observe(projectsSectionRef.current);

    return () => observer.disconnect(); // cleanup observer on unmount
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{
        backgroundColor: "#262900",  // Set any color you prefer
        transition: "background-color 0.3s ease",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          {/* logo */}
          <a href="/" className="text-white text-xl hover:text-white transition-colors">
            Elya_
          </a>

          {/* navigation */}
          <nav className="sm:flex hidden">
            <NavItems />
          </nav>

          {/* mobile menu toggle */}
          <button
            onClick={toggleMenu}
            className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
            aria-label="Toggle menu"
          >
            <img
              src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
              alt="toggle"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>

      {/* mobile Sidebar */}
      <div className={`nav-sidebar ${isOpen ? "max-h-screen" : "max-h-0"}`}>
        <nav className="p-5">
          <NavItems onClick={closeMenu} />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
