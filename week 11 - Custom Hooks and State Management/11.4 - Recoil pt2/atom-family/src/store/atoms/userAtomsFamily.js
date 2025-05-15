import { atomFamily} from 'recoil'

export const usersAtomFamily = atomFamily({
  key: 'usersAtomFamily',
  default: async (uid) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${uid}`);
    return await res.json();
  }
})