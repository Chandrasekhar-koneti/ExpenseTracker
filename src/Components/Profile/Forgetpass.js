import { useRef } from 'react'
import { Button } from 'react-bootstrap'
import { json, Link } from 'react-router-dom'
import classes from './Forgetpass.module.css'

const ForgetPass=()=>{
    const emailref=useRef()

    const forgetpassHandler=()=>{
        const enteredemail=emailref.current.value
        console.log(enteredemail)


        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBhalM_NXSwUwlqwQ5bT1AvnoLsag34f2M',
        {
            method:'POST',
            body:JSON.stringify({
                requestType:'PASSWORD_RESET',
                email:enteredemail
            })

        }).then((res)=>{
            if(res.ok){
                return res.json()
            }else{
                return res.json().then((data)=>{
                    let errormessage='Authentication failed'
                    if(data && data.error && data.error.message){
                        errormessage=data.error.message
                    }
                    throw new Error(errormessage)
                })
            }
        }).then((data)=>{
            console.log('done')
        }).catch((err)=>{
            alert(err.message)
        })
    }

    return(
        <div className={classes.background}>
        <section className={classes.backgnd}>
            <div > 
                <h4 className={classes.text}>Enter email with which you have registered</h4>
            </div>
            <div>
                <input className={classes.input} type='text' placeholder="Email" ref={emailref}></input>
            </div>
       <div > 
       <button className={classes.linkbtn} onClick={forgetpassHandler}>Send Link</button>
       <Link to='/'><Button className={classes.loginbtn} variant="outline-danger">Have Account? Login</Button></Link>
       </div>
        </section>
        </div>
    )
}

export default ForgetPass