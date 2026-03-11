import axios from "axios"
import { Newspaper, Sparkles, Globe, Bookmark, NewspaperIcon, SparklesIcon, Globe2, BookmarkCheck } from "lucide-react";
import { useContext, useState } from "react"
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


  const { token, user } = useContext(authcontext)
  const [type, setType] = useState("feed")

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", type],
    queryFn: Getposts
  })

  const posts = data?.data?.data?.posts
  const filteredPosts =
    type === "myposts"
      ? posts?.filter((post) => post.user._id === user._id)
      : posts

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
                  onClick={() => setType("feed")}   className={
                    ` w-full flex gap-2 items-center justify-start p-2 rounded-lg transition-colors dark:text-gray-200 
                    `
                  }
                >
                  <span><NewspaperIcon size={20} /></span> feed
                </NavLink>
                <NavLink
                  onClick={() => setType("myposts")}   className={
                    ` w-full flex gap-2 items-center justify-start p-2 rounded-lg transition-colors dark:text-gray-200 
                    `
                  }
                >
                  <span><SparklesIcon size={20} /></span> My Posts
                </NavLink>
                <NavLink
                  onClick={() => setType("feed")}
                  className={
                    ` w-full flex gap-2 items-center justify-start p-2 rounded-lg transition-colors dark:text-gray-200 
                    `
                  }
                >
                  <span><Globe2 size={20} /></span> Community
                </NavLink>
                <NavLink
                  to="/profile"
                className={
                    ` w-full flex gap-2 items-center justify-start p-2 rounded-lg transition-colors dark:text-gray-200 
                    `
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
          {/* {data?.data?.data?.posts?.map((post) => (
            <CardPost key={post._id} post={post} />
          ))} */}
          {filteredPosts?.map((post) => (
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
