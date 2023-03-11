import { useContext, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../Store/AuthContext'
import classes from './Signin.module.css'
const SignIn=()=>{    
    const Authctx=useContext(AuthContext)
    const History=useNavigate()
    const emailinputref=useRef()
    const passwordref=useRef()
    const[isLoading,setisLoading]=useState(false)
    const[isLogin,setisLogin]=useState(true)
    const[error,seterror]=useState(false)

    const switchAuthModeHandler = () => {
        setisLogin((prevState) => !prevState);
      };

      const submitHandler=(e)=>{
        e.preventDefault()
        const enteredemail=emailinputref.current.value
        const enteredpassword=passwordref.current.value
        let url
        if(isLogin){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBhalM_NXSwUwlqwQ5bT1AvnoLsag34f2M'
        }
        fetch(url,{
            method:'POST',
            body:JSON.stringify({
                email:enteredemail,
                password:enteredpassword,
                returnSecureToken:true
            }),
            headers:{
                'Content-Type':'applications/json'
            }
        }).then((res)=>{
            setisLoading(false)
            if(res.ok){
                console.log('signuuup done')
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
            Authctx.login(data.idToken)
            console.log('login done')
        }).catch((err)=>{
            alert(err.message)
        })
    }
      

return(
    <section className={classes.form}>
        <h1>Sign In</h1>
        <form onSubmit={submitHandler}>
        <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type='email' id='email' required ref={emailinputref} placeholder='Email'/>
        </div>
        <div className={classes.control}> 
            <label htmlFor="password">Password</label>
            <input type='password' id='password' required ref={passwordref} placeholder='Password'/>
        </div>
        {/* <span>{error}</span> */}
                <div>
                <Button variant="primary" type="submit" className={classes.btn}>SignIn</Button>
                {isLoading && <p>Sending request...</p>}
                </div>
                <div>
                {!isLoading && <Link to='/login'> <Button variant="outline-info" onClick={switchAuthModeHandler} >
                        Create new account</Button></Link> }   
                        {isLoading && <p>Sending Request...</p>}            
                </div>
                </form>
    </section>
)
}

export default SignIn