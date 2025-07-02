import { Link } from "react-router"

const PageNotFound = () => {
  return (
    <main className="flex items-center justify-center h-screen font-outfit">
        <div className="w-2xl flex flex-col items-center justify-center gap-6">
            <h1 className="text-[350px] text-primary leading-72 font-semibold ">404</h1>
            {/* <h3 className="text-7xl text-primary font-bold text-center">Page Not Found</h3> */}
            <p className="text-gray-500 text-4xl font-medium text-center">Oops! The page you are looking for cannot be found.</p>
            <Link to="/" className="bg-primary rounded-md px-12 text-white py-3 text-lg">Back to Home</Link>
        </div>
    </main>
  )
}

export default PageNotFound