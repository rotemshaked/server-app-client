import { Link } from "react-router-dom";
import "./navbar.css";

const NavBar = () => {
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
    </div>
  );
};

export default NavBar;
