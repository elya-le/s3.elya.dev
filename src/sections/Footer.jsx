import React from "react";
import { CiStar } from "react-icons/ci";
import { PiCopyrightLight } from "react-icons/pi";

const Footer = () => {
  return (
    <div style={{ backgroundColor: "var(--bg-primary)" }}> {/* Using CSS variable */}
      <footer
        className="text-white py-4 text-center pb-6"
        style={{
          backgroundColor: "var(--bg-primary)", // Using CSS variable
        }}
      >
        <p
          className="text-sm font-thin flex items-center justify-center gap-1"
          style={{ lineHeight: 1.5 }}
        >
          {/* copyright icon */}
          <span className="inline-flex items-center">
            <PiCopyrightLight />
          </span>

          {/* text content */}
          <span className="items-center pb-[1px]">
            {new Date().getFullYear()}{" "}
            <a 
              href="https://www.elya.dev" 
              className="underline hover:text-[var(--bg-secondary-hover)] transition-colors" // Added hover effect using CSS variable
            >
              Elya.dev
            </a>{" "}
            — Designed & built by me, Elya
          </span>

          {/* star icon */}
          <span className="inline-flex items-center">
            <CiStar />
          </span>
        </p>
      </footer>
    </div>
  );
};

export default Footer;