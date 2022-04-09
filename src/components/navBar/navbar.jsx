import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./navbar.css";

const NavBar = ({
  conversionRates,
  setConversionRates,
  setCurrency,
  showChangeCurrency,
}) => {
  useEffect(() => {
    const abortController = new AbortController();
    try {
      axios
        .get(
          "https://v6.exchangerate-api.com/v6/0e4c0b6173479f83c9344560/latest/USD",
          { signal: abortController.signal }
        )
        .then((data) => {
          setConversionRates(data.data.conversion_rates);
        });
    } catch (error) {
      if (error.name === "AbortError") return;
      throw error;
    }
    return () => {
      console.log("abort conversion rates");
      abortController.abort();
    };
  }, []);

  const handleSelectedCurrency = async (e) => {
    try {
      let currentCurrency = e.target.value;
      setCurrency(currentCurrency);
    } catch (err) {
      console.log(err);
    }
  };

  let currencies = Object.keys(conversionRates);

  return (
    <div className="nav-bar">
      <Link className="home" to="/">
        Home Page
      </Link>
      <Link className="servers-list" to="/servers">
        Servers List
      </Link>
      <Link className="create-server" to="/create">
        Create Server
      </Link>
      {showChangeCurrency && (
        <div className="pick-currency">
          <div className="pick-currency-div">Pick Currency &nbsp;</div>
          <div>
            <select
              onChange={(e) => handleSelectedCurrency(e)}
              className="currency"
            >
              {currencies.map((currency) => {
                return (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
