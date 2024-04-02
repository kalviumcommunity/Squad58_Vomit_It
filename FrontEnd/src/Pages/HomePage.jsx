import React from "react";
import "./HomePage.css";
import { Link, useNavigate } from "react-router-dom";

export default function HomePage() {
	const navigate = useNavigate();
  return (
    <div id="HomePageBoss">
      <h1 id="TitleVomit">VOMIT</h1>
      <h5 id="Subline">Express freely - we've got your back.</h5>
      <div id="RegisterAndSignUp">
        <div id="registerBtn"  onClick={() => navigate("/login")}>Register</div>
        <div id="Loginbtn"    onClick={() => navigate("/login")}>Login</div>
      </div>

      <div class="slider">
	<div class="slide-track">
		<div class="slide">
			<img src="rainbow.png" height="100"  alt="" />
		</div>
		<div class="slide">
			<img src="rainbow.png" height="100"  alt="" />
		</div>
		<div class="slide">
			<img src="rainbow.png" height="100"  alt="" />
		</div>
		<div class="slide">
			<img src="rainbow.png" height="100"  alt="" />
		</div>
		<div class="slide">
			<img src="rainbow.png" height="100"  alt="" />
		</div>
		<div class="slide">
			<img src="rainbow.png" height="100"  alt="" />
		</div>
		<div class="slide">
			<img src="rainbow.png" height="100"  alt="" />
		</div>
		<div class="slide">
			<img src="rainbow.png" height="100"  alt="" />
		</div>
		<div class="slide">
    <img src="rainbow.png" height="100"  alt="" />
		</div>
		<div class="slide">
    <img src="rainbow.png" height="100"  alt="" />
		</div>
		<div class="slide">
    <img src="rainbow.png" height="100"  alt="" />
		</div>
		<div class="slide">
    <img src="rainbow.png" height="100"  alt="" />
		</div>
		<div class="slide">
    <img src="rainbow.png" height="100"  alt="" />
		</div>
		<div class="slide">
    <img src="rainbow.png" height="100"  alt="" />
		</div>
	</div>
</div>


    </div>
  );
}
