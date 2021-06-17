import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated, isSuperAdmin }) => {
  const handleLogout = () => {
    localStorage.setItem("authToken", null);
    setIsAuthenticated(false);
  };

  return (
    <nav
      style={{ minHeight: "8vh", backgroundColor: "#E1EFF7" }}
      className="navbar navbar-expand-lg navbar-light"
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src="/assets/logo.png" alt="logo" style={{ height: "6vh" }} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          {isAuthenticated && !isSuperAdmin ? (
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/inventory">
                  Inventory
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/addProduct">
                  Add Product
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orderhistory">
                  Order History
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  Cart
                </Link>
              </li>
            </ul>
          ) : !isAuthenticated ? (
            <ul className="ms-auto navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/signin">
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Sign Up
                </Link>
              </li>
            </ul>
          ) : null}
          {isAuthenticated && (
            <ul className="ms-auto navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <img
                  src="/assets/log-out.svg"
                  alt="logout"
                  onClick={handleLogout}
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                />
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
