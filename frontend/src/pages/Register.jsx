import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { addPatient } from '../api/patients';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const registerSchema = yup.object({
    firstname: yup.string().required("Firstname is required"),
    email: yup.string().email("Invalid email address").required("Email is required"),
    password: yup.string().required("Password is required").min(8, "Password must be atleast 8 characters long"),
})

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm({
        resolver: yupResolver(registerSchema),
        mode: "onChange"
    })

    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: addPatient,
        onSuccess: (data) => {
            toast.success(`Thanks for registrating, ${data.first_name}. You can login now`)
            navigate("/login");
        },
        onError: (error) => {
            toast.error(error.message || "Account creation failed")
        }
    })

    const onSubmit = (data) => {
        mutation.mutate(data);
    }

  return (
    <main className="flex items-center justify-center font-outfit h-screen">
        <div className="w-[570px] border border-[#D4D4D4] py-14 px-12 rounded-2xl">
            <h1 className="text-3xl text-[#4B5563] font-medium mb-2">Create Account</h1>
            <h3 className="text-[#4B5563] text-lg">Please sign up to book appointment</h3>
            <form onSubmit={handleSubmit(onSubmit)}  className="my-10 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="firstname" className="text-[#4B5563] text-xl">Firstname</label>
                    <input 
                        type="text" 
                        id="firstname"
                        placeholder="Ahmad"
                        {...register("firstname")}
                        className={`border h-14 px-2 w-full text-lg rounded-lg ${errors.firstname ? "border-red-500 outline-red-500" : "border-[#DADADA] outline-primary"}`}
                    />
                    {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[#4B5563] text-xl">Email</label>
                    <input 
                        type="email" 
                        id="email"
                        placeholder="ahmad@prescripto.com"
                        {...register("email")}
                        className={`border h-14 px-2 w-full text-lg rounded-lg ${errors.email ? "border-red-500 outline-red-500" : "border-[#DADADA] outline-primary"}`}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-[#4B5563] text-xl">Password</label>
                    <input 
                        type="password" 
                        id="password"
                        placeholder="********"
                        {...register("password")}
                        className={`border h-14 px-2 w-full text-lg rounded-lg ${errors.password ? "border-red-500 outline-red-500" : "border-[#DADADA] outline-primary"}`}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>
                <button 
                    type="submit"
                    disabled={mutation.isPending || isSubmitting || !isValid} 
                    className="bg-primary disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-gray-100 text-xl font-medium h-14 w-full rounded-lg mt-4"
                >
                    {mutation.isPending || isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                        <ClipLoader size={20} color="#fff" />
                    Please Wait...
                    </div>) : "Create Account"}
                </button>
            </form>
            <p className="text-xl text-[#4B5563]">Already have an account? <Link to="/login" className="underline text-primary">Login</Link></p>
        </div>
    </main>
  )
}

export default Register;
