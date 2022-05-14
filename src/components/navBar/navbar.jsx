import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./navbar.css";

const Navbar = ({
  conversionRates,
  setConversionRates,
  setCurrency,
  currencyIsShown,
}) => {
  useEffect(() => {
    const abortController = new AbortController();
    try {
      axios
        .get(
          // "https://v6.exchangerate-api.com/v6/0e4c0b6173479f83c9344560/latest/USD",
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
    setCurrency(e.target.value);
  };

  let currencies = Object.keys(conversionRates);

  return (
    <div className="navbar-container">
      <Link className="navbar-link" to="/">
        Home Page
      </Link>
      <Link className="navbar-link" to="/servers">
        Servers List
      </Link>
      <Link className="navbar-link" to="/create">
        Create Server
      </Link>
      {currencyIsShown && (
        <div className="pick-currency-container">
          <div>Pick Currency &nbsp;&nbsp;</div>
          <div>
            <select
              onChange={(e) => handleSelectedCurrency(e)}
              className="currency-pick"
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

export default Navbar;
