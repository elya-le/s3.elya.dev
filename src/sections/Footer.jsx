import React from "react";
import { CiStar } from "react-icons/ci";
import { PiCopyrightLight } from "react-icons/pi";

const Footer = () => {
  return (
    <div style={{ backgroundColor: "#191B00" }}> {/* Margin background container */}
      <footer
        className="text-white py-4 text-center pb-10"
        style={{
          backgroundColor: "#191B00", // Footer background color
        }}
      >
        <p
          className="text-sm font-thin flex items-center justify-center gap-1"
          style={{ lineHeight: 1.5 }}
        >
        {/* copyright icon */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            marginBottom: "", // fine-tune the alignment
          }}
        >
        <PiCopyrightLight />
        </span>

        {/* text content */}
        <span style={{ alignItems: "center", paddingBottom: "1px" }}>
        {new Date().getFullYear()}{" "}
        <a href="https://www.elya.dev" className="underline">
          www.elya.dev
        </a>{" "}
          — Designed & built by me, Elya
        </span>

        {/* star icon */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            marginBottom: "", // fine-tune the alignment
          }}
        >
        <CiStar />
        </span>
      </p>
      </footer>
    </div>
  );
};

export default Footer;
