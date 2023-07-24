import { Link } from "react-router-dom";
import "./navbar.scss";
//import { menu } from "../../data";

const Navbar = ({ updateActivePage }) => {
  return (
    <div className="navbar">
      <Link to="/" className="logo" onClick={() => updateActivePage("Dashboard")}>
        <img src="houseofjlogo.png" alt="" />
        <span>House of J</span>
      </Link>
      <div className="icons">
        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        <div className="user">
          <img
            src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt=""
          />
          <span>Jane</span>
        </div>
        <img src="/settings.svg" alt="" className="icon" />
      </div>
    </div>
  );
};

export default Navbar;
