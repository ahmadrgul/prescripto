import { assets } from "../assets/assets_frontend/assets";

const Contact = () => {
  return (
    <main>
        <h1 className='text-center text-[#4B5563] font-semibold text-3xl mb-20'>CONTACT <span className='text-[#1F2937]'>US</span></h1>
        <div className="flex flex-col items-center md:flex-row md:justify-center gap-20">
            <div>
                <img
                    src={assets.contact_image}
                    className="w-[550px]"
                />
            </div>
            <div className="font-outfit w-1/2 text-[#4B5563] flex flex-col justify-center">
                <h3 className="text-xl font-semibold mb-8">OUR OFFICE</h3>
                <p className="mb-0.5">54709 Willms Station</p>
                <p className="mb-10">Suite 350, Washington, USA</p>
                <p className="mb-0.5">Tel: (415) 555‑0132</p>
                <p className="mb-10">Email: hi@prescripto.com</p>
                <h3 className="text-xl font-semibold mb-6">CAREERS AT PRESCRIPTO</h3>
                <p>Learn more about our teams and job openings.</p>
                <button className="mt-10 w-fit px-6 py-4 hover:bg-primary hover:border-transparent hover:text-gray-100 border-[#4B5563] border">Explore Jobs</button>
            </div>
        </div>
    </main>
  )
}

export default Contact;