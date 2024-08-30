import React from 'react'
import "./Practice.css";
 const WeatherDetail = (props) => {
  return (
    <div>
      <div className="container">
            <div className="weather__header">
                <form className="weather__search">
                    <input type="text" placeholder="Search for a city..." className="weather__searchform" onChange={props.change}></input>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </form> 
            </div>
            {!props.city ? (
                <div className="weather__body">
                    <h1 className="weather__city">Data not found</h1>
                </div>
            ): 
            <div>
                <div className="weather__body">
                    <h1 className="weather__city">{props.search}</h1>
                    <div className="weather__datetime">{props.convert(props.city.timezone)}</div>
                    <div className="weather__forecast">{props.city.weather[0].main}</div>
                    <p className="weather__temperature mt-4">{props.city.main.temp}°C</p>
                    <div className="weather__minmax">
                        <p>Min: {props.city.main.temp_min}°C</p>
                        <p>Max: {props.city.main.temp_max}°C</p>
                    </div>
                </div>
                <div className="weather__info">
                    <div className="weather__card">
                        <i className="fa-solid fa-temperature-full"></i>
                        <div>
                            <p>Real Feel</p>
                            <p className="weather__realfeel">{props.city.main.feels_like}°C</p>
                        </div>
                    </div>
                    <div className="weather__card">
                        <i className="fa-solid fa-droplet"></i>
                        <div>
                            <p>Humidity</p>
                            <p className="weather__humidity">{props.city.main.humidity}%</p>
                        </div>
                    </div>
                    <div className="weather__card">
                        <i className="fa-solid fa-wind"></i>
                        <div>
                            <p>Wind</p>
                            <p className="weather__wind">{props.city.wind.speed}m/s</p>
                        </div>
                    </div>
                    <div className="weather__card">
                        <i className="fa-solid fa-gauge-high"></i>
                        <div>
                            <p>Pressure</p>
                            <p className="weather__pressure">{props.city.main.pressure}hpa</p>
                        </div>
                    </div>
                </div>
            </div>
        }

      </div>
    </div>
  )
}
export default WeatherDetail;
