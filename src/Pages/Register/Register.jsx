import { Button, DatePicker, Form, Input, Select, SelectItem } from "@heroui/react";

import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
const cshema = z.object({
    name: z.string("must be a string").min(3, "must be at least 3 characters").max(20, "must be at most 20 characters").regex(/^[a-zA-Z][a-zA-Z '.-]*[A-Za-z][^-]$/, "your name is not valid"),
    username: z.string("must be a string").min(3, "must be at least 3 characters").max(20, "must be at most 20 characters").regex(/^[a-zA-Z][a-zA-Z '.-]*[A-Za-z][^-]$/, "your username is not valid"),
    email: z.string("must be a string").regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "your email is not valid"),
    password: z.string("must be a string").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "your password is not valid"),
    rePassword: z.string("must be a string").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "your repassword is not valid"),
    dateOfBirth: z.coerce.date().max(new Date(), "must be in the past").min(new Date(1, 0, 1900), "must be at least 1900-01-01").refine(
        (date) => {
            const today = new Date();
            const age = today.getFullYear() - date.getFullYear();
            return age >= 18
        }
        , { error: "must be 18 or older" }).transform(function formatDate(date) {
            const d = new Date(date);
            const day = String(d.getDate()).padStart(2, "0");
            const month = String(d.getMonth() + 1).padStart(2, "0");
            const year = d.getFullYear();
            return `${year}-${month}-${day}`;
        }
        ),


    gender: z.enum(["male", "female"], "must be a valid gender"),
}).refine((data) => data.password === data.rePassword, {
    message: "Passwords do not maSDASDStch",
    path: ["rePassword"],
})


export default function Register() {
    const [show, setShow] = useState(false);
    const [showw, setShoww] = useState(false);

    const navigate = useNavigate()

    // const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitted, isValid, isSubmitSuccessful }, watch, control } = useForm({
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
            rePassword: "",
            dateOfBirth: null,
            gender: ""
        }, mode: "all",
        resolver: zodResolver(cshema)
    });

    // const password = watch("password");
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful]);


    async function handleSubmitForm(x) {
        console.log(x);

        try {
            // setIsLoading(true);
            await toast.promise(
                axios.post(`${import.meta.env.VITE_API_URL}users/signup`, x),
                {
                    loading: 'Waiting    ',
                    success: function (x) {
                        navigate("/login")
                        return x.data.message;
                        // console.log(x.data.message);


                    },
                    error: function (x) {


                        return (x.response.data.error);

                    },
                },
            );
        }
        catch (error) {
            // setIsLoading(false);
        }
        // try {
        //     // setIsLoading(true);
        //     // const rse = await axios.post(`${import.meta.env.VITE_API_URL}/users/signup`, x)
        //     // console.log(rse);
        //     // setIsLoading(false);


        // } catch (error) {


        // }

        // setIsLoading(false);

    }
    return (
        <>
            <div className="container mx-auto flex flex-col md:flex-row min-h-screen">


                <div className="min-h-screen w-full md:max-w-1/2  flex items-center justify-center p-6">
                    <div className="max-w-6xl w-full">

                        <div className="flex items-center gap-3 mb-8">

                            <h2 className="text-3xl text-gray-800 dark:text-white font-bold">Omran....</h2>
                        </div>

                        <div className="mb-10">
                            <h1 className="text-4xl  text-gray-800 dark:text-white md:text-6xl font-bold leading-tight">
                                Welcome Back <br />
                                <span className="text-blue-900 ">to Omran App</span>
                            </h1>
                            <p className="mt-4 text-lg dark:text-white/80">
                                Signin to connect people all over the world
                            </p>
                        </div>

                        <div className="bg-whitend  text-gray-700 backdrop-blur-md border border-white/20 rounded-2xl p-6">

                            <p className="dark:text-white/90 italic mb-6">
                                “SocialHub has completely changed how I connect with friends and discover new communities. The experience is seamless!”
                            </p>

                            <div className="flex items-center gap-3">
                                <img
                                    src="0"
                                    alt="avatar"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <p className=" dark:text-white font-semibold">Alex Johnson</p>
                                    <p className="text-sm dark:text-white/70">Product Designer</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="flex w-[50%] justify-center items-center min-h-screen ">

                    <Form


                        onSubmit={handleSubmit(handleSubmitForm)}
                        className="w-full max-w-7xl mx-auto p-10 mt-5 flex flex-col gap-4 bg-white dark:bg-gray-950 shadow-teal-950/20 shadow-md rounded-2xl"
                    > {isSubmitted && !isValid && (
                        <p className="text-red-500 text-sm">
                            Please fix the errors above
                        </p>
                    )}

                        <h2 className="text-5xl font-bold text-zinc-800 dark:text-white italic self-center">Register</h2>
                        <Input classNames={{
                            label: ` ${errors.name ? "text-red-500! text-xl!" : "text-xl! dark:text-white! text-gray-800! font-bold"} `,
                            input: "placeholder:text-gray-400 dark:placeholder:text-gray-200 placeholder:text-lg"
                        }}
                            {...register("name")}

                            // {...register("name", {
                            //     required: { value: true, message: "Please enter valid Name" },
                            //     pattern: { value: /^[a-zA-Z][a-zA-Z '.-]*[A-Za-z][^-]$/, message: "your name is not valid" }
                            // })}

                            isRequired
                            isInvalid={errors.name}
                            errorMessage={errors.name?.message}
                            label=" Name "
                            labelPlacement="outside"

                            placeholder="Enter your Name"
                            type="text"
                        />
                        <Input classNames={{
                            label: `${errors.username ? "text-red-500! text-xl!" : "text-xl! dark:text-white! text-gray-800! font-bold"} `,
                            input: "placeholder:text-gray-400 dark:placeholder:text-gray-200 placeholder:text-lg"
                        }}
                            {...register("username")}

                            // {...register("name", {
                            //     required: { value: true, message: "Please enter valid Name" },
                            //     pattern: { value: /^[a-zA-Z][a-zA-Z '.-]*[A-Za-z][^-]$/, message: "your name is not valid" }
                            // })}

                            isRequired
                            isInvalid={errors.username}
                            errorMessage={errors.username?.message}
                            label=" UserName "
                            labelPlacement="outside"

                            placeholder="Enter your Name"
                            type="text"
                        />
                        <Input
                            classNames={{
                                label: `${errors.email ? "text-red-500! text-xl!" : "text-xl! dark:text-white! text-gray-800! font-bold"} `,
                                input: "placeholder:text-gray-400 dark:placeholder:text-gray-200 placeholder:text-lg"
                            }}

                            {...register("email")}

                            //  {...register("email", {
                            //     required: { value: true, message: "Please enter a valid email" },
                            //     pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "your email is not valid" }
                            // })}

                            isRequired
                            isInvalid={errors.email}
                            errorMessage={errors.email?.message}
                            label=" Email "
                            labelPlacement="outside"

                            placeholder="Enter your email"
                            type="email"
                        />
                        <Input
                            classNames={{
                                label: `${errors.password ? "text-red-500! text-xl!" : "text-xl! dark:text-white! text-gray-800! font-bold"} `,
                                input: "placeholder:text-gray-400 dark:placeholder:text-gray-200 placeholder:text-lg"
                            }}
                            {...register("password")}


                            //  {...register("password", {
                            //     required: { value: true, message: "Please enter a valid password" },
                            //     pattern: { value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, message: "your password is not valid" }
                            // })}
                            isInvalid={errors.password}
                            isRequired
                            errorMessage={errors.password?.message}
                            label=" Password "
                            labelPlacement="outside"
                            autoComplete="new-password"
                            placeholder="Enter your password"
                            type={show ? "text" : "password"}
                            endContent={
                                <button type="button" onClick={() => setShow(!show)}>
                                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            } />

                        <Input
                            classNames={{
                                label: `${errors.rePassword ? "text-red-500! text-xl!" : "text-xl! dark:text-white! text-gray-800! font-bold"} `,
                                input: "placeholder:text-gray-400 dark:placeholder:text-gray-200 placeholder:text-lg"
                            }}
                            {...register("rePassword")}


                            //   {...register("rePassword", {
                            //     required: { value: true, message: "Please enter a valid password" },
                            //     pattern: { value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, message: "your password is not valid" },
                            //     validate: (value) => value === password || "passwords do not match"
                            // })}
                            isRequired
                            isInvalid={errors.rePassword}
                            errorMessage={errors.rePassword?.message}
                            label=" Confirm Password "
                            labelPlacement="outside"
                            autoComplete="new-password"
                            placeholder="Enter your repassword"
                            type={showw ? "text" : "password"}
                            endContent={
                                <button type="button" onClick={() => setShoww(!showw)}>
                                    {showw ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            } />

                        {/* 
                <Controller
                    name="dateOfBirth"
                    control={control}
                    rules={{
                        validate: function (value) {
                            const today = new Date();
                            const birthDate = new Date(value);
                            if (today.getFullYear() - birthDate.getFullYear() >= 18) {
                                return true;
                            } else {
                                return "must be 18 or older";
                            }

                        }
                    }}
                    render={({ field }) => (<div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <DatePicker
                            value={field.value ? new Date(field.value) : null}  // حوّل string لـ Date object للعرض
                            onChange={(val) => {
                                if (!val) return field.onChange(null);
                                const dateValue = `${val.year}-${String(val.month).padStart(2, '0')}-${String(val.day).padStart(2, '0')}`;
                                field.onChange(dateValue); // احفظ string في RHF
                            }}
                            isInvalid={!!errors.dateOfBirth}
                            errorMessage={errors.dateOfBirth?.message}
                            label="Date of Birth"
                            placeholder="Select your birth date"
                        />
                    </div>
                    )}





                /> */}


                        {/* <Input
                    classNames={{
                        label: "text-xl! text-[#09c]! font-bold",
                        input: "text-[#09c]"
                    }}
                    {...register("dateOfBirth", {
                        validate: function name(value) {
                            const today = new Date();
                            const birthDate = new Date(value);

                            if (today.getFullYear() - birthDate.getFullYear() >= 18) {

                                return true;

                            } else {
                                return "must be 18 or older";
                            }

                        }
                    })}
                    isRequired
                    isInvalid={errors.dateOfBirth}
                    errorMessage={errors.dateOfBirth?.message}
                    label="  your age "
                    labelPlacement="outside"
                    autoComplete="new-password"
                    placeholder="Enter your date"
                    type="date"
                /> */}
                        <Controller
                            name="dateOfBirth"
                            control={control}
                            render={function ({ field }) {

                                return <DatePicker className="w-full" label="Birth date"
                                    {...field}
                                    isInvalid={errors.dateOfBirth}
                                    errorMessage={errors.dateOfBirth?.message}



                                />

                            }
                            }



                        />
                        <Controller
                            name="gender"
                            control={control}


                            render={({ field }) => (


                                <Select
                                    classNames={{
                                        label: "text-xl text-[#09c] font-boldtext-xl! dark:text-white! text-gray-800! font-bold",
                                        trigger: "placeholder:text-gray-400 dark:placeholder:text-gray-200 placeholder:text-lg",
                                        value: "placeholder:text-gray-400 dark:placeholder:text-gray-200 placeholder:text-lg",
                                    }}
                                    {...field}
                                    label="Gender"
                                    labelPlacement="outside"
                                    placeholder="Select a gender"
                                    selectedKeys={field.value ? [field.value] : []}
                                    isInvalid={errors.gender}
                                    errorMessage={errors.gender?.message}





                                >
                                    {/* {console.log(errors)} */}

                                    <SelectItem key="male">Male</SelectItem>
                                    <SelectItem key="female">Female</SelectItem>
                                </Select>

                            )}
                        />

                        <div className="flex gap-2 w-full flex-col ">
                            <Button
                                disabled={isSubmitting || !isValid}
                                isLoading={isSubmitting}
                                color="primary"
                                type="submit"
                            >
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </Button>



                        </div>
                        <Link className="text-blue-600 underline" to="/login">Already have an account</Link>
                    </Form>
                </div>

            </div>
        </>
    )
}
