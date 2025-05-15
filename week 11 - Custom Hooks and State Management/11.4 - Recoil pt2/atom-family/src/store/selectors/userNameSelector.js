import { usersAtomFamily } from "../atoms/userAtomsFamily";
import { selectorFamily } from 'recoil'

export const userNameSelector = selectorFamily({
    key: 'userNameSelector',
    get: (uid) => {
        return ({ get }) => {
            const user = get(usersAtomFamily(uid));
            return user.name;
        }
    },
}) 