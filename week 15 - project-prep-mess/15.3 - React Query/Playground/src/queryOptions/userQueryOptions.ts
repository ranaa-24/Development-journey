import { queryOptions } from "@tanstack/react-query";

export default function createUserQueryOptions(id: number){
    return queryOptions({
    queryKey: ['user', id],     /// will create a different queryy for different ids
    queryFn: async () => {
      // await new Promise(p => setTimeout(p, 2000));
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      return await res.json();
    }, 
    staleTime: 0,  // default
  })
}