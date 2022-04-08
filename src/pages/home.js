import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import "../assets/styles.css";

const Home = () => {
  return (
    <div className="home-page-div">
      <div className="home-page">
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
    </div>
  );
};

export default Home;
