import React, { useState } from "react";
import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import About from "./sections/About";
import Contact from "./sections/ContactForm.jsx";
import NonCodeProjects from "./sections/NonCodeProjects"; 
import Footer from "./sections/Footer.jsx";
import "./index.css"; // Import your global CSS file

const App = () => {
  const [animationName, setAnimationName] = useState("Slow"); // manage animation state

  // toggle animation state
  const toggleAnimation = () => {
    const nextAnimation = animationName === "Slow" ? "Fast" : "Slow";
    setAnimationName(nextAnimation);
    console.log("Animation toggled to:", nextAnimation); // log the next state
  };

  return (
    <>
      <Navbar animationName={animationName} toggleAnimation={toggleAnimation} />
      <Hero animationName={animationName} toggleAnimation={toggleAnimation} />
      <About />
      <Projects />
      <Contact />
      <NonCodeProjects />
      <Footer />
    </>
  );
};

export default App;