import React, { useState } from "react";
import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import About from "./sections/About";
import FormSpree from "./sections/FormSpree.jsx";  
import NonCodeProjects from "./sections/NonCodeProjects"; 
import Footer from "./sections/Footer.jsx";
import "./index.css"; // import your global CSS file

const App = () => {
  const [animationName, setAnimationName] = useState("Slow"); // manage animation state

  // toggle animation state
  const toggleAnimation = () => {
    const nextAnimation = animationName === "Slow" ? "Fast" : "Slow";
    setAnimationName(nextAnimation);
    console.log("Animation toggled to:", nextAnimation); // log the next state
  };

  return (
    <div className="App">
    <Navbar />
    <main>
      <Hero animationName={animationName} toggleAnimation={toggleAnimation} />
      <About animationName={animationName} toggleAnimation={toggleAnimation} />
      <Projects />
      <FormSpree />
      <NonCodeProjects />
    </main>
    <Footer />
  </div>
  );
};

export default App;
