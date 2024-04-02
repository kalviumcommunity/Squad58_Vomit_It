import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import LoginInputs from "./LoginInputs";
import {  Link, useNavigate } from "react-router-dom";
import axios from "axios";
import VomitLoader from "./VomitLoader";
import Cookies from "js-cookie";
const loginInfos = {
    email: "",
    password: "",
  };

export default function LoginComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, setLogin] = useState(loginInfos);
    const [loading, setLoading] = useState(false)
    const { email, password } = login;

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
      };
      const loginValidation= Yup.object({
        email:Yup.string().required("Email Address is required").email("Must be a valid email"),
        password:Yup.string().required("Password is required"),
      })
      const [error,setError] = useState("")
      


      const loginSubmit= async()=>{
        try {
       const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`,
          {
            email,
            password,
          });
          dispatch({type:"LOGIN", payload:data});
          Cookies.set("user", JSON.stringify(data));
          setLoading(false)
          navigate("/home")
        } catch (error) {
          setError(error.response.data.message);
          setLoading(false)
        }
        };

  return (
    <>
    {
      loading && <VomitLoader/>
    }
    <Formik
    enableReinitialize
    initialValues={{
      email,
      password,
    }}
    validationSchema ={loginValidation}
    onSubmit={()=>{
      loginSubmit();
      setLoading(true)
    }}
  >
    {(formik) => (
      <Form id="LoginForm" action="#">
        <h2>Log In</h2>
        <LoginInputs
          type="text"
          name="email"
          placeholder="Email address"
          onChange={handleLoginChange}
        />
        <LoginInputs
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleLoginChange}
        />
        <h6 id="forgotPass">
          <span to="/reset">Forgot your password?</span>
        </h6>
        <button type="submit" id="LogInBtn">
          Sign In
        </button>
        {error && <div id='errorTextSignIn'>{error}</div>}
        
        
      </Form>
    )}
  </Formik>
  </>
  )
}
