import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { EyeOff } from "lucide-react";
import { Eye } from "iconsax-reactjs";
import { Input } from "@heroui/react";

const schema = z.object({
    password: z.string("must be a string").min(6, "must be at least 6 characters").max(20, "must be at most 20 characters").regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "your password is not valid"),
    newPassword: z.string("must be a string").min(6, "must be at least 6 characters").max(20, "must be at most 20 characters").regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "your password is not valid"),
    confirmPassword: z.string(),
})
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export default function ChangePassword() {
    const [show, setShow] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {
            password: "",
            newPassword: "",

        },
        resolver: zodResolver(schema),
    });

    async function onSubmit(data) {
        console.log(data);

        try {
            const res = await axios.patch(
                "https://route-posts.routemisr.com/users/change-password",
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
            console.log(res);

             localStorage.setItem("token", res.data.token);

            toast.success("Password updated successfully ✅",);

            reset();
        } catch (err) {
            toast.error(
                "  your old password is not true"
            );
            console.log(err);

        }
    }

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-5">Change Password</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* current password */}
                <div>
                    <label className="text-gray-700 mb-3" htmlFor="old password">Current password</label>
                    <Input
                        id="old password"
                        type={show ? "text" : "password"}
                        placeholder="Current password"
                        {...register("password")}
                        className="w-full border rounded-lg p-2"
                        required={true}
                        endContent={
                            <button type="button" onClick={() => setShow(!show)}>
                                {show ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        }
                    />
                    {errors.password && (
                        <p className="text-red-500 mt-2 text-sm  ">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* new password */}
                <div>
                    <label className="text-gray-700 mb-3" htmlFor="new password">new password</label>

                    <input
                        id="new password"
                        type="password"
                        placeholder="New password"
                        {...register("newPassword")}
                        className="w-full border rounded-lg p-2"
                    />
                    {errors.newPassword && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.newPassword.message}
                        </p>
                    )}
                </div>

                {/* confirm password */}
                <div>
                    <label className="text-gray-700 mb-3" htmlFor="confirm password">Confirm password</label>
                    <input
                        id="confirm password"
                        type="password"
                        placeholder="Confirm new password"
                        {...register("confirmPassword")}
                        className="w-full border rounded-lg p-2"
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                <button
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    {isSubmitting ? "Saving..." : "Update Password"}
                </button>
            </form>
        </div>
    );
}