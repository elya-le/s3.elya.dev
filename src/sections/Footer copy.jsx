import React from "react";

const Footer = () => {
  return (
    <div style={{ backgroundColor: "#191B00" }}> {/* Margin background container */}
      <footer
        className="text-white py-4 text-center"
        style={{
          backgroundColor: "#191B00", // Footer background color
        }}
      >
        <p className="text-sm font-thin">
          © {new Date().getFullYear()}{" "}
          <a href="https://www.elya.dev" className="underline">
            Elya.Dev
          </a>{" "}
          — Designed and built by me, Elya
        </p>
      </footer>
    </div>
  );
};

export default Footer;
