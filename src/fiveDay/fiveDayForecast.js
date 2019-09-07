import React, {Component} from 'react';
import WeatherContext from '../weatherContext';
import './fiveDayForecast.css';
import moment from 'moment';

export default class FiveDayForecast extends(Component){
    static contextType = WeatherContext;
    static defaultProps={
        days: 5
    }

    mapTheWeather(day,i){
        return( 
            <li key={i} className="weather-li">
                <p>{moment.unix(day.dt).format("h:mm a")}</p>
                <img 
                    className="weather-icon"
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} 
                    alt={`${day.weather[0].description} icon`}/>
               <h5>{(day.weather[0].description).split(" ").map(word => {
                        return word.charAt(0).toUpperCase() + word.slice(1)
                    }).join(" ")}</h5>
               <h3>{Math.floor((day.main.temp_min) * (9/5) - 459.67)} / 
                    {Math.floor((day.main.temp_max) * (9/5) - 459.67)}</h3>
            </li>  )
    }

    render() {
        const { weather, days } = this.context;

        const dates = new Array(days).fill().map((_, i) => moment().add(i, 'days'));
        
        const splitDays = dates.map(date =>
            weather.filter(day => 
                day.dt_txt.includes(date.format('YYYY-MM-DD')))
            )
        
        const daySpecificWeather = splitDays.map((date, i) =>
                (date[i] ? 
            <li key={i}>
                <h3>{moment(date.dt).format("dddd, MMMM Do YYYY")}</h3>
                <ul className="day-ul">
                    {date.map(this.mapTheWeather)}
                </ul>
            </li> :
            ""
            )
        )

        return (
            <div className="five-day-forecast">
                <ul className="five-day-forecast-list">
                    {daySpecificWeather}
                </ul>
            </div>
        )
    }
}