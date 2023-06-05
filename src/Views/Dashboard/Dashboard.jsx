import React from 'react';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Avatar } from '@mui/material';
import { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';
import { onAuthStateChanged,getAuth } from "firebase/auth";
import { TextField,Button } from '@mui/material';
import avatarImage from '../Dashboard/Images/olx-4.jpeg';
import LoginIcon from '@mui/icons-material/Login';
import img from '../Dashboard/Images/olx-6.jpeg'
import SearchIcon from '@mui/icons-material/Search';
import BasicExample from '../../Components/Cards/BasicExample';
import { useNavigate ,useLocation,useHistory} from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch } from 'react-redux';
import { add,remove } from '../../store/favouriteslice';
import UncontrolledExample from '../../Components/Slider/UncontrolledExample';

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


const Dashboard = (props) => {
 




  
  const navigate=useNavigate();
  const dispatch=useDispatch()
  const auth = getAuth(app);
  const db = getFirestore(app);
  // const [toggle,SetToggle]=useState(true)
  // useEffect(()=>{
  //   toggle?document.body.style.backgroundColor="white":document.body.style.backgroundColor="black"
  // },[toggle])

   





  
const [data, setData] = useState([]);
const [searchQuery, setSearchQuery] = useState('');
const [searchedAds, setSearchedAds] = useState([]);

async function getAllAds() {
  try {
    const q = query(collection(db, "ads"));
    const querySnapshot = await getDocs(q);

    let arr = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      arr.push({...doc.data(),id:doc.id});
    });
    console.log(arr);
    return {
      status: "success",
      data: arr,
    };
  } catch (error) {
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
  const res = await getAllAds();
  setData(res.data);
};


// hitting my own  node  api 
// useEffect(()=>{
//   fetch('http://localhost:5000/ads')
//   .then(response => response.json())
//   .then(json => console.log("api hit",json))
// })

useEffect(() => {
  getData();
}, []);
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
const handleData=(val)=>{
  dispatch(add(val))
 
}
useEffect(() => {
  if (searchQuery.trim() === '') {
    getData(); // Reset to all ads if search query is empty
  } else {
    const filteredAds = data.filter((val) =>
      val.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setData(filteredAds);
  }
}, [searchQuery]);








  return (
    <>
    <div><h1>Welcome {props.data} to dashbaord</h1>
</div>
<div>
<Navbar bg="light" expand="lg">
<Container fluid>
<Navbar.Collapse id="navbarScroll">
<Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search By Title"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* <Button variant="outline-success" onClick={handleSearch}>Search</Button> */}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
</div>
 < UncontrolledExample />
    
     <div className='mn'>
    {data.map((val)=>{
      return  <div className="ad-cards">
      <div className="ad-images">
        <img src={val.image[0]} onClick={()=>{navigate('/AdDetail/' + val.id)}} alt="Ad Image" />
      </div>
      <div className="ad-detailss">
        <h3 className="ad-titles">{val.title}</h3>
        <Button  sx={{
    
    color:"white",
    backgroundColor:"#002f34",
  }} variant="outlined" className="sign-btn" size='small' onClick={()=>handleData(val)}> Add To Favourite</Button>
       
        <div className="ad-infos">
          <p className="ad-prices">{val.price}</p>
          <p className="ad-locations">{val.location}</p>
        </div>
      </div>
    </div>
    })}
    </div>
    </>
    
  );
}

export default Dashboard;
