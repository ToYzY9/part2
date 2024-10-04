import { useState, useEffect } from "react";
import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

const FilterCountry = ({ search, handleSearch }) => {
    return (
        <div>
            Find countries <input value={search} onChange={handleSearch} />
        </div>
    );
};

const Language = ({ language }) => {
    return <li>{language}</li>;
};

const Languages = ({ country }) => {
    return (
        <ul>
            {Object.values(country.languages).map((language) => {
                return <Language key={language} language={language} />;
            })}
        </ul>
    );
};

const Country = ({ country }) => {
    const [weatherApp, setWeatherApp] = useState([]);

    const options = {
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather",
        params: {
            q: `${country.capital[0]}`,
            appid: apiKey,
            units: "metric",
        },
    };

    useEffect(() => {
        axios
            .request(options)
            .then((res) => {
                setWeatherApp(res.data);
            })
            .catch((err) => console.log("error", err));
    }, []);

    const { main, weather, wind } = weatherApp;

    if (!main || !weather || !wind) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital[0]}</p>
            <p>Area {country.area}</p>
            <h4>Languages:</h4>
            <Languages country={country} />
            <img
                style={{ width: "170px" }}
                src={country.flags.png}
                alt={country.flags.alt}
            />
            <h3>Weather in {country.capital[0]}</h3>
            <p>Temperature {`${main.temp}° Celcius`}</p>
            <div>
                <img
                    src={`/public/img/${weather[0].icon}.png`}
                    alt={`${weather[0].description}`}
                />
            </div>
            <p>{`Wind ${wind.speed} m/s`}</p>
        </div>
    );
};

const CountriesLine = ({ country }) => {
    return <div>{country.name.common}</div>;
};

const Countries = ({ listCountries }) => {
    return (
        <div>
            {listCountries.length === 0 ? (
                <p>No country available</p>
            ) : listCountries.length > 10 ? (
                <p>Too many matches, specify another filter</p>
            ) : (
                listCountries.map((country) => {
                    if (listCountries.length === 1) {
                        return (
                            <Country
                                key={country.name.common}
                                country={country}
                            />
                        );
                    } else {
                        return (
                            <CountriesLine
                                key={country.name.common}
                                country={country}
                            />
                        );
                    }
                })
            )}
        </div>
    );
};

function App() {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then((res) => {
                setCountries(res.data);
            })
            .catch((err) => console.log("error", err));
    }, []);

    const searchCountries = (pArr, pQuery) => {
        return pArr.filter(function (el) {
            return el.name.common.toLowerCase().includes(pQuery.toLowerCase());
        });
    };

    const listCountries = searchCountries(countries, search);

    return (
        <>
            <FilterCountry
                search={search}
                handleSearch={(e) => setSearch(e.target.value)}
            />
            <Countries listCountries={listCountries} />
        </>
    );
}

export default App;
