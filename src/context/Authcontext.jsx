import axios from "axios";
import { createContext, useEffect, useState } from "react";





export let authcontext = createContext();
export default function Authcontext({ children }) {


  const [user, setuser] = useState(null)

  const [token, settoken] = useState(() => localStorage.getItem("token"))



  async function userData() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}users/profile-data`, {
        headers: {


          Authorization: `Bearer ${token}`
        }
      })
 
      setuser(res.data.data.user)
      return res.data.data

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    if (token) {
      userData();
    }
  }, [token])







  return (
    <authcontext.Provider value={{ token, settoken, user, setuser, userData }}>
      {children}
    </authcontext.Provider>


  )
}
