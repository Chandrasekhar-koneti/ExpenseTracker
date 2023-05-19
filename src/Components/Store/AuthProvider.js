import { useState } from "react"
import AuthContext from "./AuthContext"

const AuthContextProvider=(props)=>{
    const initailtoken=localStorage.getItem('token')
    const[token,setToken]=useState(initailtoken)

    const userIsLoggedIn=!!token

    const loginHandler=(token,email)=>{
        setToken(token)
        localStorage.setItem('token',token)
        localStorage.setItem('email',email)
    }

   
        const LogoutHandler=()=>{
            setToken(null)
                localStorage.removeItem('token')
                localStorage.removeItem('email')
        }

        const contextvalue={
            token:token,
            isLoggedIn:userIsLoggedIn,
            login:loginHandler,
            logout:LogoutHandler
        }
        return (<AuthContext.Provider value={contextvalue}>{props.children}</AuthContext.Provider>)
}
 export default AuthContextProvider