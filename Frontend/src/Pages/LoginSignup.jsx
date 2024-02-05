import React, { useState } from "react";
import "./LoginSignup.css";
import SignupComponent from "../Components/SignupComponent";
import LoginComponent from "../Components/LoginComponent";

export default function LoginSignup() {
  const [showSignUp, setshowSignUp] = useState(false);

  return (
    <div id="LoginSignUp">
      <div id="Register">
        {!showSignUp && (
          <div id="RegisterClickable" onClick={() => setshowSignUp(true)}>
            <h2>Not a memeber yet ?</h2>
            <h3>Click here to Sign Up.</h3>
          </div>
        )}
        <SignupComponent />
      </div>
      <hr id="hrbetweenSignUpAndSignIn" />
      <div id="SignIn">
        {showSignUp && (
          <div id="LogInClICKABLE" onClick={() => setshowSignUp(false)}>
            <h2>Already a member ?</h2>
            <h3>Click here to LogIn.</h3>
          </div>
        )}
        <LoginComponent />
      </div>
    </div>
  );
}
