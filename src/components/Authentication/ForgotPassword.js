
import "./signup.css";
import React, { useRef, useState } from "react"
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
    const emailRef = useRef()
    const {resetPassword}  = useAuth();
    const [loading,setLoading]=useState(false);
    const [Msg,setMsg]=useState("");
    const [err,setErr]=useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setMsg("");
        try {
            setErr("")
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMsg("check email")
        }
        catch{
            setErr("err")
        }
        setLoading(false);
    }
    return (
        <div className="LogIn">
            <form onSubmit={handleSubmit}>
                <h2>Reset Password</h2>
                {Msg && <h1 style={{color:"green"}}>{Msg}</h1>}
                {setErr && <h1 style={{color:"red"}}>{err}</h1>}
                {/* {CurrentUser.email} */}
                E-mail :<input type="email" ref={emailRef} />
                <br />
                <button disabled={loading} type="submit">Reset Password</button>
                <div className="Account">Already Have an Account ? <Link to="/login"> Log In</Link></div>
            </form>
        </div>
    )
}
