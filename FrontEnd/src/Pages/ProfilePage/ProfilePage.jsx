import React from "react";
import "./ProfilePage.css";
import { IoArrowBack } from "react-icons/io5";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  return (
    <div id="feedpageBoss">
      <nav id="Navbar">
        <h2>Vomit</h2>
      </nav>
      <div id="ProfileMain">
        <div id="BackBtnProfile">
          <div id="ButtonBackBox" onClick={()=>  navigate("/home")}>
          <IconContext.Provider
            value={{ color: "white", className: "global-class-name" }}
          >
            <IoArrowBack />
          </IconContext.Provider>
          </div>
        </div>

        <div id="ProfileDiv">

          <img src="account_box.png" alt="" />

          <h3>Username</h3>

          <h4>vedantyaduvanshi@gmail.com</h4>

        </div>
      </div>
    </div>
  );
}
