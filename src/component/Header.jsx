import React from "react";
import "./header.css";

const Header = () => {
  return (
    <div className="header_container">
      <div className="header_logo">
        <img
          src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1630925990126x804751725504911700%2Ft%2520ibe%2520%25281%2529.png?w=192&h=85&auto=compress&fit=crop&dpr=1"
          alt="logo"
          className="header_logo_img"
        />

        <span className="header_logo_text"></span>
      </div>
    </div>
  );
};

export default Header;