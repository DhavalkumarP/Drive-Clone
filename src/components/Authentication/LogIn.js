import "./signup.css";
import React, { useRef, useState } from "react"
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";


function LogIn() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const {login}  = useAuth();
    const [loading,setLoading]=useState(false);
    const [err,setErr]=useState("");
    const history=useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setErr("")
            await login(emailRef.current.value, passwordRef.current.value);
            setLoading(true);
            history.push("/")
        }
        catch{
            setErr("err")
        }
        setLoading(false);
    }
    return (
        <div className="LogIn">
            <form onSubmit={handleSubmit}>
                {setErr && <h1 style={{color:"red"}}>{err}</h1>}
                {/* {CurrentUser.email} */}
                E-mail :<input type="email" ref={emailRef} />
                <br />
                Password :<input type="password" ref={passwordRef} />
                <br />
                <button disabled={loading} type="submit">SUBMIT</button>
                <div className="Account"><Link to="/forgotpassword"> Forgot password</Link></div>
                <div className="Account">Need an Account ? <Link to="/signup"> SignUp</Link></div>
            </form>
        </div>
    )
}

export default LogIn;