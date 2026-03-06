import { Outlet } from "react-router";
import AppNavBar from "../AppNavBar/AppNavBar";

 
export default function Layout() {
  return (
<>
<main>
    <AppNavBar />
 <div className="min-h-screen  bg-gray-300 text-gray-900 dark:bg-gray-900 dark:text-whit" >
        
       <Outlet />
 </div>
</main>
</>
  )
}
