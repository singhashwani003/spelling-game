import React from 'react'
const Increment = () => {
  return (
    <div>
        <div className="intent"> 
            <input className="val" value="0" type="text" inputmode="numeric"></input>
            <div className="ctrls">
                <button className="ren btn v_sub">−</button>
                <button className="ren btn v_add">+</button>
            </div>
            <div id="ping"></div>
        </div>
        <div className='text-center fs-4 fw-bold text-light'>Aman Singh</div>
    </div>
  )
};
export default Increment;
