import { useEffect, useState, useRef } from 'react';
import song from '../assets/bg_music.mp3'
import { On, Of } from '../utils/SoundIcons';

function Music() {
    // only createing a single audio ref
    const audioRef = useRef(new Audio(song));
    const [isPlaying, setIsPlaying] = useState(false);

    //configure the song on mount 
    useEffect(() => {
        const audio = audioRef.current;
        audio.loop = true;
        audio.volume = 0.3;

        // when we move to other route make sure the audio is paused
        return () => {
            audio.pause();
        }
    }, []);

    const handlePlay = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(pre => !pre);
    }


    // dont directly use handlePlay coz, calling a funtion inside a funtion (ie. this handler funtion) will cause a stale closure
    const handleKeypress = (event: KeyboardEvent) => {
        const audio = audioRef.current;
        if (event.altKey && event.key.toLocaleLowerCase() === 'm') {
           if(audio.paused){
            audio.play();
            setIsPlaying(true);
           }
           else{
            audio.pause();
            setIsPlaying(false);
           }
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeypress);

        return () => {
            window.removeEventListener('keydown', handleKeypress);
        }

    }, []);


    return (
        <div onClick={handlePlay} className='cursor-pointer text-center hover:text-secondary-paint transition duration-300'>
            {isPlaying ? <On /> : <Of />}
        </div>
    )
}

export default Music