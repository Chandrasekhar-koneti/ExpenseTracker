import { Button } from "react-bootstrap"
import { useContext, useEffect, useRef, useState } from "react"
import classes from './Signup.module.css'
import AuthContext from "../Store/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { authActions } from "../Store/Auth-slice"


const SignUp=()=>{
    const dispatch=useDispatch()

    const Authctx=useContext(AuthContext)
    const[isLoading,setisLoading]=useState(false)
    const[isLogin,setisLogin]=useState(true)
    const[error,seterror]=useState(false)
    const History=useNavigate()
    const emailinputref=useRef()
    const passwordref=useRef()
    const Conformpasswordref=useRef()

    const storedToken=localStorage.getItem('tokenID')

    useEffect(()=>{
        dispatch(authActions.login(storedToken))
    },[])

    // const strongRegex= new RegExp(
    //     '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|]).{8,32}$'
    // )

    const switchAuthModeHandler = () => {
        setisLogin((prevState) => !prevState);
      };

    const submitHandler=(e)=>{
        e.preventDefault()
        const enteredemail=emailinputref.current.value
        const enteredpassword=passwordref.current.value
        const enteredconformpassword=Conformpasswordref.current.value

        if(enteredpassword!==enteredconformpassword){
            seterror('password and conform password is not matching')
        }
        if(enteredpassword.length<6){
            seterror('Password should be at least 6 characters')
        }
        // else if(!strongRegex.test(enteredpassword)){
        //     seterror('password should have special characters')
        // }

        setisLoading(true)
        let url 
        
if(enteredpassword === enteredconformpassword){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBhalM_NXSwUwlqwQ5bT1AvnoLsag34f2M'
        }
        fetch(url,{
            method:'POST',
            body:JSON.stringify({
                email:enteredemail,
                password:enteredpassword,
                Conformpassword:enteredconformpassword,
                returnSecureToken:true
            }),
            headers:{
                'Content-Type':'applications/json'
            }
        }).then((res)=>{
            setisLoading(false)
            if(res.ok){
                console.log('signup done')
                return res.json()
            }
            else{
                return res.json().then((data)=>{
                    let errormessage='Authentication failed'
                    if(data && data.error && data.error.message){
                        errormessage=data.error.message
                    }
                    throw new Error(errormessage)
                })
            }
        }).then((data)=>{
            dispatch(authActions.login(data.idToken))
            // Authctx.login(data.idToken)
            console.log(' done')
        }).catch((err)=>{
            alert(err.message)
        })
    }

    return(
        <section className={classes.form}>
            <h1>Sign Up</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>  
                    <label htmlFor="email">Email</label>
                    <input type='email' id="email" required ref={emailinputref} placeholder='Email' />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Password</label>
                    <input type='password' id="password" required  ref={passwordref} placeholder='Password' />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Conform Password</label>
                    <input type='password' id="conformpassword" required ref={Conformpasswordref} placeholder='Conform Password' />
                </div>
                <span>{error}</span>
                <div>
                <Button variant="primary" type="submit" className={classes.btn}>SignUp</Button>
                {isLoading && <p>Sending request...</p>}
                </div>
                <div>
                {!isLoading && <Link to='/'> <Button variant="outline-info" onClick={switchAuthModeHandler} >
                         'Login with existing account</Button></Link> }               
                </div>
            </form>
        </section>
    )
}

export default SignUp