import axios from "axios"
import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { Button } from "react-bootstrap"
import { NavLink, useNavigate } from "react-router-dom"
import classes from './Addexpense.module.css'
import AuthContext from "./Store/AuthContext"

const AddExpense=()=>{

    const[list,setlist]=useState([])
    const titleref=useRef()
    const descriptionref=useRef()
    const amountref=useRef()

    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');

    const [fetchData, setFetchData] = useState(false);


    const [items, setItems] = useState([]);
    const existingItems = [...items];
    let totalAmount = 0

    const Authctx=useContext(AuthContext)
    const History=useNavigate()

    let mail = localStorage.getItem('email');
    let usermail;
    if (mail != null) {
    const regex = /[`@.`]/g;
    usermail = mail.replace(regex, '')
    }

    const addExpenseHandler = (event) => {
        event.preventDefault();
        const title=titleref.current.value
        const description=descriptionref.current.value
        const amount=amountref.current.value
        
    
        const expenseItem= {
          title,
          description,
          amount
        };
        saveExpense(expenseItem);
    
        setTitle('');
        setDescription('');
        setAmount('');
      };
    
          async function saveExpense(expenseItem) {
        try {
          const response = await axios.post(`https://expensetracker-297e9-default-rtdb.firebaseio.com/expenses/${usermail}.json`,
            expenseItem
          );
          if (response.status === 200) {
            console.log('posted items successfully', response.data.name); 
            console.log('updated items successfully', response)
            existingItems.push(expenseItem);
            console.log(existingItems)

            setItems(existingItems);
            
          } else {
            alert('failed post request');
          }
        } catch (error) {
          console.log('error:');
          alert('failed ');
        }
      }


      useEffect(()=>{
        const arrayOfExpenses = [];
        mail && axios.get(`https://expensetracker-297e9-default-rtdb.firebaseio.com/expenses/${usermail}.json`)
        .then((response) => {
        //   console.log(response.data)
    
          const result = response.data
          console.log(result)
          Object.entries(result).forEach((item)=>{
    
            console.log(item[1])
            arrayOfExpenses.push({
              title: item[1].title,
              amount: item[1].amount,
              description:item[1].description
            })
    
          })
    
           setItems(arrayOfExpenses)
          console.log('result')
        }).catch((error) => {
          console.error(error)
        })
    
      },[])
    
    
    
    ;
    
    

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
                    <Button className={classes.btn} onClick={addExpenseHandler} >Add Expense</Button>
                    <Button className={classes.btn1} >Cancel</Button>
                    <div className={classes.b}></div>
                </form>
            </section>
            <div >
                    {items.length !==0 && items.map((item,index)=>(
                        <li className={classes.data} key={index} style={{listStyle:'none'}} >
                            <h2>
                           <span className={classes.title}>{item.title}</span>
                           <span className={classes.des}>{item.description}</span>
                           <span className={classes.amount}>{item.amount}</span>

                            </h2>
                            
                        </li>
                    ))}
                </div>

        </Fragment>
    )
}

export default AddExpense