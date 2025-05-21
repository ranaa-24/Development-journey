import {createContext, useState} from 'react'

const DarkModeContext = createContext({mode : '', setMode : () => {}});

const DarkModeProvider = ({children}) => {
    const [mode, setMode] = useState('light');
    return <DarkModeContext.Provider value={{mode, setMode}}>
        {children}
    </DarkModeContext.Provider>
}


export {
    DarkModeContext, DarkModeProvider
}
