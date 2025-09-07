import video from '../assets/bg_video.mp4';
import Music from "./Music";
import Button from './Button';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
 
  // will display the actaul content when video loads 
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;

    const handleLoaded: () => void = () => {
      setIsVideoLoaded(true);
    }

    if (video) {
      video.addEventListener("canplaythrough", handleLoaded);
    }

    return () => {
      if (video) {
        video.removeEventListener("canplaythrough", handleLoaded);
      }
    };

  }, []);


  return (
    <>
      {!isVideoLoaded &&
        <div id="loading-screen" className="loading-screen">
          <div className="loader">
          </div>
        </div>
      }

      {/* // we must hide this, conditional rendering wont work.. if we first render a loading not the video, then how would the video load??  */}
      <div className={`relative w-full h-screen font-main overflow-hidden ${isVideoLoaded ? "block" : "hidden"}`}>

        <video
          ref={videoRef}
          src={video}
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
        </video>

        <div aria-label='overlay' className="absolute top-0 left-0 w-full h-full bg-[#0000002e]"></div>

        <div className="fixed top-5 right-8 sm:right-10 lg:right-12 z-50 text-white" title="Alt+m"><Music /></div>

        <div className="absolute text-white h-full w-full flex justify-center items-center p-8 mx-auto sm:p-12">
          <div className="max-w-lg sm:max-w-lg lg:max-w-2xl text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight sm:tracking-normal mb-2 sm:mb-3.5 animate-fade-up animate-once animate-duration-1500">Let the Magic Last <span className="text-secondary-paint">Forever</span></h1>
            <p className="text-xs sm:text-sm lg:text-lg text-neutral-300 tracking-tight font-medium mb-6 lg:mb-10 animate-fade animate-once animate-duration-1000">Effortlessly enhance your photos — because every memory deserves to shine.</p>
            <Link to={'/home'}><Button text={"Get Started"} /></Link>
          </div>
        </div>

      </div>
    </>
  )
}

export default Home