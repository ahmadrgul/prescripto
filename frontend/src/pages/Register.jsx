import React from 'react'

const Register = () => {
  return (
    <main className="flex items-center justify-center font-outfit h-screen">
        <div className="w-[570px] border border-[#D4D4D4] py-14 px-12 rounded-2xl">
            <h1 className="text-3xl text-[#4B5563] font-medium mb-2">Create Account</h1>
            <h3 className="text-[#4B5563] text-lg">Please sign up to book appointment</h3>
            <form className="my-10 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="firstname" className="text-[#4B5563] text-xl">First Name</label>
                    <input type="firstname" id="firstname" name="first_name" className="border-[#DADADA] border h-14 w-full rounded-lg"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[#4B5563] text-xl">Email</label>
                    <input type="email" id="email" name="email" className="border-[#DADADA] border h-14 w-full rounded-lg"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-[#4B5563] text-xl">Password</label>
                    <input type="password" id="password" name="password" className="border-[#DADADA] border h-14 w-full rounded-lg"/>
                </div>
                <input type="submit" value="Login" className="bg-primary text-gray-100 text-xl font-medium h-14 w-full rounded-lg mt-4" />
            </form>
            <p className="text-xl text-[#4B5563]">Already have an account? <a href="/login" className="underline text-primary">Login Here</a></p>
        </div>
    </main>
  )
}

export default Register;
