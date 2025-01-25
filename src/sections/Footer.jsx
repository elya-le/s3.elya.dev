import React from "react";
import { CiStar } from "react-icons/ci";

const Footer = () => {
  return (
    <div style={{ backgroundColor: "#191B00" }}> {/* Margin background container */}
      <footer
        className="text-white py-4 text-center pb-10"
        style={{
          backgroundColor: "#191B00", // Footer background color
        }}
      >
        <p className="text-sm font-thin">
          © {new Date().getFullYear()}{" "}
          <a href="https://www.elya.dev" className="underline">
            www.elya.dev
          </a>{" "}
          — Designed & built by me, Elya <span style={{ display: "inline-flex", alignItems: "center" }}><CiStar /></span>
        </p>
      </footer>
    </div>
  );
};

export default Footer;
