import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getCurrencies } from "../../services/services";
import "./navbar.css";

const Navbar = ({
  conversionRates,
  setConversionRates,
  setCurrency,
  currencyIsShown,
}) => {
  const getCurrenciesRates = async () => {
    const abortController = new AbortController();
    const currenciesRates = await getCurrencies(abortController);
    if (currenciesRates) setConversionRates(currenciesRates);
  };

  useEffect(() => {
    getCurrenciesRates();
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
