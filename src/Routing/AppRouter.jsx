import { createBrowserRouter } from "react-router"
import Layout from "../Componants/Layout/Layout"
import Posts from "../Pages/Posts/Posts"
import Register from "../Pages/Register/Register"
import NotFound from "../Pages/NotFound/NotFound"
import Login from "../Pages/Login/Login"
import Profile from "../Pages/profile/Profile"
import Guard from "../Guard/Guard"
import GuardLog from "../Guard/GuardLog"
 import DetailsPost from "../Pages/DetailsPost/DetailsPost"
import FollowSuggestions from "../Componants/FollowSuggestions/FollowSuggestions"
import ChangePassword from "../Pages/ChangePassword/ChangePassword"

export const Routing = createBrowserRouter([
  {
    path: "/",
    element:   <Layout />  , children: [
      { index: true, element: <GuardLog>   <Login /> </GuardLog>},
      { path: "suggest", element: <Guard>  <FollowSuggestions /> </Guard> },
      { path: "ChangePassword", element: <Guard>  <ChangePassword /> </Guard> },

      { path: "Profile", element: <Guard>  <Profile /> </Guard> },
      { path: "login", element: <GuardLog>   <Login /> </GuardLog> },
      { path: "posts", element: <Guard>  <Posts /> </Guard> },
      { path: "DetailsPost/:id", element: <Guard>  <DetailsPost /> </Guard> },

      { path: "register", element: <GuardLog>   <Register /> </GuardLog> },
       { path: "*", element: <GuardLog>   <NotFound /> </GuardLog> },

    ]
  }

]);


