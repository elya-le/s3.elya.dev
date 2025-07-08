import React from "react";
import { CiStar } from "react-icons/ci";
import { PiCopyrightLight } from "react-icons/pi";

const Footer = () => {
  return (
    <div className="footer-container">
      <footer className="footer">
        <p className="footer-text">
          {/* copyright icon */}
          <span className="footer-icon">
            <PiCopyrightLight />
          </span>

          {/* text content */}
          <span className="footer-content">
            {new Date().getFullYear()}{" "}
            <a 
              href="https://www.elya.dev" 
              className="footer-link"
            >
              Elya.dev
            </a>{" "}
            — Designed & built by me, Elya
          </span>

          {/* star icon */}
          <span className="footer-icon">
            <CiStar />
          </span>
        </p>
      </footer>
    </div>
  );
};

export default Footer;