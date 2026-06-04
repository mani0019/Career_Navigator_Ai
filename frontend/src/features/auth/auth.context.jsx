// auth.context.jsx
import { createContext, useState, useEffect } from "react";
import { getMe } from "./services/auth.api.js"; // ← import here

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true) // ← true

    // ✅ runs once when app starts, not on every Protected mount
    // auth.context.jsx
useEffect(() => {
    const getAndSetUser = async () => {
        console.log("1. getMe starting...")
        try {
            const data = await getMe()
            console.log("2. getMe success:", data)
            setUser(data.user)
        } catch (err) {
            console.log("3. getMe failed:", err.response?.status)
            setUser(null)
        } finally {
            console.log("4. finally — setting loading false")
            setLoading(false)
        }
    }
    getAndSetUser()
}, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}