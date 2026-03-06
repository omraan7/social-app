// import { useContext, useRef, useState } from "react"
// import { authcontext } from "../../context/Authcontext"
// import { DocumentUpload, Send } from "iconsax-reactjs"
// import toast from "react-hot-toast"
// import axios from "axios"

// export default function Createcomment({ postid }) {


//     const { user,token } = useContext(authcontext)
//     const [img, setimg] = useState(null)
//     const CommantUplode = useRef()

//     const imgUplode = useRef()
//     function handelimg(e) {
//         setimg(e.target.files[0])


//     }

//      async function sendComent() {

//       const myformdata = new FormData()
//         myformdata.append("content", CommantUplode.current.value)
//         if (img) {
//             myformdata.append("image", img)
//         }
//         toast.promise(axios.post(`${import.meta.env.VITE_API_URL}posts/${postid}/comments`, myformdata, {

//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         }), {
//             loading: "loading",
//             success: (res) => {
//                     CommantUplode.current.value = ""
//                     setimg(null)
//                  return res.data.message
//             },
//             error: (err) => {
//                 return err.response.data.error
//             }
//         }


//         )


//     }

//     return (
//         <>

//             <div className="flex gap-2 pt-2">
//                 <Image
//                     src={user?.photo}
//                     className="w-8 h-8 rounded-full"
//                     alt="user"
//                 />

//                 <input
//                     type="text"
//                     placeholder="Add a comment..."
//                     className="flex-1 bg-gray-100 rounded-full px-2 py-2 outline-none focus:ring-2 focus:ring-blue-500"
//                     ref={CommantUplode}
//                 />
//                 <DocumentUpload size="35" className="text-blue-400" onClick={() => imgUplode.current.click()} />
//                 <Send   size="32" className="text-blue-400" onClick={sendComent} />
//                 <input type="file" className="hidden" onChange={handelimg} ref={imgUplode} />

//             </div>

//             {img && (
//                 <Image
//                     src={URL.createObjectURL(img)}
//                     alt="preview"
//                     className="w-16 h-16 object-cover rounded"
//                 />
//             )}
//             {/* onClick={() => { imgUplode.current.click() }} */}


//         </>)
// }


import { useContext, useRef, useState } from "react"
import { authcontext } from "../../context/Authcontext"
import { DocumentUpload, Send } from "iconsax-reactjs"
import toast from "react-hot-toast"
import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Image } from "@heroui/react"

export default function Createcomment({ postid }) {

    const { user, token } = useContext(authcontext)
    const [img, setimg] = useState(null)
    const CommantUplode = useRef()
    const imgUplode = useRef()
    const queryClient = useQueryClient()

    function handelimg(e) {
        setimg(e.target.files[0])
    }

    const mutation = useMutation({
        mutationFn: async (formData) => {
            return axios.post(
                `${import.meta.env.VITE_API_URL}posts/${postid}/comments`,
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            )
        },


        onMutate: async (formData) => {

            await queryClient.cancelQueries(["comments", postid])

            const prevComments = queryClient.getQueryData(["comments", postid])

            const newComment = {
                _id: Math.random().toString(),
                content: formData.get("content"),
                image: img ? URL.createObjectURL(img) : null,
                createdBy: user,
                createdAt: new Date().toISOString()
            }

            queryClient.setQueryData(["comments", postid], old =>
                old ? [newComment, ...old] : [newComment]
            )

            CommantUplode.current.value = ""
            setimg(null)

            return { prevComments }
        },

        onSuccess: (res) => {
            toast.success(res.data.message || "Comment added successfully");
        },
        onError: (err, _, context) => {
            queryClient.setQueryData(["comments", postid], context.prevComments)
            toast.error(err.response?.data?.error || "Failed to add comment")
        },


        onSettled: () => {
            queryClient.invalidateQueries(["comments", postid])
        }
    })

    function sendComent() {
        const myformdata = new FormData()
        if (CommantUplode.current.value) myformdata.append("content", CommantUplode.current.value)
        if (img) myformdata.append("image", img)

        mutation.mutate(myformdata)
        // toast.success("تم التعليق")


    }

    return (
        <>
            <div className="flex gap-2 pt-2">
                <Image src={user?.photo} className="w-8 h-8 rounded-full" />

                <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    ref={CommantUplode}
                />

                <DocumentUpload
                    size="35"
                    className="text-gray-400"
                    onClick={() => imgUplode.current.click()}
                />

                <Send
                    size="32"
                    className="text-gray-400 cursor-pointer"
                    onClick={sendComent}
                />

                <input
                    type="file"
                    className="hidden"
                    onChange={handelimg}
                    ref={imgUplode}
                />
            </div>

            {img && (
                <Image
                    src={URL.createObjectURL(img)}
                    className="w-16 h-16 object-cover rounded mt-2"
                />
            )}
        </>
    )
}