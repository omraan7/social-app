
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Image } from "@heroui/react";
import { DocumentUpload } from "iconsax-reactjs";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { authcontext } from "../../context/Authcontext";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";

export default function EditCommentmodel({ isOpen, setIsOpen, comment, post }) {


    const imgUplode = useRef();
    const [img, setimg] = useState(null)
    const { token } = useContext(authcontext)
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            body: comment?.content || "",
        }

    })
    function Uplodimg(e) {

        setimg(e.target.files[0])
    }

    useEffect(() => {
        if (isOpen) {
            reset({ body: comment?.content || "" });

            //    setimg(null);
        }
    }, [isOpen, comment, reset]);
    async function sendcomment(data) {
        const myformdata = new FormData()
        if (data.body?.trim()) myformdata.append("content", data?.body)
        if (img) myformdata.append("image", img)

        if (!data.body?.trim() && !img) {
            toast.error("Post can't be empty");
            return;
        }
        toast.promise(axios.put(`${import.meta.env.VITE_API_URL}posts/${post.id}/comments/${comment._id}`, myformdata, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }), {
            loading: "loading",
            success: (res) => {
                queryClient.invalidateQueries(["posts"]);
                reset()
                setimg(null)
                setIsOpen(false)
                return res.data.message
            },
            error: (err) => {
                return err.response.data.error
            }
        })
    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            backdrop="opaque"
            classNames={{
                body: "py-6",
                backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                header: "border-b-[1px] border-[#292f46]",
                footer: "border-t-[1px] border-[#292f46]",
                closeButton: "hover:bg-white/5 active:bg-white/10",
            }}
            radius="lg"
        >
            <form onSubmit={handleSubmit(sendcomment)} >
                <ModalContent>
                    <ModalHeader>Update Post</ModalHeader>
                    <ModalBody>
                        <input
                            {...register("body")}
                            type="text"
                            placeholder="عنوان البوست"
                            className="w-full border p-2 mb-3 rounded"
                        />
                        <Image
                            src={img ? URL.createObjectURL(img) : comment?.image}
                            alt="Post Image"
                            className="w-full mb-3"
                        />
                        <DocumentUpload
                            size="35"
                            className="text-blue-400 mb-3"
                            onClick={() => imgUplode.current.click()}
                        />

                        <input type="file" className="hidden" onChange={Uplodimg} ref={imgUplode} />
                    </ModalBody>
                     
                    <ModalFooter>
                        <Button color="foreground" variant="light" onClick={() => { setimg(null); setIsOpen(false) }}>
                            Close
                        </Button>
                        <Button type="submit" className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20">
                            Update
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form  >

        </Modal>
    );
}