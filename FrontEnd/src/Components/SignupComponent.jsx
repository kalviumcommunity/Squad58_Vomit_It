import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import SignUpInput from "./SignUpInput";
import { Link, useNavigate } from "react-router-dom";
import VomitLoader from "./VomitLoader";
import Cookies from "js-cookie";
import axios from "axios";

export default function SignupComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userInfos = {
    username: "",
    email: "",
    password: "",
  };
  const [user, setUser] = useState(userInfos);
  const { username, email, password } = user;
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerValidation = Yup.object({
    username: Yup.string()
      .required("⛔You must create your username.")
      .min(4, "🙄Too short , usename must be at least 4 characters")
      .max(13, "😲 Too long, username must be at most 13 characters")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "😬 Spaces and Special characters not allowed!"
      ),
    email: Yup.string()
      .required("🙄Email is required.")
      .email("😐Enter a valid email address."),
    password: Yup.string()
      .required("💪Take your time, set a strong password.")
      .min(9, "☹️Weak , password must be at least 9 characters")
      .max(45, "Password must be at most 45 characters"),
  });

  const registerSubmit = async()=>{
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`,
      {
        username,
        email,
        password
      });
      setError("");
      setSuccess(data.message);
      const {message, ...rest} = data;
      dispatch({type:"LOGIN", payload:rest});
      Cookies.set("user", JSON.stringify(rest));
      setLoading(false)
      navigate("/home")
    } catch (error) {   
      setSuccess("");
      setError(error.response.data.message)
      setLoading(false)
    }
   }

  return (
    <>
      {loading && <VomitLoader />}

      <Formik
        enableReinitialize
        initialValues={{
          username,
          email,
          password,
        }}
        validationSchema={registerValidation}
        onSubmit={() => {
          registerSubmit();
          setLoading(true);
        }}
      >
        {(formik) => (
          <Form id="RegiterForm" action="#">
            <h2>Sign Up</h2>
            <SignUpInput
              onChange={handleRegisterChange}
              type="text"
              placeholder="Create a username"
              name="username"
            />

            <SignUpInput
              onChange={handleRegisterChange}
              type="text"
              placeholder="Email"
              name="email"
            />

            <SignUpInput
              onChange={handleRegisterChange}
              type="password"
              placeholder="Set a Strong Password"
              name="password"
            />

            <button type="submit" id="signupbtn">
              Sign Up
            </button>

            {error && <div id="errorText">{error}</div>}
            {success && <div id="SuccesText">{success}</div>}
          </Form>
        )}
      </Formik>
    </>
  );
}
