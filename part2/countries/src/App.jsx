import { useEffect, useState } from "react";
import axios from "axios";
import './App.css';

// CountryDetail component to display detailed information for a single country
const CountryDetail = ({ country, onClose }) => {
  return (
    <div>
      <h2>{country.name.common} Details</h2>
      <p>Region: {country.region}</p>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <img src={country.flags.png} alt="#" /> <br />
      <button onClick={onClose}>Close</button>
    </div>
  );
}

// Display component with the list of countries and buttons to show/hide details
const Display = ({ inputValue, setInputValue, filteredCountries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const showDetails = (country) => {
    setSelectedCountry(country);
  };

  const hideDetails = () => {
    setSelectedCountry(null);
  };

  return (
    <>
      <input 
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder="Search..." />
      <ul>
        {filteredCountries.map((country, index) => (
          <li key={index}>
            {country.name.common}{' '}
            {selectedCountry === country ? (
              <button onClick={hideDetails}>Hide Details</button>
            ) : (
              <button onClick={() => showDetails(country)}>Show Details</button>
            )}
            {selectedCountry === country && (
              <CountryDetail country={country} onClose={hideDetails} />
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    // Get data from API
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => setCountries(response.data))
      .catch(error => {
        console.error('There is an issue while getting data from server:', error);
      });
  }, []);

  useEffect(() => {
    // Filter countries that match our input value
    const filtered = countries.filter(e => 
      e.name.common.toLowerCase().includes(inputValue.toLocaleLowerCase()));
    if (inputValue === '') {
      setFilteredCountries([]);
    } else if (filtered.length > 0) {
      setFilteredCountries(filtered);
    } else {
      // If we don't have any match, return an empty array
      setFilteredCountries([]);
    }
  }, [inputValue, countries]);

  return (
    <div>
      <h1>Info by Country</h1>
      <Display
        inputValue={inputValue}
        setInputValue={setInputValue}
        filteredCountries={filteredCountries} />
    </div>
  );
}

export default App;
