import axios from "axios"
import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { Button } from "react-bootstrap"
import { NavLink, useNavigate } from "react-router-dom"
import classes from './Addexpense.module.css'
import AuthContext from "./Store/AuthContext"
import { useDispatch } from "react-redux"
import { authActions } from "./Store/Auth-slice"
import { CSVLink } from "react-csv"

const AddExpense=()=>{

    const titleref=useRef()
    const descriptionref=useRef()
    const amountref=useRef()
    const dispatch=useDispatch()

    const[downloadbtn,setDownloadbtn]=useState(false)
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [edit,setEdit] = useState(-1)
    const[id,setId]=useState('')
    const[modal,setModal]=useState(false)
    const [fetchData, setFetchData] = useState(false);

    const headers=[
      {
        label:'Expense Title',key:'title'
      },
      {
        label:'Expense Description',key:'description'
      },
      {
        label:'Amount Spent',key:'amount'
      }
    ]

    const toggle=()=>{
      setModal(!modal)
    }

    const [items, setItems] = useState([]);
    const[isediting,setIsEditing]=useState(false)
    const existingItems = [...items];
    let totalAmount = 0

    let[total,setTotal]=useState(0)

    const csvLink={
      filename:'file.csv',
      headers:headers,
      data:items
    }


    // const Authctx=useContext(AuthContext)
    const History=useNavigate()

    let mail = localStorage.getItem('email');
    let usermail;
    if (mail != null) {
    const regex = /[`@.`]/g;
    usermail = mail.replace(regex, '')
    }


      useEffect(()=>{
        const arrayOfExpenses = [];
        mail && axios.get(`https://expense-tracker-a2833-default-rtdb.firebaseio.com/expenses/${usermail}.json`)
        .then((response) => {
        //   console.log(response.data)
    
          const result = response.data
          // let keys = Object.keys(result)
          //   console.log("keys", keys)
          console.log(result)
          Object.entries(result).forEach((item)=>{
    
            // console.log(item[1])
            arrayOfExpenses.push({
                id:item[0],
              title: item[1].title,
              amount: item[1].amount,
              description:item[1].description
            })
    console.log(arrayOfExpenses)
          })
    
           setItems(arrayOfExpenses)
           arrayOfExpenses.map((item) => {
            console.log(item.amount);
            totalAmount += Number(item.amount);
            console.log("total amount is", totalAmount);
          });
          console.log(totalAmount)
          setTotal(totalAmount)
        }).catch((error) => {
          console.log(error)
        })
    
      },[fetchData,isediting])

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
        if(edit === -1) {
          saveExpense(expenseItem);

        }
        else{
          updateExpenseHandler(edit);
        }    
        setTitle('');
        setDescription('');
        setAmount('');
      };
    
          async function saveExpense(expenseItem) {
        try {
          const response = await axios.post(`https://expense-tracker-a2833-default-rtdb.firebaseio.com/expenses/${usermail}.json`,
            expenseItem
          );
          if (response.status === 200) {
            console.log('posted items successfully', response.data.name); 
            console.log('updated items successfully', response)
            existingItems.push(expenseItem);
            console.log(existingItems)

            setItems(existingItems);
            setFetchData(true)            
            setIsEditing(!isediting)
          } else {
            alert('failed post request');
          }
        } catch (error) {
          console.log('error:');
          alert('failed ');
        }
      }

    const logoutHandler=()=>{
      localStorage.removeItem('tokenID')
      localStorage.removeItem('isLoggedIn')
      // dispatch(authActions.logout())
        // Authctx.logout()
        History('/')
    }
  

  const updateExpenseHandler = (item) => {
    console.log("update expense", item.id);
    console.log("item details", item);
    setTitle(item.title);
    setDescription(item.description);
    setAmount(item.amount);
    setEdit(item.id);
    setIsEditing(true)
    setId(item.id)
  };


    const deletHandler=(id)=>{
        const temp=[...items]
        console.log('delete', id);
        console.log(temp)
        
    fetch(`https://expense-tracker-a2833-default-rtdb.firebaseio.com/expenses/${usermail}/${id}.json`,
    {
      method: 'DELETE',
    }).then((response) => {
      response.json().then((response)=>{
        console.log('deleting item');
        setItems(temp.filter((c)=>c.id !== id));
        setFetchData(!true)
        setIsEditing(!isediting)

      })
    }).catch(err=>{
      alert(err.message)
    })
  }


    const editExpenseHandler=(id)=>{
      console.log('editing id',id)
      const title=titleref.current.value
      const description=descriptionref.current.value
      const amount=amountref.current.value

      fetch(`https://expense-tracker-a2833-default-rtdb.firebaseio.com/expenses/${usermail}/${id}.json`,
      {
        method:'PATCH',
        body:JSON.stringify({
          title:title,
          description:description,
          amount:amount
        }),
        headers:{
          'Content-type':'application/json'
        }
      }).then((response)=>{
        response.json().then((data)=>{
          console.log('editing item',data,id)
          setIsEditing(false)
          // setModal(false)
          setFetchData(true)
          setEdit(-1)
        })
      }).catch((err)=>{
        alert(err.message)
      })
      setTitle('')
      setDescription('')
      setAmount('')
    }

    const activatePremium = (e) => {
      e.preventDefault()
      console.log('Activating premium')
      setDownloadbtn(true)
    }

    

    return(
        <Fragment>
          <div className={`${total>10000 && classes.theme}`}>

            <div className={classes.nav}>
              <NavLink to='/Profile' className={classes.profile} >PROFILE</NavLink>
              <Button className={classes.logoutbtn} onClick={logoutHandler}>LOGOUT</Button>

              </div>

            <section className={classes.backgnd}>
                <h3 className={classes.text}>Add Daily Expenses</h3>
                <hr></hr>
                <form >
                    <div>
                        <input className={classes.input} placeholder="Expense Title" value={title} type='text' ref={titleref} onChange={(e)=>setTitle(e.target.value)} ></input>
                    </div>
                    <div>
                        <input className={classes.input} placeholder="Expense Description" value={description} type='text' ref={descriptionref} onChange={(e)=>setDescription(e.target.value)}></input>
                    </div>
                    <div>
                        <input className={classes.input} placeholder="Expense Amount" value={amount} type='number'  min='0' ref={amountref} onChange={(e)=>setAmount(e.target.value)}></input>
                    </div>
                    <hr></hr>
                    {edit === -1 && (
            <Button className={classes.btn} onClick={addExpenseHandler}>
              Add Expense
            </Button>
          )}
          {edit !== -1 && (
            <Button
              className={classes.btn}
              onClick={() => editExpenseHandler(id)}
            >
              {" "}
              Update Expense{" "}
            </Button>
          )}
                    <Button className={classes.btn1} >Cancel</Button>
                    <div className={classes.b}></div>
                </form>
            </section>

            
            <div className={classes.container}>
            {items.length !==0 && (
              <div>
                 {downloadbtn && <CSVLink {...csvLink} className={classes.downloadbtn}>
            download Expenses as csv⬇️</CSVLink>}
              </div>

            )}
            </div>

            <div >
                    {items.length !==0 && items.map((item,index)=>(
                        <li className={classes.data} key={index} style={{listStyle:'none'}} >
                            <h2>
                           <span className={classes.title}>{item.title}</span>
                           <span className={classes.des}>{item.description}</span>
                           <span className={classes.amount}>{item.amount}</span>
                           <span><Button style={{marginLeft:'1rem'}} onClick={()=>updateExpenseHandler(item)}>Edit</Button></span>
                           <span><Button style={{marginLeft:'1rem'}} variant="danger" onClick={()=>deletHandler(item.id)}> X</Button></span>

                            </h2>
                            
                        </li>
                    ))}
                </div>
                {total<10000 ? <p className={classes.containerr}>Total Amount:{total}</p>:
                  <div className={classes.premium}>
                  <p className={classes.containerr}>Total Amount: {total}</p>
                  <p className={classes.premiumHeading}>Expenses exceeded 10K... Go for premium</p>
                <button onClick={activatePremium}>Activate Premium</button>
           </div>
           }
            </div>
          </Fragment>
    )
}

export default AddExpense

