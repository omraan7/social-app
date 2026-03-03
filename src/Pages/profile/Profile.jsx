import { useContext, useRef, useState } from "react"
import { authcontext } from "../../context/Authcontext"
import { useQuery } from "@tanstack/react-query"
import Skeletonn from "../../Componants/Skeleton/Skeleton"
import { Camera } from "iconsax-reactjs"
import axios from "axios"
import toast from "react-hot-toast"
import CardPost from "../CardPost/CardPost"
import { da } from "zod/v4/locales"
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
      // //  toast.error(error.response.data.error)
      // console.log(error.response.data.error);

    }

  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["myPosts"],
    queryFn: () => axios.get(`${import.meta.env.VITE_API_URL}users/${user.id}/posts`, { headers: { Authorization: `Bearer ${token}` } }),
    select: (res) => res.data.data.posts
  })


  console.log(data);



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
    <div className="bg-gray-100 min-h-screen pb-10">

      {/* cover */}
      <div className="h-60 w-full bg-linear-to-b from-blue-900 to-blue-400 rounded-b-3xl"></div>

      {/* profile card */}
      <div className="max-w-5xl mx-auto -mt-24 bg-white rounded-3xl shadow p-6">

        {/* top section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          {/* left */}
          <div className="flex items-center gap-4">
            <img
              src={user?.photo}
              className="w-24 h-24 rounded-full border-4 border-white shadow"
              alt=""
            />
            <Camera size="33" color="#555555" onClick={() => imgUplode.current.click()} />
            {/* <img src={  URL.createObjectURL(user?.photo)} alt="" /> */}
            <input type="file" className="hidden" onChange={handelprofileimg} ref={imgUplode} />
            <div>
              <h2 className="text-2xl font-bold"> </h2>
              <p className="text-gray-500"> </p>

              <span className="inline-block mt-2 text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                {user?.name}
              </span>  <span className="inline-block mt-2 text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                {user?.username}
              </span>
            </div>
          </div>

          {/* stats */}
          <span>      {new Date(user?.createdAt).toDateString()}</span>
          <span>      {new Date(user?.dateOfBirth).toDateString()}</span>

        </div>

        {/* bottom */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">

          {/* about */}
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="font-semibold mb-3">About</h3>

            <p className="text-gray-600 text-sm mb-2">

            </p>

            <p className="text-gray-600 text-sm">
              {user?.email}
            </p>
          </div>

          {/* right stats */}
          dsf
        </div>
      </div>

      {/* tabs */}
      <div className="max-w-5xl mx-auto mt-6 bg-white rounded-xl shadow p-3 flex gap-3">
        <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg font-medium">
          My Posts
        </button>

        <button className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg">
          Saved
        </button>
      </div>

      <div className="">
<CreatePost cart="profile"/>


      </div>
      <div className="max-w-5xl mx-auto mt-6 rounded-xl">
        {data?.length ? (
          data.map((post) => (
            <CardPost key={post._id} post={post} cart="profile"  />
          ))
        ) : (
          <p className="text-center text-gray-500 py-10">No posts yet</p>
        )}
      </div>
    </div>


  </>
}
