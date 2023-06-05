import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import app from './firebase';
import Signup from './Views/Signup/Signup';
import Login from './Views/Login/Login';
import Dashboard from './Views/Dashboard/Dashboard';
import CreateAd from './Views/CreateAdd/CreateAd';
import { onAuthStateChanged,getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import MyAds from './Views/MyAds/MyAds';
import MyProfile from './Views/Myprofile/MyProfile';
import NavScrollExample from './Views/NavScrollExample/NavScrollExample';
import { useNavigate,Navigate } from 'react-router-dom';
import AdDetail from './Views/AdDetail/AdDetail';
import FavouriteAd from './Views/FavouriteAd/FavouriteAd';
import { Provider } from 'react-redux';
import store from './store/store';

// Get Firestore instance
const db = getFirestore(app);

async function getUserDataByUID(uid) {
  try {
    // Create a query to fetch the document based on UID field
    const q = query(collection(db, "users"), where("uid", "==", uid));

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Check if the document exists
    if (querySnapshot.empty) {
      console.log("No matching documents");
      return null;
    }

    // Get the first document from the query snapshot
    const userData = querySnapshot.docs[0].data();

    // Return the user data
    return userData;
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
}

function toCamelCase(str) {
  const camelCaseStr = str.replace(/[-_](.)/g, (_, char) => char.toUpperCase());
  return camelCaseStr.charAt(0).toUpperCase() + camelCaseStr.slice(1).toLowerCase();
}



function App() {
  const auth = getAuth(app);
  const[bodycolor,Setbodycolor]=useState("#002f34")
  const [level,SetLevel]= useState(1)
  const [user, setUser] = useState();
  const[data,setData]=useState("")
  const[url,setUrl]=useState("")
// const navigate=useNavigate()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        
        Setbodycolor("white")
        setUser(user)
        // User is signed inusedat
        const uid = user.uid;
        getUserDataByUID(uid)
          .then((userData) => {
            if (userData) {
              console.log("User data:", userData);
              
              
setData(toCamelCase(userData.name))
setUrl(userData.profileImage)
console.log(data);

              
              
             
            
        
        
            }})
      } else {
        console.log("no user found");
        setUser(null)
        Setbodycolor("#002f34")
        setUrl("")

      }
    
    });
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = bodycolor;
  }, [bodycolor]);
  const protectedRoute = (component) => {
    if (user) {
      return component;
    } else {
      // navigate("/login");
      return  <Navigate to="/"/>
     
      // return <Login />;
    }
  };

  //component login signup
  const protectedRouteAuth = (component) => {
    if (user) {
      return <Dashboard  data={data}/>;
    } else {
      // navigate("/login");
      return component;
    }
  };



  return (
    <div className="App">
      <Provider store={store}>
      <BrowserRouter>
      
      {/* <Navbar setlevel={SetLevel}   setcolor={Setbodycolor}/> */}
      <NavScrollExample Setbodycolor={Setbodycolor} url={url}/>
      <Routes>
        <Route path='/' element={protectedRouteAuth(<Login />)}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/dashboard' element={protectedRoute(<Dashboard data={data} />)}/>
        <Route path='/createadd' element={protectedRoute(<CreateAd Setbodycolor={Setbodycolor} />)}/>
        <Route path='/myads' element={protectedRoute(<MyAds />)}/>
        <Route path='/myprofile' element={protectedRoute(<MyProfile/>)}/>
        <Route path='/AdDetail/:id' element={protectedRoute(<AdDetail/>)}/>
        <Route path='/favouriteAd' element={protectedRoute(<FavouriteAd/>)}/>

      </Routes>
      </BrowserRouter>
      </Provider>
    
{/* {level===1 && <Signup setlevel={SetLevel}/>}
{level===2 && <Login setlevel={SetLevel} setcolor={Setbodycolor}/>}
{level===3 && <Dashboard setlevel={SetLevel} user={user}  setcolor={Setbodycolor}/>}
{level===4 && <CreateAd setlevel={SetLevel} setcolor={Setbodycolor} />}
{level===5 && <MyAds setlevel={SetLevel} setcolor={Setbodycolor} />}
{level===6 && <MyProfile setlevel={SetLevel} setcolor={Setbodycolor} />} */}

    
    </div>
  );
}

export default App;
