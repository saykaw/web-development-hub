import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'

const Home = () => {

    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if (token){
            const user = jwt_decode(token);
            //user does not exist
            if(!user){
                localStorage.removeItem('token');
                navigate('/')
            }
            else{
                navigate('/home')
            }
        }

    },[])


  return (
    <div>
        <h1>Welcome!!!</h1>
    </div>
  )
}

export default Home;