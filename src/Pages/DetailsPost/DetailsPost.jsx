// // import React, { useContext } from 'react'
// //  import { useParams } from 'react-router'
// // import { authcontext } from '../../context/Authcontext'
// // import { useQuery } from '@tanstack/react-query'
// // import Skeletonn from '../../Componants/Skeleton/Skeleton'
// // import axios from 'axios'
// // import CardPost from '../CardPost/CardPost'


// // export default function DetailsPost() {

// // const {id}=useParams()
// // const { token } = useContext(authcontext)
// //    function Getpost() {
// //   return axios.get(
// //     `${import.meta.env.VITE_API_URL}posts/${id}/comments?page=1&limit=10`,  
// //     {
// //       headers: {
// //         Authorization: `Bearer ${token}`
// //       }
// //     }
// //   )
// // }




// //   const { data, isLoading, isError, error } = useQuery({
// //    queryKey: ["postComments", id],

// //     queryFn: Getpost
// //   })

// //   // console.log(data?.data?.data?.comments);
// //   console.log(data );



// //   if (isLoading) {
// //     return <Skeletonn />

// //   }
// //   if (isError) {
// //     return <h1 className="flex justify-center items-center h-screen">{`erfdsfdsfsdror ${error.message}`}</h1>
// //   }
// //   return (
// // <>
// // <CardPost    />

// // </>
// //   )
// // }

// import { useContext } from "react"
// import { Link, useParams } from "react-router"
// import { authcontext } from "../../context/Authcontext"
// import { useQuery, useQueryClient } from "@tanstack/react-query"
// import axios from "axios"
// import Skeletonn from "../../Componants/Skeleton/Skeleton"
// import CardPost from "../CardPost/CardPost"
// export default function DetailsPost() {

//   const { id } = useParams()
//   const { token } = useContext(authcontext)
// //   const queryClient = useQueryClient()

// //   const postsData = queryClient.getQueryData(["posts"])
// //   // const post = postsData?.data?.data?.posts?.find(p => p._id === id)
// //   const post = postsData?.data?.data?.posts?.find(p => {
// //   console.log(p)
// //   return p._id === id
// // })

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["postDetails", id],
//     queryFn: () =>
//       axios.get(
//         `${import.meta.env.VITE_API_URL}posts/${id}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       ),
//     select: (res) => res
//   })

//   console.log(data);


//   if (!post) return <Skeletonn />
//   if (isLoading) return <Skeletonn />
//   if (isError) return <h1>حدث خطأ</h1>

//   return (
//     <div className="max-w-xl mx-auto">
//       <Link to="/posts" replace={true} className="btn btn-primary bg-blue-400 p-2 mt-5  rounded-2xl">Back</Link>

//       <CardPost post={post} />


//       <div className="bg-white p-4 mt-4 rounded-xl shadow">

//         {data?.map(comment => (
//           <div key={comment._id} className="flex gap-2 mb-3">
//             <img
//               src={comment.commentCreator?.photo}
//               className="w-8 h-8 rounded-full"
//             />

//             <div className="bg-gray-100 px-3 py-2 rounded-2xl">
//               <p className="font-semibold text-sm">
//                 {comment.commentCreator?.name}
//               </p>
//               <p className="text-sm">{comment.content}</p>
//             </div>
//           </div>
//         ))}

//       </div>

//     </div>
//   )
// }


import { useContext } from "react";
import { Link, useLocation, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { authcontext } from "../../context/Authcontext";
import CardPost from "../CardPost/CardPost";
import Skeletonn from "../../Componants/Skeleton/Skeleton";

export default function DetailsPost() {
 const location = useLocation();
//  console.log(location);
const backTo = location.state?.from || "/posts";
 
  const { id } = useParams();
  const { token } = useContext(authcontext);

  const { data: post, isLoading, isError } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data.post;
    },
  });

  if (isLoading) return <Skeletonn />;
  if (isError) return <h1>حدث خطأ</h1>;

  return (
    <div className="max-w-xl mx-auto mt-2.5  ">
      <Link to={backTo} replace={true} className="  bg-blue-400 p-2 mt-5  rounded-2xl">Back</Link>

      <CardPost post={post} />
    </div>
  );
}
