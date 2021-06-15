import React, { useState } from 'react'
import "./signup.css";
import { useAuth } from '../../contexts/AuthContext'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

export default function Profile() {
    const {CurrentUser,logOut}=useAuth();
    const [err,setErr]=useState("")
    const history=useHistory();
    async function handleLogOut(){
        setErr("");
        try{
            await logOut();
            history.push('/login')
        }
        catch{
            setErr("Something went wrong")
        }
    }
    return (
        <div className="dashboard">
            {err}
           <h2>Profile</h2>
          <div><strong>e-mail :</strong> {CurrentUser.email}</div>
          <div><Link to="update">Update Profile</Link></div>
          <div onClick={handleLogOut}>LogOut</div>
        </div>
    )
}
