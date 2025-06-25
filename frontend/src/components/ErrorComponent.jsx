const ErrorComponent = ({
    title="Oops! Something went wrong",
    message="",
    retry=()=>{},
}) => {
  return (
    <div className="w-full py-4 font-outfit flex flex-col gap-3 justify-center items-center text-gray-700">
      <div className="flex flex-col">
        <h2 className="text-xl font-medium">{title}</h2>
        <p>{message}</p>
      </div>
      <button onClick={retry} className="px-4 w-fit py-1 cursor-pointer box-shadow text-gray-500 border border-gray-200 text-xl rounded-lg">Retry</button>
    </div>
  )
}

export default ErrorComponent;
