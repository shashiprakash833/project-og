import React from "react";
import "./BrandLogo.css";

export default function BrandLogo({ className = "", theme = "dark" }) {
  return (
    <div className={`brand-logo-container ${theme} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="brand-logo-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="50%"
          y="32"
          textAnchor="middle"
          className="brand-text-the"
        >
          The
        </text>
        <text
          x="50%"
          y="82"
          textAnchor="middle"
          className="brand-text-og"
        >
          OG
        </text>
      </svg>
    </div>
  );
}
