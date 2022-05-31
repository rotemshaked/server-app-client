import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./home.css";

const Home = ({ setCurrencyIsShown }) => {
  useEffect(() => {
    setCurrencyIsShown(false);
  }, []);

  return (
    <div className="home-page-container">
      <div className="first-sentence">Welcome to servers manager</div>
      <div className="second-sentence">
        Web app that allows users manage servers
      </div>
      <Link to="/servers">
        <button className="button-1">
          <FontAwesomeIcon icon={faArrowRight} />
          &nbsp; Servers List
        </button>
      </Link>
    </div>
  );
};

export default Home;
