const Button = ({ text, bgColor, textColor, className }) => {
  return (
    <button className={`${className} bg-${bgColor} cursor-pointer w-fit py-3 px-7 text-${textColor} rounded-full font-outfit text-[18px] flex items-center justify-center`}>
        {text}
    </button>
  )
}

export default Button;