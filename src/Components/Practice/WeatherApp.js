import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import dateFormat from "dateformat";
import WeatherDetail from './WeatherDetail';
 const WeatherApp = () => {
  const [search , setSearch] = useState("thane");
  const [city, setCity] = useState(null);
  useEffect(() => {
    const getData = async() => {
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=a3a93db43ead19b85139fa3c7e73c928`)
        const actualData = await res.json();
        console.log(actualData);
        setCity(actualData);
        console.log(setCity(actualData));
      }catch (error) {
          console.error('Error fetching the weather data:', error);
      }
    }
    getData();
  }); 

  const convertTimezone = (timezoneOffset) => {
    const date = new Date();
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    const localDate = new Date(utcDate.getTime() + timezoneOffset * 1000);
    return dateFormat(localDate, 'dddd, mmmm dd, yyyy " at " HH:MM TT');
  };
  return (
    <div>
        <WeatherDetail 
        city={city} 
        search={search}
        convert={convertTimezone} 
        change={(e) => setSearch(e.target.value)}
         />
    </div>
  )
}
export default WeatherApp;
