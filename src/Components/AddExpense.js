import { Fragment, useContext, useRef, useState } from "react"
import { Button } from "react-bootstrap"
import { NavLink, useNavigate } from "react-router-dom"
import classes from './Addexpense.module.css'
import AuthContext from "./Store/AuthContext"

const AddExpense=()=>{

    // const[title, settitle]=useState('')
    // const[description, setdescription]=useState('')
    // const[amount, setamount]=useState('')
    const[list,setlist]=useState([])
    const titleref=useRef()
    const descriptionref=useRef()
    const amountref=useRef()

    const Authctx=useContext(AuthContext)
    const History=useNavigate()

    // const titleHandler=(event)=>{
    //     settitle(event.target.value)
    // }

    // const descriptionHandler=(event)=>{
    //     setdescription(event.target.value)
    // }

    // const amountHandler=(event)=>{
    //     setamount(event.target.value)
    // }
    const submitHandler = (event) => {
        event.preventDefault();
        const enteredtitle=titleref.current.value
        const entereddescription=descriptionref.current.value
        const enteredamount=amountref.current.value
        
    
        const expenses= {
          title: enteredtitle,
          description: entereddescription,
          amount: enteredamount,
        };
    
     setlist([...list,expenses])
    }
    //     settitle('');
    //     setamount('');
    //     setdescription('');
    //   };
    //   console.log(list)

    const logoutHandler=()=>{
        Authctx.logout()
        History('/')
    }

    return(
        <Fragment>
            <div className={classes.nav}>
              <NavLink to='/Profile' className={classes.profile} >PROFILE</NavLink>
              <Button className={classes.logoutbtn} onClick={logoutHandler}>LOGOUT</Button>

              </div>
            <section className={classes.backgnd}>
                <h3 className={classes.text}>Add Daily Expenses</h3>
                <hr></hr>
                <form >
                    <div>
                        <input className={classes.input} placeholder="Expense Title" type='text' ref={titleref}></input>
                    </div>
                    <div>
                        <input className={classes.input} placeholder="Expense Description" type='text' ref={descriptionref}></input>
                    </div>
                    <div>
                        <input className={classes.input} placeholder="Expense Amount" type='number' min='0' ref={amountref} ></input>
                    </div>
                    <hr></hr>
                    <Button className={classes.btn} onClick={submitHandler} >Add Expense</Button>
                    <Button className={classes.btn1} >Cancel</Button>
                    <div className={classes.b}></div>
                </form>
            </section>
            <div className={classes.data}>
                    {list.length !==0 && list.map((expense,index)=>(
                        <li  key={index} style={{listStyle:'none'}} >
                            <h2>
                           <span className={classes.title}>{expense.title}</span>
                           <span className={classes.des}>{expense.description}</span>
                           <span className={classes.amount}>{expense.amount}</span>

                            </h2>
                            
                        </li>
                    ))}
                </div>

        </Fragment>
    )
}

export default AddExpense