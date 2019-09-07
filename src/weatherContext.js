import React from 'react';

const WeatherContext = React.createContext({
    weather: [],
    days: "",
    zip: ""
})

export default WeatherContext;