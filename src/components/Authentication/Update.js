import "./signup.css";
import React, { useRef, useState } from "react"
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export default function Update() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {CurrentUser,UpdatePassword,UpdateEmail}  = useAuth();
    const [loading,setLoading]=useState(false);
    const [err,setErr]=useState("");
    const history=useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        setErr("")
        setLoading(true);
        if(passwordConfirmRef.current.value!==passwordRef.current.value){
            return setErr("password do not match")
        }
        
        const promises =[]
        if(emailRef.current.value!==CurrentUser.email){
            promises.push(UpdateEmail(emailRef.current.value))
        }
        if(passwordRef.current.value){
            promises.push(UpdatePassword(passwordRef.current.value))
        }
        Promise.all(promises).then(()=>{
            history.push('/');
        }).catch(()=>{
            setErr("Failedd to upadte account");
        }).finally(()=>{
        setLoading(false);
        })
    }
    // console.log("hgffhf")
    return (
        <div className="signup">
            <form onSubmit={handleSubmit}>
                {setErr && <h1 style={{color:"red"}}>{err}</h1>}
                {/* {CurrentUser.email} */}
                <h2>Upadte</h2>
                E-mail :<input type="email" ref={emailRef} defaultValue={CurrentUser.email}/>
                <br />
                Password :<input type="password" ref={passwordRef}  placeholder="Leave blank to keep the same"/>
                <br />
                Confirm Password :<input type="password" ref={passwordConfirmRef}  placeholder="Leave blank to keep the same"/>
                <br />
                <button disabled={loading} type="submit">UPDATE</button>
                <div className="Account"> <Link to="/user"> cencel</Link></div>
            </form>
        </div>
    )
}
