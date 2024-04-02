import React, { useRef, useState } from "react";
import "./PostVolume.css";
import { createPost } from "../functions/createPost";
import { useSelector } from "react-redux";
import VomitLoader from "./VomitLoader";

export default function PostVomit({setshowFeedPost}) {

  const {user} = useSelector((user)=>({...user}))
  //Text in the post
  const [text, setText] = useState("");

  //Ref for using emoji in text area
  const textRef = useRef(null);

  //Character Counting
  const [count, setCount] = React.useState(0);

  //Loading state

  const [loading, setLoading] = useState(false);


    const [errorBackend, seterrorBackend] = useState("")

  const postSubmit = async () => {
    var finaltext = text.replace(/(\r\n|\r|\n){2,}/g, "$1\n");
    finaltext = finaltext.trim();
    if (text) {
      if (finaltext === "") {
        seterrorBackend("Vomit Something ..");
        setLoading(false);
      } else if (count > 512) {
        seterrorBackend("Max characters allowed : 512");
        setLoading(false);
      } else {
        const response = await createPost(
          finaltext,
          user.id,
          user.token
        );
        if (response === "ok") {
          setText("");
          setCount(0);
          seterrorBackend("");
          setLoading(false);
          setshowFeedPost(false)
        } else {
          seterrorBackend(response);
          setLoading(false);
        }
      }
    } else {
      seterrorBackend("Vomit Something ..");
      setLoading(false);
    }
  };

  return (
    <>
    {
      loading && <VomitLoader/>
    }
    <div id="JustToBlurinPostVomit">
      <div id="MakeAPostPopUp">
        <img id="closeSection" src="close.png" alt=""  onClick={()=> setshowFeedPost(false)} />
        <textarea
          ref={textRef}
          placeholder="Vomit Here.."
          maxLength="512"
          value={text}
          name=""
          id="textToPost"
          cols="30"
          rows="10"
          onInput={(e) => setCount(e.target.value.length)}
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></textarea>
        <div id="characCount">
          <span>{count}/512</span>
        </div>
        <hr />
        <div id="photosAndEmojiSendButton">
          <button
            onClick={() => {
              setLoading(true);
              postSubmit();
            }}
          >
            Vomit
          </button>
        </div>

        {errorBackend && <div id="Backenderror">{errorBackend}</div>}
      </div>
    </div>
    </>
  );
}
