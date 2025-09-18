import { Children, createContext, useState } from "react"

const DefaultLayoutContext = createContext(null)

function DefaultLayoutProvider({children}){

    const [backgroundColor, setBackgroundColor] = useState("");

    return (
        <DefaultLayoutContext.Provider value={{backgroundColor,setBackgroundColor}}>
            {children}
        </DefaultLayoutContext.Provider>
    )

}

export {DefaultLayoutContext,DefaultLayoutProvider}