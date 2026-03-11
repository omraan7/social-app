import React from 'react'
import file from "../../assets/ff.jpeg"

export default function Intro() {
  return (
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
                  src={file}
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className=" dark:text-white font-semibold">Mohamed Omran</p>
                  <p className="text-sm dark:text-white/70">Front-End Developer</p>
                </div>
              </div>
            </div>

          </div>
        </div>  )
}
