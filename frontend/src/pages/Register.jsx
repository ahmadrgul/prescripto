import React from 'react'
import { Link } from 'react-router';

const Register = () => {
  return (
    <main className="flex items-center justify-center font-outfit h-screen">
        <div className="w-[570px] border border-[#D4D4D4] py-14 px-12 rounded-2xl">
            <h1 className="text-3xl text-[#4B5563] font-medium mb-2">Create Account</h1>
            <h3 className="text-[#4B5563] text-lg">Please sign up to book appointment</h3>
            <form onSubmit={handleRegister} className="my-10 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[#4B5563] text-xl">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Enter your Email"
                        className="border-[#DADADA] border h-14 px-2 w-full text-lg rounded-lg"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-[#4B5563] text-xl">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Enter your password"
                        className="border-[#DADADA] border h-14 px-2 text-lg w-full rounded-lg"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <input 
                    type="submit" 
                    value="Login"
                    disabled={mutation.isPending} 
                    className="bg-primary disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-gray-100 text-xl font-medium h-14 w-full rounded-lg mt-4" />
            </form>
            <p className="text-xl text-[#4B5563]">Already have an account? <Link to="/login" className="underline text-primary">Login</Link></p>
        </div>
    </main>
  )
}

export default Register;
