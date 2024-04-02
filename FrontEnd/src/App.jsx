import "./App.css";
import HomePage from "./Pages/HomePage";
import AnimatedCursor from "react-animated-cursor";
import LoginSignup from "./Pages/LoginSignup";
import FeedPage from "./Pages/FeedPage/FeedPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import { useSelector } from "react-redux";
import { useEffect, useReducer } from "react";
import { postsReducer } from "./functions/reducer";
import axios from "axios";
import Cookies from 'js-cookie';

function App() {

  const navigate = useNavigate();
  const {user} = useSelector((state)=> ({ ...state}));
  const [{loading, error, posts},dispatch] = useReducer(postsReducer,{
    loading: false,
    posts: [],
    error: "",
  });


  useEffect(()=>{
    getAllPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user])


    //Gettinbg all Post
  const getAllPosts = async()=>{
    try {
     
      dispatch({
        type:"POST_REQUEST",
      });
      
         const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getAllPosts`,{
          headers:{
          Authorization: `Bearer ${user.token}`,
        }
         });
         dispatch({
           type:"POST_SUCCESS",
           payload: data,
         });
    } catch (error) {
      if(error.response.data === "Invalid Authentication")
      console.log("sahi hai bahai")
      
      dispatch({
        type:"POST_ERROR",
        payload: error.response.data.message,
      });
      logout()
    }
  }

  const logout =()=>{
    Cookies.set("user", "")
  dispatch({
    type:'LOGOUT',
  });
  navigate("/");
  }



  return (
    <>
      <AnimatedCursor
        innerSize={12}
        outerSize={8}
        color="255, 255, 255"
        outerAlpha={0.2}
        innerScale={2}
        outerScale={6}
      />

      {/* <VomitLoader/> */}

      <Routes>
        <Route element={<NotLoggedInRoutes />}>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<LoginSignup />} />
        </Route>


        <Route element={<LoggedInRoutes />}>
          <Route exact path="/home" element={<FeedPage posts={posts} />} />
          <Route exact path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
