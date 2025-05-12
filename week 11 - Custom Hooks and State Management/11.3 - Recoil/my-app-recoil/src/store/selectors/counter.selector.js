import { selector } from "recoil";
import { counterAtom } from "../atoms/counter";

export const isEvenState = selector({
    key : 'isEvenState', 
    get : ({get}) => {
        const currentCounter = get(counterAtom);    // it access another atom or selector
        return currentCounter % 2 === 0;    // so if the counter remain same like +2 then the state of this selector remains true
    }
})
