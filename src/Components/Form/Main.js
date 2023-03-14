import { Fragment } from "react"
import { NavLink } from "react-router-dom"

const Main=()=>{
    return(
        <Fragment>
        <NavLink to='/Profile'>Profile</NavLink>
        <NavLink to='/Addexpense'>AddExpense</NavLink>
        </Fragment>

    )
}

export default Main