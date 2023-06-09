import { useContext, useState } from "react"
import { Button, NavLink } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import classes from './Profile.module.css'
import AuthContext from "../Store/AuthContext"
import { useDispatch } from "react-redux"
import { authActions } from "../Store/Auth-slice"

const Profile=()=>{
    const Authctx=useContext(AuthContext)
    const dispatch=useDispatch()
    // const token=Authctx.token
    const token=localStorage.getItem('idToken')
    const History=useNavigate()

    const[verify,setverify]=useState(false)

    const logoutHandler=()=>{
        localStorage.removeItem('idToken')
        localStorage.removeItem('isLoggedIn')
        dispatch(authActions.logout())
        // Authctx.logout()
        History('/')
    }

    const verifyEmailHandler=()=>{
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBhalM_NXSwUwlqwQ5bT1AvnoLsag34f2M',
            {
                method:'POST',
                body:JSON.stringify({
                    idToken:token,
                    requestType:'VERIFY_EMAIL'
                }),
                headers:{
                    'Content-Type':'applications/json'
                }
            }).then((res)=>{
                if(res.ok){
                    console.log('verification mail sent')
                    return res.json()
                } else{
                    return res.json().then((data)=>{
                        let errormessage='Authentication failed'
                        if(data && data.error && data.error.message){
                            errormessage=data.error.message
                        }
                        throw new Error(errormessage)
                    })
                }
            }).then((data)=>{
                alert('Verification Mail sent')
                setverify(true)
                console.log('verify')
            }).catch((err)=>{
                alert(err.message)
            })
    }

    return(<>
    <div className={classes.title}>
        <h3>Welcome to Expense Tracker</h3>
    </div>
    <p className={classes.p}>Your Profile is Incomplete.<Link to='/Update'>Complete Now</Link></p> 
    <Link className={classes.expense} to='/Addexpense'>AddExpense</Link>

    <Button onClick={logoutHandler} style={{marginLeft:'65rem'}}>Logout</Button>

    <hr ></hr>
    <div>
        {!verify && <Button variant="success" style={{marginLeft:'37rem',marginTop:'2rem'}} 
        onClick={verifyEmailHandler}>Veryify EmailId</Button>}
    </div>
    {verify && <Button variant="success" style={{marginLeft:'37rem',marginTop:'2rem'}} >Verified</Button>}



    </>
       
    )
}
export default Profile