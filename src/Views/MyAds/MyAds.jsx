import React, { useEffect } from 'react';
import { useState } from 'react';
import { onAuthStateChanged,getAuth } from "firebase/auth";
import { TextField,Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import BasicExample from '../../Components/Cards/BasicExample';
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
import app from '../../firebase';
import UncontrolledExample from '../../Components/Slider/UncontrolledExample';
import { useNavigate } from 'react-router-dom';


const MyAds = () => {
    const navigate=useNavigate()
    const [data,setData]=useState([]);
    const auth = getAuth(app);
  const db = getFirestore(app);
  const myads=async()=>{
    
   const uid=auth.currentUser.uid
   try{
    const q=query(collection(db,"ads"),where ("uid","==" ,uid))
    const querySnapshot=await getDocs(q)
    console.log(querySnapshot);
    let arr=[];
    querySnapshot.forEach((doc)=>{
        // console.log(doc.data());
arr.push({...doc.data(),id:doc.id})
    
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
    const res = await myads();
    setData(res.data);
  };
  useEffect(()=>{
    getData()
  })
    return (
        <>
        <UncontrolledExample/>
        <hr/>
        <div className='mn'>
    {data.map((val)=>{
      return  <div className="ad-cards">
      <div className="ad-images">
        <img src={val.image[0]} onClick={()=>{navigate('/AdDetail/' + val.id)}} alt="Ad Image" />
      </div>
      <div className="ad-detailss">
        <h3 className="ad-titles">{val.title}</h3>
        <div className="ad-infos">
          <p className="ad-prices">{val.price}</p>
          <p className="ad-locations">{val.location}</p>
        </div>
      </div>
    </div>
    })}
    </div>
    {/* <Button variant="outlined"  className="sign-btn" sx={{
    
    color:"white",
    backgroundColor:"#002f34",
  }} onClick={()=>{navigate(-1)}}>Go Back</Button> */}
  
        </>
    )
}

export default MyAds;
