import "./signup.css";
import React, { useRef, useState } from "react"
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";


function SignUp() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup}  = useAuth();
    const [loading,setLoading]=useState(false);
    const [err,setErr]=useState("");
    const history=useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(passwordRef.current.value)
        console.log(passwordConfirmRef.current.value)
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setErr("password not matched")
            // console.log(setErr)
        }
        try {
            setErr("")
            await signup(emailRef.current.value, passwordRef.current.value);
            setLoading(true);
            history.push("/")
        }
        catch{
            setErr("err")
        }
        setLoading(false);
    }
    // console.log("hgffhf")
    return (
        <div className="signup">
            <form onSubmit={handleSubmit}>
                {setErr && <h1 style={{color:"red"}}>{err}</h1>}
                {/* {CurrentUser.email} */}
                E-mail :<input type="email" ref={emailRef} />
                <br />
            Password :<input type="password" ref={passwordRef} />
                <br />
            Confirm Password :<input type="password" ref={passwordConfirmRef} />
                <br />
                <button disabled={loading} type="submit">SUBMIT</button>
                <div className="Account">Already have an Account ? <Link to="/login"> Log-In</Link></div>
            </form>
        </div>
    )
}

export default SignUp;