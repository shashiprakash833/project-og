import React from "react";
import "./BrandLogo.css";

export default function BrandLogo({ className = "" }) {
  return (
    <img
      src="/images/brand/og-logo.png"
      alt="The OG"
      className={`brand-logo ${className}`}
    />
  );
}