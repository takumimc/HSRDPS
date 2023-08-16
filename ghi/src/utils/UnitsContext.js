import { createContext, useState } from "react";

export const UnitContext = createContext(null)

export default function UnitContextProvider({children}) {
    const [party, setParty] = useState([])
    const [enemy, setEnemy] = useState([])
    return(
        <UnitContext.Provider value={{party,setParty,enemy,setEnemy}}>
            {children}
        </UnitContext.Provider>
    )
}
