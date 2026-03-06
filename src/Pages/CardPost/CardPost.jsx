import { Card, CardHeader, CardBody, CardFooter, Avatar, Button, User, Skeleton, Image } from "@heroui/react"
import { useContext, useState } from "react";
import { authcontext } from "../../context/Authcontext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";
import axios from "axios";
import Createcomment from "../../Componants/createcomment/Createcomment";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, } from "@heroui/react";
import EditPostmodel from "../../Componants/EditPostModal/EditPostmodel";
import EditCommentmodel from "../../Componants/EditCommentModal/EditCommentmodel";
import toast from "react-hot-toast";



export default function CardPost({ post, cart }) {
    const [commentModel, setcommentModel] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [SelectedComment, setSelectedComment] = useState(null)





    const queryClient = useQueryClient()
    const [openAllcoments, setopenAllcoments] = useState(false)
    const { user, token } = useContext(authcontext)



    //  const { token } = useContext(authcontext)

    //   const { data, isLoading, isError, error } = useQuery({
    //     queryKey: ["comments"],
    //     queryFn: Getposts
    //   })

    //   console.log(data);
    //   console.log("isloading", isLoading);

    //   console.log("isError", isError);

    //   console.log(" error", error);

    //   function Getposts() {
    //     return axios.get(`${import.meta.env.VITE_API_URL}/posts//comments?page=1&limit=10`, {
    //       headers: {
    //         // token:token
    //         Authorization: `Bearer ${token}`
    //       }
    //     })

    //   }
    //   if (isLoading) {
    //     return <Skeletonn  />

    //   }
    //   if (isError) {
    //     return <h1 className="flex justify-center items-center h-screen">{`error ${error.message}`}</h1>
    //   }

    function timeAgo(dateString) {
        const now = new Date();
        const past = new Date(dateString);
        const diff = (now - past) / 1000;

        if (diff < 60) return "منذ لحظات";

        const minutes = diff / 60;
        if (minutes < 60) return `منذ ${Math.floor(minutes)} دقيقة`;

        const hours = minutes / 60;
        if (hours < 24) return `منذ ${Math.floor(hours)} ساعة`;

        const days = hours / 24;
        if (days < 7) return `منذ ${Math.floor(days)} يوم`;

        const weeks = days / 7;
        if (weeks < 4) return `منذ ${Math.floor(weeks)} أسبوع`;

        const months = days / 30;
        if (months < 12) return `منذ ${Math.floor(months)} شهر`;

        const years = days / 365;
        return `منذ ${Math.floor(years)} سنة`;
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["postComments", post.id],
        queryFn: () => axios.get(
            `${import.meta.env.VITE_API_URL}posts/${post.id}/comments?page=1&limit=10`,
            { headers: { Authorization: `Bearer ${token}` } }
        ),
        enabled: openAllcoments,
        select: (res) => res.data.data.comments

    })


    // async function handelDeleteComent() {
    //     const res = await axios.delete(`${import.meta.env.VITE_API_URL}posts/${post.id}/comments/${data._id}  `, { headers: { Authorization: `Bearer ${token}` } })
    //     console.log(res);
    //     // Swal.fire("SweetAlert2 is working!");
    //     Swal.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, delete it!"
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             Swal.fire({
    //                 title: "Deleted!",
    //                 text: "Your file has been deleted.",
    //                 icon: "success"
    //             });
    //         }
    //     });


    // }
    // تعديل handelDeleteComent ليقبل commentId
    async function handelDeleteComent(commentId) {
        if (!commentId) return;

        const result = await Swal.fire({
            title: 'Do you want to delete this comment?',
            text: "the comment will be deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'cancel'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}posts/${post.id}/comments/${commentId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                queryClient.invalidateQueries(["postComments", post.id]);
                queryClient.invalidateQueries(["posts"]);
                Swal.fire('Deleted!', 'The comment has been deleted.', 'success');
            } catch (err) {
                console.error(err);
                Swal.fire('Error', 'error');
            }
        }
    }
    const mutate = useMutation({
        mutationFn: (data) =>
            axios.post(
                `${import.meta.env.VITE_API_URL}posts/${post.id}/share`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            ),

        onSuccess: () => {
            toast.success("Post shared successfully");
            queryClient.invalidateQueries(["posts"]);

        },
    }); function sharePost() {
        mutate.mutate({
            body: "Sharing this great post @mentor_user",
        });
    }
    const mutate2 = useMutation({
        mutationFn: (data) =>
            axios.put(
                `${import.meta.env.VITE_API_URL}posts/${post.id}/like`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            ),
        onSuccess: () => {
            toast.success("Post liked successfully");
            queryClient.invalidateQueries(["posts"]);
        },
    })

    function likePost() {
        mutate2.mutate();

    }
    // if (isLoading) {
    //     return <Skeletonn  page={3}/>

    // }
    if (isError) {
        return <h1 className="flex justify-center items-center h-screen">{`error ${error.message}`}</h1>
    }
    async function HanselDeleatePost() {
        const result = await Swal.fire({
            title: 'do you want to delete this post?',
            text: "the post will be deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'delete',
            cancelButtonText: 'cancel'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}posts/${post.id}`, { headers: { Authorization: `Bearer ${token}` } })
                queryClient.invalidateQueries(["myPosts"])
                Swal.fire('Deleted!', 'The post has been deleted.', 'success');


            } catch (err) {
                console.error(err);
                Swal.fire('Error', 'error');
            }
        }
        // const res = await axios.delete(`${import.meta.env.VITE_API_URL}posts/${post.id}`, { headers: { Authorization: `Bearer ${token}` } })
        // queryClient.invalidateQueries(["myPosts"])




    }
    post?.commentsCount
    return (
        <>
            <EditPostmodel
                post={post}
                isOpen={isEditModalOpen}
                setIsOpen={setIsEditModalOpen}
            />
            <EditCommentmodel
                post={post}
                comment={SelectedComment}
                isOpen={commentModel}
                setIsOpen={setcommentModel}
            />
            <Card
                className={`overflow-hidden mx-auto my-1.5 min-h-62 dark:bg-gray-700  dark:text-white
  ${cart === "profile" ? "max-w-6xl" : "max-w-4xl"} `}
            >

                <CardHeader className="justify-between">

                    <div className="flex gap-5">
                        <Avatar
                            isBordered
                            radius="full"
                            size="md"
                            src={post.user.photo}
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">{post.user.name}</h4>
                            <h5 className="text-small tracking-tight text-default-400"> {timeAgo(post.createdAt)}</h5>
                        </div>
                    </div>

                    {user.id === post.user._id ? <Dropdown>
                        <DropdownTrigger>
                            <Button   className="bg-transparent text-foreground  text-md font-medium  "
                                color="primary"
                                radius="full"
                                size="sm"
                            >  Menu</Button>
                        </DropdownTrigger>
                        <DropdownMenu    className="  p-0 m-0">

                            <DropdownItem key="edit" onClick={() => setIsEditModalOpen(true)}>
                                Edit Post
                            </DropdownItem>

                            <DropdownItem key="delete" className="text-danger" color="danger" onClick={HanselDeleatePost}>
                                Delete Post
                            </DropdownItem>

                        </DropdownMenu>
                    </Dropdown> : <Button
                        className="bg-blue-500 text-foreground "
                        color="primary"
                        radius="full"
                        size="sm"
                        variant="bordered"

                    >
                        Follow
                    </Button>}

                </CardHeader>
                <EditPostmodel post={post} isEditModalOpen={isEditModalOpen} setIsEditModalOpen={setIsEditModalOpen} />

                <CardBody className="px-3 py-5 text-small text-default-900">

                    <p className="mb-2.5">{post.body}</p>

                    {post.image && (
                        <Image src={post.image} alt={post.body} />
                    )}

                    {/* Shared Post */}
                    {post.sharedPost && (
                        <Card className="mt-4 border border-gray-200 shadow-none">
                            <CardHeader>
                                <div className="flex gap-3 items-center w-full">
                                    <Avatar
                                        src={post.sharedPost.user.photo}
                                        size="sm"
                                    />
                                    <div>
                                        <p className="text-sm font-semibold">
                                            {post.sharedPost.user.name}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {timeAgo(post.sharedPost.createdAt)}
                                        </p>
                                    </div>
                                    <Link className="ml-auto" to={`/DetailsPost/${post.sharedPost._id}`} > <h5 className="font-semibold text-md  text-gray-600  dark:text-white  text-end mr-5   ">more details</h5></Link>

                                </div>
                            </CardHeader>

                            <CardBody>
                                <p>{post.sharedPost.body}</p>

                                {post.sharedPost.image && (
                                    <Image
                                        src={post.sharedPost.image}
                                        alt=""
                                        className="mt-2 rounded-xl"
                                    />
                                )}

                            </CardBody>

                        </Card>
                    )}

                </CardBody>
                <Link to={`/DetailsPost/${post._id}`} state={{ from: location.pathname }}> <h5 className="text-md text-end mr-5 font-semibold   text-md  text-gray-600  dark:text-white ">more details</h5></Link>
                <CardFooter className="flex flex-col ">

                    <div className="gap-10 grid grid-cols-3">
                        <Button

                            className={`bg-transparent text-foreground border-1.5 border-gray-400 hover:bg-blue-200 hover:border-blue-600 hover:border-1.5 ${post?.likes.includes(user.id) ? "bg-blue-300" : ""}    `}
                            color="primary"
                            radius="full"
                            size="sm"
                            variant="bordered"
                            onClick={() => likePost()}
                        >
                            {post?.likesCount}  Like
                        </Button>
                        <Button
                            className="bg-transparent text-foreground border-1.5 border-gray-400 hover:bg-blue-200 hover:border-blue-600 hover:border-1.5"
                            color="primary"
                            radius="full"
                            size="sm"
                            variant="bordered"

                        >
                            {post?.commentsCount + (post?.topComment ? 1 : 0)}   comment
                        </Button>
                        <Button
                            className="bg-transparent text-foreground border-1.5 border-gray-400 hover:bg-blue-200 hover:border-blue-600 hover:border-1.5"
                            color="primary"
                            radius="full"
                            size="sm"
                            variant="bordered"
                            onClick={sharePost}
                        >
                            {post?.sharesCount}   share
                        </Button>
                    </div>
                    <div className="flex w-full flex-col gap-2 justify-start  rounded-2xl  ">
                        {/* {post?.topComment && (
                            // <div className="py-5 px-2.5 my-3.5 bg-gray-200 text-foreground rounded-2xl">
                            //     <User
                            //         avatarProps={{
                            //             src: post.topComment.commentCreator?.photo,
                            //         }}
                            //         name={post.topComment.commentCreator?.name}
                            //     />
                            //     <p>{post.topComment.content}</p>
                            // </div>
                        )} */}

                        <div className="space-y-3">
                            {post.topComment && <div className="flex  my-2.5 gap-2">
                                <Image
                                    src={post.topComment?.commentCreator?.photo}
                                    className="w-8 h-8 rounded-full"
                                    alt=""
                                />

                                <div className="bg-gray-100 dark:bg-gray-600 rounded-2xl px-3 py-2 max-w-md">
                                    <p className="font-semibold text-sm">{post.topComment?.commentCreator?.name}</p>
                                    <p className="text-sm  ">
                                        {post?.topComment?.content}
                                    </p>

                                    <Image src={post?.topComment?.image} alt="" />
                                    {post.topComment.commentCreator?._id === user.id && (
                                        <>

                                            <button
                                                className="text-red-600 text-sm font-semibold ml-2 hover:underline"
                                                onClick={() => handelDeleteComent(post.topComment._id)}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className="text-blue-600 text-sm  font-semibold ml-2 hover:underline"
                                                onClick={() => {
                                                    setSelectedComment(post.topComment);
                                                    setcommentModel(true);
                                                }}
                                            >
                                                Edite
                                            </button>

                                        </>
                                    )}
                                </div>

                            </div>}
                            {/* //wsdsa */}


                            {openAllcoments && (isLoading ? (
                                <Card className="w-full overflow-hidden mx-auto my-3.5 shadow-none   min-h-20" radius="lg">

                                    <div className="space-y-3">
                                        <Skeleton className="w-3/5 rounded-lg my-2.5">
                                            <div className="h-3 w-3/5 rounded-lg bg-default-200" />
                                        </Skeleton>
                                        <Skeleton className="w-4/5 rounded-lg my-2.5">
                                            <div className="h-3 w-4/5 rounded-lg bg-default-200" />
                                        </Skeleton>
                                        <Skeleton className="w-2/5 rounded-lg my-2.5">
                                            <div className="h-3 w-2/5 rounded-lg bg-default-300" />
                                        </Skeleton>
                                    </div>
                                </Card>) : (data.map((comment) => (
                                    <div key={comment._id} className="bg-white  dark:bg-gray-700 dark:text-white p-0 mt-2 rounded-xl  ">


                                        <div className="flex gap-2 mb-3">
                                            <Image
                                                src={comment.commentCreator?.photo}
                                                className="w-8 h-8 rounded-full"
                                            />

                                            <div className="bg-gray-100 dark:bg-gray-600 px-3 py-2 rounded-2xl">
                                                <p className="font-semibold text-sm">
                                                    {comment.commentCreator?.name}
                                                </p>
                                                <p className="text-sm">{comment.content}</p>
                                                <Image src={comment?.image} alt="" />
                                                {comment.commentCreator?._id === user.id && (
                                                    <>

                                                        <button
                                                            className="text-red-600 text-sm font-semibold mx-5 hover:underline"
                                                            onClick={() => handelDeleteComent(comment._id)}
                                                        >
                                                            Delete
                                                        </button><button
                                                            className="text-blue-600 text-sm  font-semibold ml-2 hover:underline"
                                                            onClick={() => {
                                                                setSelectedComment(comment);
                                                                setcommentModel(true);
                                                            }}
                                                        >
                                                            Edite
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                ))))}


                            <Createcomment postid={post.id} />

                        </div>
                        {openAllcoments ? (post?.commentsCount > 1 && <p className=" text-end mr-5 font-semibold text-md  text-gray-600  dark:text-white cursor-pointer" onClick={() => setopenAllcoments(false)} > Hide Comments</p>) : (post?.commentsCount > 1 && <p className="  text-end mr-5 font-semibold text-md  text-gray-600  dark:text-white cursor-pointer" onClick={() => setopenAllcoments(true)} > more Comments</p>)}

                    </div>
                </CardFooter>

            </Card>

        </>
    )
}
