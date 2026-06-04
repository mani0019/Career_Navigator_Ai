import { use, useContext, useEffect } from "react";
import { AuthContext } from "../auth.context.jsx";
import {login ,register,logout,getMe} from "../services/auth.api.js";

export const useAuth =()=>{
    const {user,setUser,loading,setLoading} = useContext(AuthContext)

    const handleLogin = async (email,password)=>{
        setLoading(true)
        try{
        
         const data = await login({email,password})
         setUser(data.user)
         return true
        }catch(err){
            console.log(err)
            return false
        }finally{
            setLoading(false)
        }
        
    }
    const handleRegister = async (name,email,password)=>{
        setLoading(true)
        try{
            const data = await register({username:name,email,password})
            setUser(data.user)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }
    const handleLogout = async ()=>{
        try{
        setLoading(true)
        await logout()
        setUser(null)
        }catch(err){
            console.log(err)
        }finally{
        
        setLoading(false)
    }}
  
    
    return {user,loading,handleLogin,handleRegister,handleLogout}
}

export default useAuth;
