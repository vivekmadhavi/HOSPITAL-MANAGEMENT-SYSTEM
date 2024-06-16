import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import { element } from 'angular';
import { Navigate } from 'react-router-dom';

const Messages = () => {
  const [messages, setMessage] = useState([]);
  const {isAuthenticated} = useContext(Context);

  useEffect(()=>{
    const fetchMessage = async() =>{
      try{
        const {data} = await axios.get("http://localhost:4000/api/v1/message/getAll",{withCredentials:true}
        );
        setMessage(data.messsage);
      }catch(error){
        console.log("ERROR OCCURED WHILE FETCHING THE MESSAGE", error);
      }
    }
    fetchMessage();
  },[]);

  if(!isAuthenticated){
    return <Navigate to ={"/login"}/>;
  }
  return <section className='page messages'>
    <h1>MESSAGE</h1>
    <div className='banner'>
      {
        messages && messages.length > 0 ?(messages.map(element=>{
          return(
            <div className='card'>
              <div className="details"></div>
              <p>First Name: <spam>{element.firstName}</spam></p>
              <p>Last Name: <spam>{element.lastName}</spam></p>
              <p>Email: <spam>{element.email}</spam></p>
              <p>Phone: <spam>{element.Phone}</spam></p>
              <p>Message: <spam>{element.message}</spam></p>
            </div>
          )
        })):(<h1>no messages!</h1>)
      }
    </div>

  </section>
}

export default Messages
