import { Form, Image, image } from "@heroui/react";
import { DocumentUpload } from "iconsax-reactjs";
import { useContext, useRef, useState } from "react";
import { authcontext } from "../../context/Authcontext";
import { useForm } from "react-hook-form";

import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { set } from "zod";



export default function CreatePost({ cart }) {
    const imgUplode = useRef()
    const [img, setimg] = useState(null)
    const { token, user } = useContext(authcontext)

    const queryClient = useQueryClient();//محتاج اراجع علي الهوك دا 
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            body: "",

        },
    })
    function Uplodimg(e) {
        // console.log("chang",e.target.files );
        setimg(e.target.files[0])
    }
    async function sendpost(data) {

        const myformdata = new FormData()
        if (data.body?.trim()) myformdata.append("body", data.body)
        if (img) myformdata.append("image", img)

        if (!data.body?.trim() && !img) {
            toast.error("Post can't be empty");
            return;
        }
        toast.promise(axios.post(`${import.meta.env.VITE_API_URL}posts`, myformdata, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }), {
            loading: "loading",
            success: (res) => {

                queryClient.invalidateQueries(["posts"]);
                reset()
                setimg(null)
                return res.data.message
            },
            error: (err) => {
                return err.response.data.error
            }
        }


        )


    }
    return (
        <>

            {/* <div className="max-w-4xl overflow-hidden mx-auto my-1.5    bg-white p-4 rounded-xl shadow"> */}
            <div className={`overflow-hidden mx-auto my-1.5 bg-white    dark:bg-gray-700 dark:text-white p-4 rounded-xl shadow ${cart == "profile" ? "max-w-5xl" : "max-w-4xl"}`}>


                <Form onSubmit={handleSubmit(sendpost)} className="w-full">
                    <div className="flex w-full items-center gap-6 mb-4">
                        <Image
                            src={user?.photo}
                            alt="user"
                            className="w-10 h-10 rounded-full"
                        />

                        <input
                            {...register("body")}
                            type="text"
                            placeholder="What's on your mind?"
                            className="flex-1 bg-gray-200 dark:bg-gray-800 px-5 py-2 rounded-md outline-none dark:hover:bg-gray-500 cursor-pointer"
                        />
                        <DocumentUpload size="32" className="text-gray-800" onClick={() => { imgUplode.current.click() }} />
                        <input type="file" multiple className="hidden" onChange={Uplodimg} ref={imgUplode} />
                    </div>
                    <button className="text-white font-bold tracking-widest w-full bg-primary dark:bg-gray-900 py-2 px-4 rounded-md hover:bg-gray-600" type="submit">post </button>
                    {img && (
                        <Image
                            src={URL.createObjectURL(img)}
                            alt="preview"
                            className="w-16 h-16 object-cover rounded"
                        />
                    )}

                </Form>

            </div >



        </>
    )
}
