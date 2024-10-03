import { useState, useEffect } from "react";
import axios from "axios";

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
        </div>
    );
};

const CountriesLine = ({ country }) => {
    const [showDetails, setShowDetails] = useState(false);

    const showCountryDetails = () => {
        setShowDetails(!showDetails);
    };
    return (
        <div>
            <span>{country.name.common}</span>
            <button onClick={showCountryDetails}>
                {showDetails ? "Hide" : "Show"}
            </button>
            {showDetails && <Country country={country} />}
        </div>
    );
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
                    return (
                        <CountriesLine
                            key={country.name.common}
                            country={country}
                        />
                    );
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
