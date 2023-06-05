import React, { useState } from 'react';
import { TextField,Link } from '@mui/material';
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from "firebase/auth";
import { Avatar } from '@mui/material';
import img from '../Dashboard/Images/olx-3.jpeg'
import app from '../../firebase';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


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


const CreateAd = (props) => {
    const auth = getAuth(app);
    const navigate=useNavigate()
  const db = getFirestore(app);
const storage = getStorage(app);
  const [formdata,setFormdata]=useState({})
  const setstate=(key,value)=>{
    setFormdata({...formdata,[key]:value})
  
  }
  async function postAd(formData) {

    const { title, price, image, description, location,name,number ,condition} = formData;
    console.log(formData);
    if (!title || !price || !description || !location || !number || !condition || !name || !image){
  alert("Please fill all the fields");
  console.log("Please fill all the fields");
  return;
    }else{
    try {
      const  uid  = auth.currentUser.uid;
      console.log(uid);
  
      let url = "";
      const imgArr=[];
      const leng=image.length

      if (image) {
        //For image upload
        for(let i=0;i<leng;i++){
        const imageName = image[i].name;
        const folderName = "addPics/";
        const imageRef = await ref(storage, folderName + imageName);
        console.log(imageRef);
        const uploadBytesRes = await uploadBytes(imageRef, image[i]);
        console.log(uploadBytesRes);
        url = await getDownloadURL(uploadBytesRes.ref);
        imgArr.push(url)
        console.log(url);
        }
      }
  
      const addDocRes = await addDoc(collection(db, "ads"), {
        title:title,
        price:price,
        image: imgArr,
        description:description,
        location:location,
        uid:uid,
        name:name,
        number:number,
        condition:condition
      });
      return {
        status: "success",
      };
    } catch (error) {
      console.log(error.message);
      return {
        status: "error",
        error: error.message,
    
      };
    }
    }

  }
  
 

    return (
      <div className='Add-cont'>
                  <div>
           <img src={require("../Signup/OLX-Symbol.png")} className='olx-pic' alt="" />
          </div>
                   <div className='Signup'>
      
           <span>Create your Add </span>
           </div>
         <div  className='content'>
      <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          
          <Form.Control type="text"  onChange={(e)=>{setstate("name",e.target.value)}}  placeholder="Enter your Name" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
         
          <Form.Control type="number" onChange={(e)=>{setstate("number",e.target.value)}}  placeholder="Phone Number" />
        </Form.Group>
      </Row>
      <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridAddress1">
        
        <Form.Control onChange={(e)=>{setstate("title",e.target.value)}}  type="text" placeholder="Enter Your Add Title" />
      </Form.Group>

      <Form.Group  as={Col} controlId="formGridAddress1">
        
        <Form.Control onChange={(e)=>{setstate("price",e.target.value)}} type="text"  placeholder="Enter Your Add Price" />
      </Form.Group>


      </Row>
      <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridAddress2">
        
        <Form.Control onChange={(e)=>{setstate("location",e.target.value)}} type="text"  placeholder="Location" />
      </Form.Group>

<Form.Group as={Col} controlId="formGridAddress2">
        
        <Form.Control onChange={(e)=>{setstate("condition",e.target.value)}} type="text"  placeholder="Condition" />
      </Form.Group>
      </Row>
      
      <Row className="mb-3">
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">

        <Form.Control as="textarea"  type="text"  onChange={(e)=>{setstate("description",e.target.value)}} placeholder="Please Enter Your Add Description" rows={3} />
      </Form.Group>
    
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Control onChange={(e)=>{setstate("image",e.target.files)}}type="file" multiple />
      </Form.Group>
        

       
      </Row>

      

      <Button  className='bt' variant="primary"   onClick={async () => {
     const response = await postAd(formdata);
     if (response.status === "error") {
       alert(response.error);
     } else {
       //redirect
      
      navigate("/dashboard")
       alert("success");
     }
   }}>
        Post Add
      </Button>
      <Button  className='bt' variant="primary" type="submit"  onClick={()=>{navigate(-1)}}>
        Go Back
      </Button>
    </Form>
    </div>
    </div>
//         <div className='Add-cont'>
//             <div>
//       <img src={require("../Signup/OLX-Symbol.png")} className='olx-pic' alt="" />
//      </div>
//              <div className='Signup'>

//      <span>Create your Add </span>
//      </div>
//      <div  className='content'>
//         <form action="" className='form'>
//             <div className='email'>

// <TextField id="outlined-basic"       label="Title" variant="outlined" onChange={(e)=>{setstate("title",e.target.value)}} />
// </div>
// <div className="password-s">
// <TextField id="outlined-basic"     sx={{ maxWidth:"17rem"}}  type='text' label="Price" variant="outlined"  onChange={(e)=>{setstate("price",e.target.value)}} />

// </div>
// <div className="password-s">
// <TextField id="outlined-basic"    sx={{ maxWidth:"20rem"}}  type="text" label="Description" variant="outlined"  onChange={(e)=>{setstate("description",e.target.value)}} />

// </div>
// <div className="password-s">
// <TextField id="outlined-basic"    sx={{
    
//     maxWidth:"20rem"
//   }}  type='text' label="Location" variant="outlined" onChange={(e)=>{setstate("location",e.target.value)}} />

// </div>

// <div className="password-s">
// <input id="outlined-basic"  type="file" label="" variant="outlined" onChange={(e)=>{setstate("image",e.target.files)}}  multiple/>

// </div>
// {/* <Button variant="outlined" type="file" className="sign-btn" sx={{
    
//     color:"white",
//     backgroundColor:"#002f34",
  
//   }} onChange={(e)=>{setstate("image",e.target.files)}} multiple>Upload Images</Button> */}


// <Button variant="outlined"  className="sign-btn" sx={{
    
//     color:"white",
//     backgroundColor:"#002f34",
//   }} onClick={async () => {
//     const response = await postAd(formdata);
//     if (response.status === "error") {
//       alert(response.error);
//     } else {
//       //redirect
      
//      navigate("/dashboard")
//       alert("success");
//     }
//   }}>Create Ad</Button>

//   <Button variant="outlined"  className="sign-btn" sx={{
    
//     color:"white",
//     backgroundColor:"#002f34",
//   }} onClick={()=>{navigate(-1)}}>Go Back</Button>
// {/* <Button variant="contained" onClick={()=>{navigate(-1)}}>Go Back</Button> */}
// <div>
    
// </div>

// </form>

//      </div>
//         </div>
    );
}

export default CreateAd;
