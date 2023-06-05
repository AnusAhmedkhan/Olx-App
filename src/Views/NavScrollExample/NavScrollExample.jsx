import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Avatar } from '@mui/material';
import img from '../Dashboard/Images/olx-4.jpeg'
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged,getAuth } from "firebase/auth";
import app from '../../firebase';
import { signOut } from 'firebase/auth';
function NavScrollExample(props) {
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
    <Navbar bg="light"  expand="lg">
      <Container fluid>
      <Avatar sx={{ width: 85, height: 86 }} onClick={()=>{navigate("/myprofile");props.Setbodycolor("#002f34")}} src={props.url}></Avatar>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link className="link" onClick={()=>{navigate("/dashboard"); props.Setbodycolor("white")}} >Dashboard</Nav.Link>
            <Nav.Link  className="link" onClick={()=>{navigate("/createadd"); props.Setbodycolor("#002f34")}}>Create Ad</Nav.Link>
            <Nav.Link  className="link" onClick={()=>{navigate("/myads"); props.Setbodycolor("white")}}>My Ads</Nav.Link>
            <Nav.Link  className="link" onClick={()=>{navigate("/favouriteAd"); props.Setbodycolor("white")}}>Favourite Ads</Nav.Link>
            <Nav.Link  className="link"onClick={()=>{navigate("/"); props.Setbodycolor("white")}} >Login</Nav.Link>
            <Nav.Link className="link"onClick={async () => {
    await logoutUser()
  }} >Logout</Nav.Link>
            <Nav.Link  className="link" onClick={()=>{navigate("/signup"); props.Setbodycolor("#002f34")}}>Signup</Nav.Link>
            
             
            
            
            
          </Nav>
          <Navbar.Brand href="#home"><img src={require("../Dashboard/Images/OLX-Symbol.png")} className='olx-pic' alt="" /></Navbar.Brand>
          
         
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;