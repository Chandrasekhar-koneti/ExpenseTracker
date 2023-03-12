import { NavLink } from "react-bootstrap"
import { Link } from "react-router-dom"
import classes from './Profile.module.css'

const Profile=()=>{
    return(<>
    <div className={classes.title}>
        <h3>Welcome to Expense Tracker</h3>
    </div>
    <p className={classes.p}>Your Profile is Incomplete.<Link to='/Update'>Complete Now</Link></p> 
    <hr ></hr>
    </>
       
    )
}
export default Profile