import { Button, DatePicker, Form, Input, Select, SelectItem } from "@heroui/react";

import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { authcontext } from "../../context/Authcontext";
const cshema = z.object({

  email: z.string("must be a string").email("please enter a valid email").regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "your email SDSAis not valid"),
  password: z.string("must be a string").min(6, "must be at least 6 characters").max(20, "must be at most 20 characters").regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "your password is not valid"),





})

export default function Login() {


  const { token, settoken } = useContext(authcontext)


  const navigate = useNavigate()

  // const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitted, isValid, }, watch, control } = useForm({
    defaultValues: {
    
      email: "",
      password: "",
      
    }, mode: "all",
    resolver: zodResolver(cshema)
  });



  async function handleSubmitForm(x) {
    try {
      // setIsLoading(true);
      await toast.promise(
        axios.post(`${import.meta.env.VITE_API_URL}users/signin`, x),
        {
          loading: 'Waiting    ',
          success: function (x) {
            navigate("/posts")
            console.log(x.data.data.token);
            
            settoken(x.data.data.token)
            localStorage.setItem("token",x.data.data.token)
        
            return x.data.message;

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
            className=" w-full self-center  mx-auto p-10 mt-5 flex flex-col gap-4 dark:bg-gray-950 dark:text-white  bg-white shadow-teal-950/20 shadow-md rounded-2xl"
          >
            <h2 className="text-5xl font-bold text-zinc-800 dark:text-white italic self-center">Login</h2>

            <Input
              classNames={{
                label: "text-xl! dark:text-white! text-gray-800! font-bold",
                input: "placeholder:text-gray-400 dark:placeholder:text-gray-200 placeholder:text-lg"
              }}

              {...register("email")}

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
                 label: "text-xl! dark:text-white! text-gray-800! font-bold",
                input: "placeholder:text-gray-400 dark:placeholder:text-gray-200 placeholder:text-lg"
              }}
              {...register("password")}


              isInvalid={errors.password}
              isRequired
              errorMessage={errors.password?.message}
              label=" Password "
              labelPlacement="outside"
              autoComplete="new-password"
              placeholder="Enter your password"
              type="password"
            />


            <div className="flex gap-2 w-full flex-col ">
              <Button
                disabled={isSubmitting || !isValid}
                isLoading={isSubmitting}
                color="primary"
                type="submit"
              >
                {isSubmitting ? "Login..." : "Submit"}
              </Button>


            </div>
                        <Link className="text-blue-600 underline" to="/register"> create account</Link>

          </Form>

        </div>

      </div>

    </>
  )
}
