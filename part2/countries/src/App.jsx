import { useEffect, useState } from "react"
import axios  from "axios"
import './App.css'

//components
const Display = ({inputValue, setInputValue, filteredCountries}) => {
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
            {country.name.common} <br />
            Capital: {country.capital} <br />
            Area: {country.area} <br />
            {/* Language: {country.languages} <br /> */}
            <img src={country.flags.png} alt="#" /> </li>
        ))}
      </ul>
    </>
  )
}


const App = () => {
  const [inputValue, setInputValue] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    //get data from API
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => setCountries(response.data))
      .catch(error => {console.error('There is an issue while getting data from server:', error)
    });
  }, [])

  useEffect(() => {
    //filter countries that matches our input value
    const filtered = countries.filter(e => 
      e.name.common.toLowerCase().includes(inputValue.toLocaleLowerCase()))
    if (inputValue === '') {
      setFilteredCountries([])
    } else if (filtered.length > 0) {
      setFilteredCountries(filtered)
    } else {
      // if we don't have any match return an empty array
      setFilteredCountries([])
    }
  }, [inputValue, countries])

  return (
    <div>
      <h1>Info by Country</h1>
      <Display
        inputValue={inputValue}
        setInputValue={setInputValue}
        filteredCountries={filteredCountries} />
    </div>
  )
}

export default App