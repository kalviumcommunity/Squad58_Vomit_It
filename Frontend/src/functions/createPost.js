import axios from "axios";

export const createPost = async(
    text,
    user,
    token
    )=>{
    try {
        const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/createPost`,{
            text,
            user,
        },
        {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        });
        console.log(data)
        return "ok";
    } catch (error) {
        return  error.response.data 
        // JSON.stringify(error.response.data);
    }
   };


   






