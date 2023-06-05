import React, { useState } from 'react';
import { TextField,Button,Link } from '@mui/material';
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from "firebase/auth";
import { useNavigate } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import app from '../../firebase';
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  addDoc,
  query,
  where,
getDocs,}from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";





const Signup = (props) => {
  const navigate=useNavigate();
  const auth = getAuth(app);
  const db = getFirestore(app);
const storage = getStorage(app);
  const [formdata,setFormdata]=useState({})
  const setstate=(key,value)=>{
    setFormdata({...formdata,[key]:value})
  
  }
    const [email,Setemail]=useState()
    const[password,Setpassword]=useState()
    const[showforemail,Setshowforemail]=useState(false)
    const[showforpass,Setshowforpass]=useState(false)
     const Submit=async(formdata)=>{
      console.log(formdata);
      const {username,email,password,age,image}=formdata
      

        
    
        const reg1= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const reg2=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).{8,}$/;
        if (!username || !email || !password || !age  || !image){
          alert("Please fill all the fields");
          console.log("Please fill all the fields");
          return;
            }
        else if(!reg1.test(email) && !reg2.test(password)){
          
      Setshowforemail(true)
      Setshowforpass(true)
           }else if(!reg1.test(email)){
            Setshowforemail(true)
            Setshowforpass(false)
           }
           else if(!reg2.test(password)){
            Setshowforpass(true)
            Setshowforemail(false)
           }else{
            try {
              //for user creation
              const createUserWithEmailAndPasswordRes =
                await createUserWithEmailAndPassword(auth, email, password);
              const uid = createUserWithEmailAndPasswordRes.user.uid;
              // console.log(uid);
              
          
              let url = "";
              if (image[0]) {
                //For image upload
                const imageName = image[0].name;
                const folderName = "userPics/";
                const imageRef = await ref(storage, folderName + imageName);
                console.log(imageRef);
                const uploadBytesRes = await uploadBytes(imageRef, image[0]);
                console.log(uploadBytesRes);
                url = await getDownloadURL(uploadBytesRes.ref);
                console.log(url);
              }
          
              //For database entry
              const res = await setDoc(doc(db, "users", uid), {
                name: username,
                email: email,
                uid: uid,
                age:age,
                profileImage: url,
              });
              // console.log(res);
          
              // const addDocRes = await addDoc(collection(db, "users"), {
              //   name: name,
              //   email: email,
              //   uid: createUserWithEmailAndPasswordRes.user.uid
              // });
          
              return {
                status: "success",
                // res,
              };
            } catch (error) {
              console.log(error.message);
              return {
                status: "error",
                error: error.message,
              };
            }
            // return res;
            // console.log("firebase signupUser end");
            
           }
        }
    return (
        <div className='Add-cont'>
             <div>
      <img src={require("../Signup/OLX-Symbol.png")} className='olx-pic' alt="" />
     </div>
             <div className='Signup'>

     <span>Welcome to Olx Signup Page </span>
     </div>
     <div  className='content'>
        <form action="" className='form'>
            <div className='email'>

<TextField id="outlined-basic"    error={showforemail}  sx={{ maxWidth:"27rem"}}   label="Email" variant="outlined" onChange={(e)=>{setstate("email",e.target.value)}} helperText={showforemail ? " Email contain @ and . ":''}/>
</div>
<div className="password-s">
<TextField id="outlined-basic"     sx={{ maxWidth:"17rem"}} error={showforpass} helperText={showforpass ? "Password must be atleast 8 characters ":""} type='password' label="Password" variant="outlined"  onChange={(e)=>{setstate("password",e.target.value)}} />

</div>
<div className="password-s">
<TextField id="outlined-basic"    sx={{ maxWidth:"20rem"}}   type="text" label="Username" variant="outlined"  onChange={(e)=>{setstate("username",e.target.value)}} />

</div>
<div className="password-s">
<TextField id="outlined-basic"    sx={{
    
    maxWidth:"20rem"
  }}type='number' label="Age" variant="outlined" onChange={(e)=>{setstate("age",e.target.value)}} />

</div>
<div className="password-s">

<Row className="frm">
     
    
      <Form.Group controlId="formFileMultiple" >
        <Form.Control onChange={(e)=>{setstate("image",e.target.files)}}type="file" multiple />
      </Form.Group>
        

       
      </Row>
      </div>
<Button variant="outlined"  className="sign-btn" sx={{
    
    color:"white",
    backgroundColor:"#002f34",
  }} onClick={async () => {
    const response = await Submit(formdata);
    if (response.status === "error") {
      alert(response.error);
    } else {
      //redirect
      navigate("/")
      alert("success");
    }
  }}>Signup</Button>
{/* <Button variant="contained" onClick={()=>{props.setlevel(2)}}>Login</Button> */}
<div>
    <span>Already have an account? </span>
    <span>
    <Link className='' onClick={()=>{navigate("/")}} href="#" underline="hover">
  Login
</Link>
    </span>
</div>

</form>

     </div>
        </div>

    );



}

export default Signup;
