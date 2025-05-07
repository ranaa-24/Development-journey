import { useEffect, useState } from "react"

function useOnlineStatus() {
    // it need the used component to re render on status change
    const [isOnline, setIsOnline] = useState(true);

    // register a event handler on mount on window obj
    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
        }

        const handleOffline = () => {
            setIsOnline(false);
        }

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        }

    }, []);

    return isOnline;
}

export default useOnlineStatus