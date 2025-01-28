import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use Routes instead of Switch
import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
// import About from "./sections/About";
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
    <Router> {/* wrap everything in Router */}
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            {/* Home Page (Hero, About, Projects, FormSpree all on the same page) */}
            <Route 
              path="/" 
              element={
                <>
                  <Hero animationName={animationName} toggleAnimation={toggleAnimation} />
                  {/* <About animationName={animationName} toggleAnimation={toggleAnimation} /> */}
                  <Projects />
                  <FormSpree />
                </>
              } 
            />
            
            {/* Non-Code Projects Page (separate page for non-code projects) */}
            <Route path="/non-code-projects" element={<NonCodeProjects />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
