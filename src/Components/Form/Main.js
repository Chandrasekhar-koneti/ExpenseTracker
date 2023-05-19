// import { Fragment } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import classes from './Main.module.css'
import { Button } from "react-bootstrap"
import AuthContext from "../Store/AuthContext"
import { useContext } from "react"
import { useDispatch } from "react-redux"
import { authActions } from "../Store/Auth-slice"

const Main=()=>{

    const usermailid=localStorage.getItem('userMail')
    const dispatch=useDispatch()
    const History=useNavigate()
    const Authcnxt=useContext(AuthContext)
    const logouthandler=()=>{
        localStorage.removeItem('userMail')
        localStorage.removeItem('isLoggedIn')
        dispatch(authActions.logout())
        // Authcnxt.logout()
        History('/')
    }
    return(
        <div className={classes.main}>
        <NavLink className={classes.profile} to='/Profile'>Profile</NavLink>
        <NavLink className={classes.expense} to='/Addexpense'>AddExpense</NavLink>
        <Button className={classes.btn} onClick={logouthandler}>Logout</Button>
        </div>

    )
}

export default Main