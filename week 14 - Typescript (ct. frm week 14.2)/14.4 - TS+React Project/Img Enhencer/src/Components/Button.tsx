interface ButtonProps {
    text: string;
}

function Button({ text }: ButtonProps) {
    return (
        <button className="animate-fade shadow-[inset_0_0_0_2px_#fff] px-4 py-2.5 lg:px-8 lg:py-3.5 rounded-full tracking-wider lg:tracking-widest uppercase font-bold bg-transparent hover:bg-hover hover:text-white dark:text-neutral-200 transition duration-200 text-xs sm:text-sm lg:text-base cursor-pointer active:bg-hover">
            {text}
        </button>
    )
}

export default Button