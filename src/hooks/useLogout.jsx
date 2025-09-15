import { useContext } from "react"
import {protectedApi} from "../Service/api"
import { AuthContext } from "../Component/AuthProvider/AuthProvider"
import { useNavigate } from "react-router-dom"

const useLogout = () => {

    const {setLogin} = useContext(AuthContext)
    const navigate = useNavigate()
    const logoutApi = async () =>{
        try{
            const response = await protectedApi.post("/auth/log-out")
            if(response.status == 200){
                setLogin(false)
                navigate("/")
                localStorage.removeItem("User Detail")
            }
            
        }catch(error){
            console.log(error)
        }
    }

    return logoutApi
}


export default useLogout