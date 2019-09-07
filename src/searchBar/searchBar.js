import React, {Component} from 'react';
import './searchBar.css';
import WeatherContext from '../weatherContext'

export default class SearchBar extends Component{
    static contextType = WeatherContext;

    handleCountryChange(value) {
        console.log('handleChange value is ' + value)
        if(value === "None") {
            this.context.changeCountryCode(null);
        } else {
            const country = this.context.countries.find(country => country.country === value);
            this.context.changeCountryCode(country.country);
        }
    }

    handleZipChange(value) {
        console.log('zip value is ' + value);
        this.context.changeZipCode(value);
    }

    render(){
        const {countries, zip, handleSubmit} = this.context;
        const options = 
            countries
            .sort((a, b) => a.name > b.name ? 1 : -1)
            .map(
                (country, i) => <option value={country.country} key={i}>{country.name}</option>
            );
    
        return (
            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="zip-code">Enter your zip code:</label>
                <input 
                    type="text" 
                    name="zip-code" 
                    id="zip-code" 
                    required 
                    aria-required="true" 
                    value={zip}
                    onChange={(e) => this.handleZipChange(e.target.value)}>
                </input>
                <label htmlFor="country-code">Select your country:</label>
                <select
                    name="country-code" 
                    id="country-code"
                    onChange={(e) => this.handleCountryChange(e.target.value)}>
                    <option value="None">Select one...</option>
                        {options}
                </select>
                <button type="submit">Submit</button> 
            </form>
        )
    }
}