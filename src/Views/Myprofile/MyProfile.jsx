import React, { useEffect } from 'react';
import { useState } from 'react';
import { onAuthStateChanged,getAuth } from "firebase/auth";
import { TextField,Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { Avatar } from '@mui/material';
import{
  getFirestore,
  setDoc,
  doc,
  collection,
  addDoc,
  query,
  where,
getDocs}
from "firebase/firestore";
import app from '../../firebase'
import { useNavigate } from 'react-router-dom';
const MyProfile = () => {
    function toCamelCase(str) {
        const camelCaseStr = str.replace(/[-_](.)/g, (_, char) => char.toUpperCase());
        return camelCaseStr.charAt(0).toUpperCase() + camelCaseStr.slice(1).toLowerCase();
      }
    const navigate=useNavigate()
    
    const [data,setData]=useState([]);
    const auth = getAuth(app);
  const db = getFirestore(app);
  const myprof=async()=>{
    
   const uid=auth.currentUser.uid
   try{
    const q=query(collection(db,"users"),where ("uid","==" ,uid))
    const querySnapshot=await getDocs(q)
    // console.log(querySnapshot);
    let arr=[];
    querySnapshot.forEach((doc)=>{
        // console.log(doc.data());
arr.push(doc.data())
    
    })
    return {
        status: "success",
        data: arr,
      }}catch (error) {
        console.log(error.message);
        return {
          status: "error",
          error: error.message,
        };
      }
  }
  const getData = async () => {
    //firebase function call for user data
    // const res = await getAllUsersData();
    const res = await myprof();
    setData(res.data);
  };
  useEffect(()=>{
    getData()
  })
    return (
        <div className='Signup-cont'>
            {data.map((val)=>{
return  <> 
<div className='Signup'>
     <span>Welcome to Profile Page </span>
     </div>
     <div>

<Avatar sx={{ width: 100, height: 100 }} className='avatar' src={val.profileImage}></Avatar>

</div>

<div className='profDes'>
    <div><h1>Name: {toCamelCase(val.name)}</h1></div>
    <div><h1>Email: {val.email}</h1></div>
    <div><h1>Age: {val.age}</h1></div>


</div>
<Button variant="outlined"  className="sign-btn" sx={{
    
    color:"white",
    backgroundColor:"#002f34",
  }} onClick={()=>{navigate(-1)}}>Go Back</Button>
     </>
            })}
              {/* <div>
              <Avatar sx={{ width: 85, height: 86 }}  src={img}></Avatar>
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

        </form>
     </div> */}
        </div>
    );
            

    
}

export default MyProfile;
