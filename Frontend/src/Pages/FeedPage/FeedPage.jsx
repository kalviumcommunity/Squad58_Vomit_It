import React, { useState } from "react";
import "./FeedPage.css";
import { FaUserCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import { GiVomiting } from "react-icons/gi";
import { IoLogOut } from "react-icons/io5";
import PostVomit from "../../Components/PostVomit";
import VomitBox from "../../Components/VomitBox";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";

export default function ({posts}) {
  const [showFeedPost, setshowFeedPost] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    Cookies.set("user", "");
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };



  return (
    <>
      {showFeedPost && <PostVomit setshowFeedPost={setshowFeedPost} />}
      <div id="feedpageBoss">
        <nav id="Navbar">
          <h2>Vomit</h2>
        </nav>
        <div id="VomitFeed">
          {posts.length === 0 && <FadeLoader id="fadeloader" color="white" />}
          {posts.map((post) => (
            <VomitBox key={post._id} post={post} />
          ))}
          <div id="MenuFeedPage">
            <div onClick={() => navigate("/profile")}>
              <IconContext.Provider
                value={{ color: "black", className: "global-class-name" }}
              >
                <FaUserCircle />
              </IconContext.Provider>
            </div>
            <div id="SettingsBtn" onClick={() => logout()}>
              <IconContext.Provider
                value={{ color: "black", className: "global-class-name" }}
              >
                <IoLogOut />
              </IconContext.Provider>
            </div>
            <div id="VomitBtn" onClick={() => setshowFeedPost(true)}>
              <IconContext.Provider
                value={{ color: "black", className: "global-class-name" }}
              >
                <GiVomiting />
              </IconContext.Provider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
