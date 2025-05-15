import { selector } from "recoil";
import userId from "../atoms/userId";

const currentUserName = selector({
    key : "currentUserName", 
    get : async ({get}) => {
        const uid = get(userId);
        await new Promise((resolve) => setTimeout(resolve, 1000));  // a artificial waiting 
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${uid}`);
        return await res.json(); 
    }
})

export default currentUserName;