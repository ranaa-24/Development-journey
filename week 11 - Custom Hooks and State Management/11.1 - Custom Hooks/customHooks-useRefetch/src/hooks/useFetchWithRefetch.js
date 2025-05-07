import React, { useCallback, useEffect, useState } from 'react'

function useFetchWithRefetch(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    async function fetchData() {
        try {
            setLoading(true);
            const res = await fetch(url);
            const json = await res.json();
            setData(json);
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, [url]);      // refetchs when triger changes 

    const refetch = useCallback(() => {
        fetchData();
    }, []);

    return { data, loading, refetch }
}

export default useFetchWithRefetch