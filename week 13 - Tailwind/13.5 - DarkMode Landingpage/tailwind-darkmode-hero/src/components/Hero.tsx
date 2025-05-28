import { useEffect, useState } from "react"
import { Sun, Moon } from "./icons";
function Hero() {
    const [theme, setTheme] = useState<string>('light');

    useEffect(() => {
        const systemPerfersDark: boolean = window?.matchMedia('(prefers-color-scheme: dark)').matches;
        console.log(systemPerfersDark);

        systemPerfersDark && setTheme('dark');
    }, []);

    useEffect(() => {
        const body = document.getElementsByTagName('body')[0];
        body.classList.toggle('dark');
    }, [theme]);


    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    return (
        <section className="min-h-screen relative flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
            <button onClick={toggleTheme} className="absolute top-6 right-6 p-2 rounded-full bg-gray-200 dark:bg-gray-700 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600">
                {theme === 'light' ? <Moon/> : <Sun/>}
            </button>

            <div className="max-w-7xl mx-auto text-center ">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                    <span className="block h-20 bg-clip-text text-transparent bg-gradient-to-r from-[#626F47] from-60% to-[#A4B465] dark:from-[#F0BB78] dark:from-60% dark:to-[#F5ECD5]">
                        Come on my Land
                    </span>

                    <p className="mt-4 text-lg sm:text-lg max-w-3xl mx-auto leading-relaxed font-medium text-[#3d4617] dark:text-[#fff1de] tracking-normal">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores eos fugiat quam pariatur molestias harum voluptatibus quasi recusandae nulla rem.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                        <a href="#" className="px-8 py-3 border-transparent  text-base font-medium roundedmd text-white dark:bg-[#F0BB78] dark:hover:bg-[#f0bc78dc] bg-[#A4B465] hover:bg-[#a4b465e2] transition-colors duration-300 rounded-md tracking-tight">
                            Start Dancing
                        </a>
                        <a href="#" className="px-8 py-3 border-none  text-base font-medium roundedmd text-white dark:bg-[#f0bc7863] dark:hover:bg-[#f0bc78dc] bg-[#a4b465a6] hover:bg-[#a4b465e2] transition-colors duration-300 rounded-md tracking-tight">
                            I am Done
                        </a>
                    </div>


                </h1>
            </div>

            <div className="absolute inset-0 -z-10 ">
                <div className="absolute top-10 left-1/4 w-72 h-72 bg-[#F0BB78] rounded-full blur-3xl mix-blend-multiply opacity-40 dark:opacity-20 dark:bg-[#A4B465] bottom-1"></div>
            </div>
        </section>


    )
}

export default Hero