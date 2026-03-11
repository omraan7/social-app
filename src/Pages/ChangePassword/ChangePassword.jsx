import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { EyeOff } from "lucide-react";
import { Eye } from "iconsax-reactjs";
import { Input } from "@heroui/react";

const schema = z
  .object({
    password: z
      .string()
      .min(8, "must be at least 8 characters")
      .max(20, "must be at most 20 characters")
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Password must contain uppercase, lowercase, and a number"
      ),
    newPassword: z
      .string()
      .min(8, "must be at least 8 characters")
      .max(20, "must be at most 20 characters")
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Password must contain uppercase, lowercase, and a number"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ChangePassword() {
  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const toggleShow = (field) =>
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schema),
  });

  async function onSubmit(data) {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}users/change-password`,
        {
          password: data.password,
          newPassword: data.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      localStorage.setItem("token", res.data.token);
      toast.success("Password updated successfully ✅");
      reset();
    } catch (err) {
      toast.error("Your old password is incorrect");
      console.log(err);
    }
  }

  return (
    <div className="max-w-md mx-auto text-gray-700 bg-white dark:bg-gray-800 dark:text-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-5">Change Password</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Current Password */}
        <div>
          <label className="text-gray-700 dark:text-white block mb-1" htmlFor="currentPassword">
            Current Password
          </label>
          <Input
            id="currentPassword"
            type={show.current ? "text" : "password"}
            placeholder="Current password"
            {...register("password")}
            className="w-full"
            endContent={
              <button type="button" onClick={() => toggleShow("current")}>
                {show.current ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />
          {errors.password && (
            <p className="text-red-500 mt-1 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className="text-gray-700 dark:text-white block mb-1" htmlFor="newPassword">
            New Password
          </label>
          <Input
            id="newPassword"
            type={show.new ? "text" : "password"}
            placeholder="New password"
            {...register("newPassword")}
            className="w-full"
            endContent={
              <button type="button" onClick={() => toggleShow("new")}>
                {show.new ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="text-gray-700 dark:text-white block mb-1" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            type={show.confirm ? "text" : "password"}
            placeholder="Confirm new password"
            {...register("confirmPassword")}
            className="w-full"
            endContent={
              <button type="button" onClick={() => toggleShow("confirm")}>
                {show.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Saving..." : "Update Password"}
        </button>

      </form>
    </div>
  );
}