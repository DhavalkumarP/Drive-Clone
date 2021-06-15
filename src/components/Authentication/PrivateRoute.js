import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function PrivateRoute({component:Component,...rest}) {
    const {CurrentUser} =useAuth()
    return (
        <Route {...rest}
        render={props =>{
            return CurrentUser ? <Component {...props}/> : <Redirect to='/login'/>
        }}
        >
        </Route>
    )
}
