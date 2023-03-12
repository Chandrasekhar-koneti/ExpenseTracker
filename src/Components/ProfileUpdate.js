import { Button } from "react-bootstrap"
import classes from './ProfileUpdate.module.css'
import GitHub from "./Images/GitHub.png"
import Url from './Images/Url.png'
import { Fragment, useContext, useRef } from "react"
import AuthContext from "./Store/AuthContext"

const ProfileUpdate=()=>{
    const nameref=useRef()
    const linkref=useRef()
    const Authctx=useContext(AuthContext)
    const token=Authctx.token
    console.log(token)

    const cancelhandler=()=>{
        nameref.current.value=''
        linkref.current.value=''
    }

    const profileupdatehandler=(e)=>{
        e.preventDefault()
        const enteredname=nameref.current.value
        const enteredlink=linkref.current.value
        let url
        if(enteredname!=" " || enteredlink !==" "){
            url='https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBhalM_NXSwUwlqwQ5bT1AvnoLsag34f2M'
        }
        fetch(url,{
            method:'POST',
            body:JSON.stringify({
                idToken:token,
                name:enteredname,
                link:enteredlink,
                returnSecureToken:true
            }),
            headers:{
                'Content-Type':'applications/json'
            }
        }).then((res)=>{
            if(res.ok){
                console.log('profile updated')
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
            console.log(data)
            alert('profile is updated')
            nameref.current.value=''
            linkref.current.value=''
        }).catch((err)=>{
            alert(err.message)
        })
    }
    return(
        <Fragment>
        <p className={classes.p}>Winners Never Quite, Quitters Never Win</p>
        <div className={classes.control}>
            <h6 >Your profile is 64% completed. A complete profile has higher chance of landing a job</h6>
        </div>
        <hr></hr>

        <div>
            <h3 className={classes.h3} >Contact Details</h3>
            <form className={classes.form}>
                <div style={{display:'flex',flexDirection:'row'}}>
                <img src={GitHub} alt='' style={{width:'25px',height:'25px',marginTop:'0.5rem'}} />
                <label  htmlFor="name">Full Name</label>
                <input  type='text' id="name" required ref={nameref}></input>
                </div>

                <div style={{display:'flex',flexDirection:'row'}}>
                <img src={Url} alt='' style={{width:'25px',height:'25px',marginTop:'0.5rem'}} />
                <label >Profile Photo Url</label>
                <input type='text' id="url" ref={linkref}></input>
                </div>
                </form>        

                <div>
                <Button className={classes.btn} onClick={profileupdatehandler} >Update</Button>
                
                    <Button variant="outline-danger" className={classes.cancelbtn} onClick={cancelhandler}>Cancel</Button>
                </div>
               <hr style={{marginLeft:'15%',marginRight:'15%',fontWeight:'bold'}}></hr>
        </div>
</Fragment>
    )
}

export default ProfileUpdate