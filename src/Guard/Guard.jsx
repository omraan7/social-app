import { useContext } from "react"
import { authcontext } from "../context/Authcontext"
import Login from "../Pages/Login/Login"
import { Navigate } from "react-router"

 
export default function Guard({children}) {
  const { token } = useContext(authcontext)

  if (!token||token===null || token===undefined) {
    return <Navigate to="/login" />
  } 

  return (
    < >{children}</ >
  )
}
