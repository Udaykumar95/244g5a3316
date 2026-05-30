import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand">
          Campus Notifications
        </NavLink>

        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/" end>
            All Notifications
          </NavLink>
          <NavLink to="/priority">Priority Inbox</NavLink>
          <NavLink to="/filter">Filter Notifications</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
