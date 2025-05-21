import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export function Header() {
  const location = useLocation();

  if (location.pathname === "/user") {
    return (
      <nav className="main-nav">
        <Link to="/" className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src="../../public/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
        </Link>
        <div>
          <Link to="/user" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Tony
          </Link>
          <Link to="/" className="main-nav-item">
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src="../../public/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
      </Link>
      <div>
        <Link to="/sign-in" className="main-nav-item">
          <i className="fa fa-user-circle"></i>
          Sign In
        </Link>
      </div>
    </nav>
  );
}
