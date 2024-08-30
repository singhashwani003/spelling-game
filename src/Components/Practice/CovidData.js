import React from 'react';

 const CovidData = (props) => {
  return (
    <div>
    <div className="container my-5 py-5">
      <form className='d-flex justify-content-center align-items-center'>
        <label className="pe-2" htmlFor="cars">Choose a number : </label>
        <select value={props.number} name="cars" id="cars" onChange={props.change}>
          <option value="1">1</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
        </select>
      </form>
      <h2 className='text-center my-3'>You Choose a value <span className='text-danger fw-bolder'>{props.number}</span></h2>   
      <h2 className='text-center my-3'>My Name is <span className='text-danger fw-bolder'>{props.name}</span></h2>      
      <h2 className='text-center my-3'>I have a <span className='text-danger fw-bolder'>{props.move}</span> moves</h2>      
    </div>
  
    </div>
  )
}
export default CovidData;

