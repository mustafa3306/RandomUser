import React from "react";
import "./Footer.css";


const Footer = () => {
  return (
    <div className="footer-div">
      <a
        href="https://github.com/mustafa3306?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
        <code className="brand">{"Click to see more react projects on my Github"}</code>
      </a>
    </div>
  );
};

export default Footer;