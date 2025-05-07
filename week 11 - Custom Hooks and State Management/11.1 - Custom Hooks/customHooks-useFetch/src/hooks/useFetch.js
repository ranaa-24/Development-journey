import { useEffect, useState } from "react";

function useFetch(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // we cant make the callback fn acync 
    useEffect(() => {
        async function fetchData() {
            setLoading(true);       // loading is true and the data is null
            try{
                const res = await fetch(url);
                if(!res.ok) throw new Error("Response Not OK");
                const json = await res.json();
                setData(json);
            } catch(err){
                console.log(err.message);   
            }
            finally{
                setLoading(false);
            }
        }

        fetchData();
    }, [url]);

    return {data, loading}
}

export default useFetch