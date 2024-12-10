import React, { useState } from "react";
import "./App.css";

function App() {
  
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [city, setcity] = useState("");
  const [cityinformations, setcityinformations] = useState({});

  const handleweather = () => {
    setloading(true);
    seterror(null);
    const apikey = "44f6efc4d7bf5f85ca0b6e3f638b629a";
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=fr`;
    fetch(apiurl)
      .then((Response) => {
        if (!Response.ok) {
          setcityinformations(null);
          throw new Error("City not found");
        }
        return Response.json();
      })
      .then((data) => {
        setcityinformations({
          Name: data.name,
          Temperature: data.main.temp,
          Description: data.weather[0].description,
          Humidity: data.main.humidity,
          WindSpeed: data.wind.speed,
        });
      })
      .catch((err) => {
        seterror(err.message);
        setcityinformations({});
      })
      .finally(() => setloading(false));
  };

  return (
    <div className="body">
      <section>
        <h1>Application Meteo:</h1>
        <div className="input-button">
          <input
            placeholder="Entrer une ville"
            type="text"
            onChange={(e) => setcity(e.target.value)}
          />

          <button onClick={() => handleweather()} disabled={!city}>
            Rechercher
          </button>
        </div>

        <div>
          {" "}
          {error && <p id="error">{error}</p>}
          {loading && <p id="loading">Loading...</p>}
          {cityinformations && !loading && cityinformations.Name && (
            <div>
              {" "}
              <p id="cityname">{cityinformations.Name}</p>
              <p class="elements">
                Temperature:{" "}
                <span className="span">{cityinformations.Temperature}℃</span>
              </p>
              <p class="elements">
                Conditions:{" "}
                <span className="span">{cityinformations.Description}</span>
              </p>
              <p class="elements">
                Humidity:{" "}
                <span className="span">{cityinformations.Humidity}%</span>
              </p>
              <p class="elements">
                Wind Speed:{" "}
                <span className="span">{cityinformations.WindSpeed}km/h</span>
              </p>{" "}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;