import React, { useEffect, useState } from 'react'
import CovidData from './CovidData';
import axios from 'axios';
const Practice = () => {
  const [num , setNum] = useState();
  const [name, setName] = useState();
  const [moves, setMoves] = useState();
  const getData = async() => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`);
    console.log(res);
    setName(res.data.name);
    setMoves(res.data.moves.length);
  }
  useEffect(() => {
    getData();
  });

  return (
    <div>
        <CovidData number={num} change={(event) => setNum(event.target.value)} name={name} move={moves}/>
    </div>
  )
}
export default Practice;


