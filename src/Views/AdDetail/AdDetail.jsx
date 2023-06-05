import React from 'react';
import { useParams } from "react-router-dom"
import { useState,useEffect } from 'react';
import { collection } from "firebase/firestore"
import { where } from "firebase/firestore"
import {query,} from "firebase/firestore"
import { doc,getDoc,getFirestore } from "firebase/firestore"
import app from '../../firebase';
import { onAuthStateChanged,getAuth } from "firebase/auth";
import Carousel from 'react-bootstrap/Carousel';

const AdDetail = () => {
    const uid = useParams().id
    console.log(uid);
    const [adData,setAddata] = useState({})
    const [images,setImages] = useState([])
    console.log(uid)
    const auth = getAuth(app);
    const db = getFirestore(app);

    

    useEffect(()=>{

        // const uid = auth.currentUser.uid;
        // const q = query(collection(db, "Ads"), where("userId", "==", uid));

        const docRef = doc(db, "ads", uid);
        // console.log(docRef)


        const getData = async () => {
            const docSnap = await getDoc(docRef);
            console.log("data=>",docSnap.data())
            console.log(docSnap.data().image)
            setAddata(docSnap.data())
            setImages(docSnap.data().image)
        }
        
        getData();
        
        // const getData = async () => {
        //     try {
        //         const data = await getDocs(adsCollectionRef)
        //         const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        //         // console.log(filteredData)
        //         setDbads(filteredData)
        //         keyDown()
        //         // console.log(dbads)
    
        //         }
        //         catch (err) {
        //             console.log(err)
        //         }
        //     }
    
        //     getData();

    },[uid])

    return (
//         <div className='main'>
// <div className="head">
//             <div className='sldr'>
//         <Carousel fade>
//         {
//             images.map((val,ind)=>{
//                return<Carousel.Item >
//                <img
//                  className="d-block w-100"
//                  src={val}
//                  alt="First slide"
//                />
              
//              </Carousel.Item>
//             })
//         }
//       </Carousel>
//       </div> 
// <div className='name'>
// <div><h1>Seller Name:{adData.name}</h1>
// </div>
// <br/>
// <div><h1>Phone Number:{adData.number}</h1>
// </div>
// </div>
//         </div>
       
//         </div>
<div className="ad-detail-container">
<div className="ad-image-slider">
  {/* Image Slider */}
  <Carousel fade>
        {
            images.map((val,ind)=>{
               return<Carousel.Item >
               <img
                 className="d-block w-100 slider-image "
                 src={val}
                 alt="First slide"
               />
                            </Carousel.Item>
            })         }       </Carousel>
</div>
<div className="ad-detail-info">
    <div className='dtl'>
  <h2 className="ad-title">{adData.title}</h2>
  <div className="ad-price-location">
    <span className="ad-price">Price: {adData.price}</span>
    <span className="ad-location">Location: {adData.location}</span>
    </div>
  </div>
  <div className="ad-description">
    <h3 className="section-title">Description</h3>
    <p><h2>Condition:{adData.condition}</h2>{adData.description}</p>
  </div>
  <div className="ad-seller-details">
    <h3 className="section-title">Seller Details</h3>
    <div className="seller-info">
      
      <div className="seller-name">{adData.name}</div>
      <div className="seller-contact">
        <a href="tel:+1234567890">{adData.number}</a>
       
      </div>
    </div>
  </div>
</div>
</div>
    );
}

export default AdDetail;
