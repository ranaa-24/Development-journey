import { useDebugValue, useEffect, useState } from 'react'

function useFetch(url) {
    const [data, setData] = useState({});
    const [isLoadiung, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            // await new Promise((resolve) => setTimeout(resolve, 2000)); // airtifical delay 
            const res = await fetch(url);
            const json = await res.json();
            setData(json)
            setIsLoading(false);

        }

        fetchData();
    }, [url]);

    return {data, isLoadiung};
}

export default useFetch;