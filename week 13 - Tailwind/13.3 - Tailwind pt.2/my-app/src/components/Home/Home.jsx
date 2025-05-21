import Sidemenu from "../Sidebar/Sidemenu"
import banner from '../../assets/banner.jpg'
import profilePic from '../../assets/pfp.jpg'
import Carousel from "../DaisyUI/Carousel"
import Menu from "../DaisyUI/Menu"
import { DarkModeContext } from "../../context/darkMode.context"
import { useContext, useEffect } from "react"

const Home = () => {
    const {mode, setMode} = useContext(DarkModeContext);

    return (
        <div className={`main-container flex text-white h-screen overflow-y-scroll ${mode == 'dark' && 'dark'}`}>
            <Sidemenu/>

            <div className="w-full bg-main-bg text-black relative dark:bg-black">
                <img src={banner} alt="banner" className="w-full h-30 bg-cover bg-center" />

                <div className="lg:h-[calc(100%-120px)] h-full grid grid-cols-1 new-br:grid-cols-7">  

                    <div className="lg:col-span-2 h-full mx-auto">
                        <div className="profile h-90 w-64 -translate-y-8 bg-main-card dark:bg-main-bg rounded-xl flex justify-center p-2 items-center flex-col shadow-[0px_2px_7px_1px_rgba(0,_0,_0,_0.1)]">
                            <img src={profilePic} alt="pfp" className="size-24 bg-cover bg-center rounded-xl mb-4"/>
                            <h1 className="font-bold text-lg font-sans my-1">Ruhii Sharma</h1>
                            <p className="font-medium text-gray-950/50">ruhisharma@gmail.com</p>
                            <p className="font-medium text-gray-950/50">+91 88122911</p>
                            <p className="font-medium text-gray-950/50">Kolkata, WB</p>
                        </div>
                    </div>

                    <div className="lg:col-span-3 h-full flex justify-center items-center flex-col bg-main-bg dark:bg-black">
                    <p className="font-thin text-black/40 dark:text-main-bg/40">{"<---Swap--->"}</p>
                        <Carousel/>
                    </div>

                    <div className="lg:col-span-2 h-full flex justify-center items-end px-5 bg-main-bg dark:bg-black">
                        <Menu/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
