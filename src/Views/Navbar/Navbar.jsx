import React from 'react';
import { NavLink , useNavigate , Outlet} from 'react-router-dom';
import { Avatar } from '@mui/material';
import { TextField,Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import img from '../Dashboard/Images/olx-3.jpeg'
import app from '../../firebase';
import { signOut } from 'firebase/auth';
import { onAuthStateChanged,getAuth } from "firebase/auth";

const Navbar = (props) => {
    const auth = getAuth(app);
    async function logoutUser() {
        try {
          await signOut(auth);
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
    const navigate=useNavigate();
    return (
        <div>
            <div className='header'>
      
       
    
     
    
    <h1>Welcome to Olx </h1>
    <Button  sx={{
    
    color:"white",
    backgroundColor:"#002f34",
  }} variant="outlined" size='small'  onClick={()=>{navigate('/createadd')}} >Create Add</Button>
  <Button  sx={{
    
    color:"white",
    backgroundColor:"#002f34",
  }} variant="outlined" size='small'  onClick={()=>{navigate('/signup')}} >Signup</Button>
<Button  sx={{
    
    color:"white",
    backgroundColor:"#002f34",
  }} variant="outlined" size='small'  onClick={()=>{navigate('/myads'); props.setcolor("#002f34")}} >My Ads</Button>

<Button  sx={{
    
    color:"white",
    backgroundColor:"#002f34",
  }} variant="outlined" size='small'  onClick={()=>{navigate('/dashboard'); }} >Dashboard</Button>


<Button  sx={{
    
    color:"white",
    backgroundColor:"#002f34",
  }} variant="outlined" size='small'  onClick={()=>{navigate('/'); }} >Login</Button>
    {/* <button  onClick={()=>{props.setlevel(4); props.setcolor("#002f34")}}>Create Add</button> */}
    <Button  sx={{
    
    color:"white",
    backgroundColor:"#002f34",
  }} variant="outlined" className="sign-btn"  size='small'  onClick={async () => {
    await logoutUser()
  }} >Logout</Button>
  <SearchIcon/>
    <TextField label="Search By Title" onChange={()=>{}} variant="standard" />
  
  
   
     <img src={require("../Dashboard/Images/OLX-Symbol.png")} className='olx-pic' alt="" />
     
     <Avatar sx={{ width: 85, height: 86 }}  src={img}></Avatar>
     
    </div>
    <Avatar sx={{ width: 85, height: 86 }} onClick={()=>{navigate("/myprofile")}} src={img}></Avatar>
      <Outlet/>
        </div>
    );
}

export default Navbar;
