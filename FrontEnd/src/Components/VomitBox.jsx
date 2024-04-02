import React from "react";
import Moment from "react-moment";

export default function VomitBox({post}) {
  return (
    <div id="VomitBox">
      <div id="PhotoOfPost">
        <img src="account_box.png" alt="" />
      </div>
      <div id="usernameAndPost">
        <div id="usernameAndTime">
          <h4>Someone</h4>
          <span>• {" "}
          <Moment fromNow interval={30}>
                {post?.createdAt}
              </Moment>
          </span>
        </div>
        <div id="PostText">
        {post?.text}
        </div>
      </div>
    </div>
  );
}
