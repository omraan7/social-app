import axios from "axios"
import { Newspaper, Sparkles, Globe, Bookmark, NewspaperIcon, SparklesIcon, Globe2, BookmarkCheck } from "lucide-react";
import { useContext } from "react"
import { authcontext } from "../../context/Authcontext"
import Skeletonn from "../../Componants/Skeleton/Skeleton"
import { useQuery } from "@tanstack/react-query"
import CardPost from '../CardPost/CardPost'
import CreatePost from "../../Componants/createpost/CreatePost";
import FollowSuggestions from "../../Componants/FollowSuggestions/FollowSuggestions"
import { NavLink } from "react-router";
export default function Posts() {
  // const [posts,setposts]=useState(null)
  //  const [isLoading, setIsLoading] = useState(true)


  //  useQuery(["posts"],async function getposts ( ) {
  //   const {data}=await axios.get(`${import.meta.env.VITE_API_URL}posts`,{
  //     headers:{
  //     // token:token
  //     Authorization:`Bearer ${token}`
  //   }
  // })
  //   console.log(data);
  //   setposts(data.data.posts)
  //   setIsLoading(false)

  // },) 


  const { token } = useContext(authcontext)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: Getposts
  })



  function Getposts() {
    return axios.get(`${import.meta.env.VITE_API_URL}posts`, {
      headers: {
        // token:token
        Authorization: `Bearer ${token}`
      }
    })

  }
  console.log(data);

  // try {
  //   useEffect(function ( ) {
  //     async function getposts ( ) {
  //       const {data}=await axios.get(`${import.meta.env.VITE_API_URL}posts`,{
  //         headers:{
  //         // token:token
  //         Authorization:`Bearer ${token}`
  //       }
  //     })
  //       console.log(data);
  //       setposts(data.data.posts)
  //       setIsLoading(false)

  //     }
  //     getposts()

  //   },[])

  // } catch (error) {
  //   console.log(error);


  // } 






  if (isLoading) {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((_, index) => (<Skeletonn page={1} key={index} />))

  }
  if (isError) {
    return <h1 className="flex justify-center  items-center h-screen">{`error ${error.message}`}</h1>
  }
  
  return (
    <>
     <section className="  flex flex-col md:flex-row gap-6 px-4 sm:px-6 md:px-0">
  {/* Sidebar Menu */}
  <div className=" min-h-screen w-full md:w-1/4">
    <div className="w-full text-center">
      <div className="bg-white rounded-2xl shadow-md p-4 w-full">
        <div className="space-y-2 flex flex-col gap-2.5">
          <NavLink
            to="/feed"
            className={({ isActive }) =>
              `flex gap-2 items-center justify-start p-2 rounded-lg transition-colors ${
                isActive ? "bg-blue-100 text-blue-600 font-medium" : "text-gray-700"
              }`
            }
          >
            <span><NewspaperIcon size={20} /></span> feed
          </NavLink>
          <NavLink
            to="/myposts"
            className={({ isActive }) =>
              `flex gap-2 items-center justify-start p-2 rounded-lg transition-colors ${
                isActive ? "bg-blue-100 text-blue-600 font-medium" : "text-gray-700"
              }`
            }
          >
            <span><SparklesIcon size={20} /></span> My Posts
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex gap-2 items-center justify-start p-2 rounded-lg transition-colors ${
                isActive ? "bg-blue-100 text-blue-600 font-medium" : "text-gray-700"
              }`
            }
          >
            <span><Globe2 size={20} /></span> Community
          </NavLink>
          <NavLink
            to="/saved"
            className={({ isActive }) =>
              `flex gap-2 items-center justify-start p-2 rounded-lg transition-colors ${
                isActive ? "bg-blue-100 text-blue-600 font-medium" : "text-gray-700"
              }`
            }
          >
            <span><BookmarkCheck size={20} /></span> Saved
          </NavLink>
        </div>
      </div>
    </div>
  </div>

  {/* Main Feed */}
  <div className="w-full md:w-2/4">
    <CreatePost />
    {data?.data?.data?.posts?.map((post) => (
      <CardPost key={post._id} post={post} />
    ))}
  </div>

  {/* Right Sidebar */}
  <div className="min-h-screen hidden md:block md:w-1/4 relative">
    <div className="h-full sticky top-6 w-full">
      <FollowSuggestions />
    </div>
  </div>
</section>
    </>
  )
}
