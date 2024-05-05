import axios from "axios"
import { useState, useEffect } from "react"

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)

  const languages = Object.values(country.languages)
  const flagUrl = country.flags.png
  const capital = country.capital[0]

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_API_KEY
    const lat = country.capitalInfo.latlng[0]
    const lon = country.capitalInfo.latlng[1]
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    axios.get(url).then(({ data }) => {
      setWeather(data)
    })
  }, [country.capitalInfo.latlng])
10
  if (!weather) {
    return null
  }

  const icon = weather.weather[0].icon
  const weatherIconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`

  return (
    <div>
      <hr /> <h2 className="font-semibold">{country.name.common}</h2> <hr />
      <div className="font-light">
        <p>Region: {country.region}</p>
        <p>Population: {country.population}</p>
        <p>Capital: {capital}</p>

        <h4>Languages:</h4>

        <ul>
          {languages.map((language, index) => <li key={index}>-{language}</li>)}  
        </ul> <br />

        <img className="w-20" src={flagUrl} width='200' /> <br />

        <h4>Weather in {capital}</h4>

        <p>Temperature: {weather.main.temp} Celsius</p>

        <img src={weatherIconUrl} width='80' />

        <p>Wind: {weather.wind.speed} m/s</p>
      </div>
    </div>
  )
}

const CountryList = ({ countries, showCountry }) => {
  if ( countries.length>10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  if ( countries.length===1) {
    return <Country country={countries[0]} />
  }

  return (
    <div>
      {countries.map((c, index) =>
        <p className="my-3" key={index}>
          {c.name.common}
          <button 
            className="transition duration-100 ease-in-out bg-blue-400 ml-2 px-2 text-white rounded-md hover:bg-blue-300" 
            onClick={() => showCountry(c.name.common)}>
            Show
          </button>
        </p>
      )}
    </div>
  )
}
 
const App = () => {
  const [search, setSearch] = useState('turkey')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(({ data }) => {
      setCountries(data)
    })
  }, [])

  const matchedCountries = countries.filter(c => c.name.common.toLowerCase().includes(search.toLocaleLowerCase()))

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-slate-200 shadow-lg rounded-md p-4 mt-10">
        <div>
          <h3 className="text-2xl text-gray-500 font-bold m-0 ">Search for a Country</h3> <br />
          <input 
            className="glow rounded-md px-1 mb-5 border border-solid border-gray-400" 
            value={search} 
            onChange={({ target }) => setSearch(target.value)}
            placeholder="Search..." />
        </div>
        <CountryList 
          countries={matchedCountries}
          showCountry={setSearch}
        />
      </div>
    </div>
  )
}

export default App