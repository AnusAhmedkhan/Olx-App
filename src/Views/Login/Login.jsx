import React from 'react';
import app from '../../firebase';
import { TextField,Button,Link  } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import {InputAdornment }from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';


const auth = getAuth(app);
const Login = (props) => {
  const navigate= useNavigate();
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [email,Setemail]=useState()
    const[password,Setpassword]=useState()
    const Submit=()=>{
        signInWithEmailAndPassword(auth, email, password)
        .then(()=>{ console.log("success");})
        .catch((error)=>{ 
            console.log(error.code);
            if(((error.code === "auth/invalid-email"||error.code === "auth/user-not-found" ))){
                setEmailError(true);
                setPasswordError(true);
            }else if (error.code === "auth/user-not-found") {
                setEmailError(true);
                setPasswordError(false);
            } else if (error.code === "auth/wrong-password") {
                setPasswordError(true);
                setEmailError(false);
            } else {
                setEmailError(false);
                setPasswordError(false);
            }
        })
    }
    return (
        <div className='Signup-cont'>
              <div>
      <img src={require("../Signup/OLX-Symbol.png")} className='olx-pic' alt="" />
     </div>
             <div className='Signup'>
     <span>Welcome to Olx Login Page </span>
     </div>
     <div  className='content'>
        <form action="" className='form'>
            <div className='email'>
                <TextField id="outlined-basic" InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon/>
            </InputAdornment>
          ),
        }}   label="Email" variant="outlined" onChange={(e)=>{Setemail(e.target.value)}}  error={emailError} helperText={emailError ? "Incorrect email" : ""} />
            </div>
            <div className="password-l">
                <TextField id="outlined-basic"  InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
        }}  type='password' label="Password" variant="outlined"  onChange={(e)=>{Setpassword(e.target.value)}}  error={passwordError} helperText={passwordError ? "Incorrect password" : ""} />
            </div>

            <Button  sx={{
    
    color:"white",
    backgroundColor:"#002f34",
  }} variant="outlined" className="sign-btn" startIcon={<LoginIcon/>} size='large' onClick={Submit} >Login</Button>
<div>
    <span>Create New Account? </span>
    <span>
    <Link className='' onClick={()=>{navigate("/signup")}} href="#" underline="hover">
  Signup
</Link>
    </span>
</div>
        </form>
     </div>
        </div>
    );
}

export default Login;
