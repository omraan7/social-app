import { useContext, useRef } from "react"
import { authcontext } from "../../context/Authcontext"
import { useQuery } from "@tanstack/react-query"
import Skeletonn from "../../Componants/Skeleton/Skeleton"
import { Camera } from "iconsax-reactjs"
import axios from "axios"
import toast from "react-hot-toast"
import CardPost from "../CardPost/CardPost"
import CreatePost from "../../Componants/createpost/CreatePost"

export default function Profile() {



  const { user, token, userData } = useContext(authcontext)
 

  const imgUplode = useRef()
  async function handelprofileimg(e) {
    try {

      const file = e.target.files[0]
      if (!file) return
      const myformdata = new FormData()
      myformdata.append("photo", file)
      const res = await axios.put(`${import.meta.env.VITE_API_URL}users/upload-photo`, myformdata, { headers: { Authorization: `Bearer ${token}` } })
      userData()

      toast.success(res.data.message)

      console.log(res);
    } catch (error) {
      //  toast.error(error.response.data.error)
      // console.log(error.response.data.error);

    }

  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["myPosts"],
    queryFn: () => axios.get(`${import.meta.env.VITE_API_URL}users/${user.id}/posts`, { headers: { Authorization: `Bearer ${token}` } }),
    select: (res) => res.data.data.posts
  })





  if (isLoading) {
    return [1, 2,]?.map((_, index) => (<Skeletonn page={4} key={index} />))

  }
  if (isError) {
    return toast.error(error.response.data.error)

  }

  if (!user) {
    return <Skeletonn page={2} />
  }


  return <>
    {/*   
    <div className="max-w-4xl bg-blue-400 min-h-96 mx-auto mt-5 overflow-auto">
      <div className="bg-red-400 h-42 w-42 rounded-full m-5">
        <img src="" alt=""  className='w-full '/>
      </div>

    </div>
  
   */}
    <div className="dark:bg-gray-900 min-h-screen pb-10">

      <div className="h-60 w-full bg-linear-to-b from-transparent to-gray-600 dark:from-gray-900 dark:to-gray-800 rounded-b-3xl"></div>

      <div className="max-w-5xl mx-auto -mt-24 bg-white text-gray-800 dark:bg-gray-700 rounded-3xl shadow p-6">

         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 ">

           <div className="flex items-center gap-4">
            <img
              src={user?.photo}
              className="w-24 h-24 rounded-full border-4 border-white shadow"
              alt=""
            />
            <Camera size="33" color="#fff" onClick={() => imgUplode.current.click()} />
            {/* <img src={  URL.createObjectURL(user?.photo)} alt="" /> */}
            <input type="file" className="hidden" onChange={handelprofileimg} ref={imgUplode} />
            <div>
              <h2 className="text-2xl font-bold dark:text-white "> {user?.name}</h2>
              <p className="dark:text-gray-400">  {user?.username}</p>

             
            </div>
          </div>

           <div className="flex items-center gap-3 ">

            <div className="flex items-center bg-gray-300 dark:bg-gray-600 dark:text-white px-3 py-2 rounded-2xl gap-4 text-sm font-bold"> Following
              <div className=" text-lg">
                {user?.followingCount}
              </div>
            </div >
            <div className="flex items-center  bg-gray-300 dark:bg-gray-600 dark:text-white px-3 py-2 rounded-2xl gap-4 text-sm font-bold"> followers
              <div className=" text-lg">
                {user?.followersCount}
              </div>
            </div >

          </div>


        </div>

         <div className="grid md:grid-cols-2 gap-6 mt-6">

           <div className=" bg-gray-300 dark:bg-gray-600 dark:text-white  rounded-xl p-5">
            <h3 className="font-semibold mb-3">About</h3>


            <p className="dark:text-white text-sm">
              <span className=" dark:text-white text-lg font-bold">Email: </span>
              {user?.email}
            </p>
            <p className="dark:text-white text-sm">
              <span className=" darK:text-white text-lg font-bold"> Date Of Birth: </span>

              {new Date(user?.dateOfBirth).toDateString()}         </p>
          </div>

           <div className="flex items-center justify-center  bg-gray-300 dark:bg-gray-600 dark:text-white px-3 py-2 rounded-2xl gap-4 text-sm font-bold">     My Posts
            <div className=" text-lg">
              {data?.length}
            </div>
          </div >

        </div>
      </div>

 

      <div className=" my-5">
        <CreatePost cart="profile" />


      </div>
      <div className="max-w-5xl mx-auto mt-6 bg-white  dark:bg-gray-700 text-white rounded-xl shadow p-3    flex gap-3">
        <button className="px-4 py-2 bg-blue-600 dark:bg-gray-900 text-white rounded-lg font-medium">
          My Posts
        </button>


      </div>
      <div className="max-w-5xl mx-auto mt-6 rounded-xl">
        {data?.length ? (
          data.map((post) => (
            <CardPost key={post._id} post={post} cart="profile" />
          ))
        ) : (
          <p className="text-center text-gray-100 py-10">No posts yet</p>
        )}
      </div>
    </div>


  </>
}
