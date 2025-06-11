import { useEffect, useState } from "react"

function useFetch(url) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(url);
                if(!res.ok) throw new Error("Bad Request, not OK");
                const json = await res.json();
                setData(json);
            } catch(err){
                // some freaky error handling 
                console.log("Error : " + err.message);
            }finally{
                setIsLoading(false);
            }
        }

        fetchData();

    }, [url])

    return {data, isLoading};
}

export default useFetch