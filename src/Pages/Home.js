import React from 'react';
import {useDispatch, useSelector} from "react-redux";
const Home = () => {
const dispatch = useDispatch();
const handle =  () => {
    const user = {
        name : "Aman Singh",
        age : 23,
        live : "Thane",
    };
    dispatch({type : "login", payload : user});
}
const {user , valid} = useSelector((state => state.user));
  return (
    <div>
      <div className='container mt-5 pt-5'>
        <h1 className='d-flex justify-content-center align-items-center fw-bold'>{valid && user.name}</h1>
        <div className='d-flex justify-content-center align-items-center'>
          <button type="button" class="btn btn-primary btn-lg" onClick={handle}>login</button>
        </div>
      </div>
    </div>
  )
}
export default Home;
