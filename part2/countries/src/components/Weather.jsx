
const Weather = ({ city, weather }) => {

    if (weather) {    
    const getWeatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    const windSpeed = (Math.round((weather.wind.speed * 3.6) * 100) / 100).toFixed(2)
    const compassSector = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
    const windDirection = compassSector[(weather.wind.deg / 22.5).toFixed(0)];
    return (
    <div>
        <h2>Weather in {city}</h2>
        <p><strong>Temperature: </strong> {weather.main.temp}° Celsius</p>
        <img src={getWeatherIcon} alt='weatherIcon'/>
        <p><strong>Wind: </strong>{windSpeed} km/h direction {windDirection}</p>
    </div>
  )}
  return <h2>No weather report available for this country</h2>
}


export default Weather