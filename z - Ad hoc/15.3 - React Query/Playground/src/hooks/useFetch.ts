import { useEffect, useState } from "react"

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

interface userType{
  name: string,
  email: string, 
}

function useFetch(id: number) {
    const [user, setUser] = useState<userType>({} as userType);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    useEffect(() => {
      async function fn() {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await fetch(`${BASE_URL}/${id}`);
        const {email, name} = await response.json();

        setUser({...user, email, name});
        setIsLoading(false);
      }

      fn();
    }, [id]);


    return {user, isLoading};
}

export default useFetch;

