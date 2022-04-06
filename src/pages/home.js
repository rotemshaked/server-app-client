import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

import "../assets/styles.css";

const Home = () => {
  return (
    <div className="home-page">
      <div className="first-sentence">Welcome to servers manager</div>
      <div className="second-sentence">
        Web app that allows users manage servers
        <FontAwesomeIcon icon={faArrowDown} />
      </div>
      <Link to="/servers">
        <button className="button-1">Servers List</button>
      </Link>
    </div>
  );
};

export default Home;
