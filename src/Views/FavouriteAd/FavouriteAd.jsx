import React from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { add,remove } from '../../store/favouriteslice';
import { TextField,Button } from '@mui/material';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const FavouriteAd = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const handleData=(id)=>{
        dispatch(remove(id))
    
      }
      
        const item=useSelector((state)=>{
        return state.favourite
     })
     console.log(item);
 
    
    return (
      <div>
      <div className='mn'>
        {item.length === 0 ? (
          <div className='unhap'>
          <h1>Sorry ! You Have No Favourite Ads </h1>
          <MoodBadIcon sx={{ fontSize: 45.5 }}/>
          </div>
        ) : (
          item.map((val) => (
            <div className='ad-cards' key={val.id}>
              <div className='ad-images'>
                <img
                  src={val.image[0]}
                  onClick={() => {
                    navigate('/AdDetail/' + val.id);
                  }}
                  alt='Ad Image'
                />
              </div>
              <div className='ad-detailss'>
                <h3 className='ad-titles'>{val.title}</h3>
                <Button
                  sx={{
                    color: 'white',
                    backgroundColor: '#002f34',
                  }}
                  variant='outlined'
                  className='sign-btn'
                  size='small'
                  onClick={() => handleData(val.id)}
                >
                  Remove From Favourite
                </Button>
                <div className='ad-infos'>
                  <p className='ad-prices'>{val.price}</p>
                  <p className='ad-locations'>{val.location}</p>
                </div>
              </div>
            </div>
            ))
            )}
          </div>
        </div>

    )
}

export default FavouriteAd;
