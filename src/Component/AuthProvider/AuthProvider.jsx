import { Children, createContext, useState } from "react";

const AuthContext = createContext(null)

function AuthProvider({children}){

    const [isLogin, setLogin] = useState(false)
    
    return(
        <AuthContext.Provider value={{isLogin,setLogin}}>
            {children}
        </AuthContext.Provider>
    )

}

export {AuthContext, AuthProvider}