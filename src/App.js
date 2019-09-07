import React, {Component} from 'react';
import './App.css';
import WeatherContext from './weatherContext';
import FiveDayForecast from './fiveDay/fiveDayForecast';
import SearchBar from './searchBar/searchBar'

class App extends Component{
  state = {
        countries: [],
        weather: '',
        city: '',
        days: 5,
        country: null,
        zip: "", 
        showing: false
      }
 
    
  setCountry = (country) => {
    this.setState({
        country
    })
  }

  setZip = (zip) => {
    this.setState({
      zip
    })
  }

  componentDidMount() {
    fetch('https://country.register.gov.uk/records.json?page-size=5000')
        .then(response => {
            console.log('About to check for errors');
            if(!response.ok) {
                console.log('An error occured, lets throw an error');
                throw new Error('Something went wrong');
            }
            return response;
        })
        .then(response => response.json())
        .then(data => {
            const countries = Object.keys(data)
                .map(key => data[key].item[0]);
            this.setState({
                countries,
                error: null
            });
        })
        .catch(err => {
            console.log('Handling the error', err);
            this.setState({
                error: err.message
            });
        });
    }
  
  findWeather= (e) => {
    e.preventDefault();
    const { country, zip,} = this.state;
    const url = `http://api.openweathermap.org/data/2.5/forecast?zip=${zip},${country}&APPID=43ca8a1df3dd4090279c950a7db4fd48`
    console.log(url)
    fetch(url)
      .then(response => {
        console.log('About to check for errors');
        if(!response.ok) {
            console.log('An error occured, lets throw an error');
            throw new Error('Something went wrong');
        }
        return response;
    })
    .then(response => 
        response.json())
    .then(data => {
        const weather = data.list;
        const city = data.city
        this.setState({
            weather,
            city,
            error: null,
            showing: true,
        });
    })
    .catch(err => {
        console.log('Handling the error', err);
        this.setState({
            error: err.message
        });
    });
  }

  render(){
    const contextValue = {
      countries: this.state.countries,
      weather: this.state.weather,
      city: this.state.city,
      days: this.state.days,
      zip: this.state.zip,
      changeCountryCode: this.setCountry,
      changeZipCode: this.setZip,
      handleSubmit: this.findWeather
    }
    return (
      <div className="App">
        <WeatherContext.Provider value = {contextValue}>
          <header className="App-header">
            <SearchBar />
          </header>
          <main>
            {this.state.showing && <h2>{`5 Day ${this.state.city.name} Forecast`}</h2>}
            {this.state.showing && <FiveDayForecast days={5}/>}
          </main>
        </WeatherContext.Provider>
      </div>
    );
  }
}

export default App;
