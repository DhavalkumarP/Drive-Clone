import React, { useContext, useEffect, useState } from 'react';
import {auth} from '../FIREBASE'
const AuthContext=React.createContext()

export function useAuth() {
    return useContext(AuthContext);
}


export function AuthProvider({children}) {
    const [CurrentUser,setCurrentUser]=useState();
    const [loading,setLoading]=useState(false)

    function signup(email,password){
        return auth.createUserWithEmailAndPassword(email,password)
    }

    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password)
    }
    function logOut(email,password){
        return auth.signOut()
    }
    function resetPassword(email){
        return auth.sendPasswordResetEmail(email)
    }
    function UpdateEmail(email){
        return CurrentUser.updateEmail(email)
    }
    function UpdatePassword(password){
        return CurrentUser.updatePassword(password)
    }

    useEffect(()=>{
        const unsubscribe=auth.onAuthStateChanged(user=>{
            setCurrentUser(user)
            setLoading(true);
        })
        return unsubscribe
    },[])

    const value ={
        CurrentUser,
        login,
        logOut,
        signup,
        resetPassword,
        UpdateEmail,
        UpdatePassword
    }

    return(
        <AuthContext.Provider value={value}>
             {loading && children}
        </AuthContext.Provider>
    )
}