import { createContext, useState } from "react";
export const AppContext =createContext();

export default function AppContextProvider({children})
{
    const [assignments,setassignments]=useState([]);
    const[reguser,setreguser]=useState(true);
     
    const value={
        assignments,
        setassignments,
        reguser,
        setreguser,
       
    }

    return <AppContext.Provider value={value}>
    {children}
   </AppContext.Provider>
}
