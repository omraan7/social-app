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
      <section className=" container mx-auto  flex flex-col md:flex-row gap-6 px-4 sm:px-6 md:px-0">

        <div className=" mt-1.5 md:min-h-screen w-full md:w-1/4">
          <div className="w-full text-center  sticky top-17">
            <div className="bg-white dark:bg-gray-700  rounded-2xl shadow-md p-4 w-full">
              <div className="   grid grid-cols-2 justify-center items-start md:space-y-2 md:flex md:flex-col md:gap-2.5">
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `flex gap-2 items-center justify-start p-2 rounded-lg transition-colors dark:text-gray-200 ${isActive ? "bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-200 font-medium" : "text-gray-700"
                    }`
                  }
                >
                  <span><NewspaperIcon size={20} /></span> feed
                </NavLink>
                <NavLink
                  to="/posts"
                  className={({ isActive }) =>
                    `w-full flex gap-2 items-center justify-start p-2 rounded-lg transition-colors  dark:text-gray-200${isActive ? "bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-200  font-medium" : "text-gray-700"
                    }`
                  }
                >
                  <span><SparklesIcon size={20} /></span> My Posts
                </NavLink>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `flex gap-2 items-center justify-start p-2 rounded-lg transition-colors dark:text-gray-200 ${isActive ? "bg-gray-900 text-gray-600 font-medium" : "text-gray-700"
                    }`
                  }
                >
                  <span><Globe2 size={20} /></span> Community
                </NavLink>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `flex gap-2 items-center justify-start p-2 rounded-lg transition-colors dark:text-gray-200 ${isActive ? "bg-gray-200 text-gray-600 font-medium" : "text-gray-700"
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


        <div className="hidden md:block md:w-1/4">
          <div className="sticky top-17">
            <FollowSuggestions />
          </div>
        </div>
      </section>
    </>
  )
}
