import "./Nav.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context";

const Nav = () => {
  const [state, setState] = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    setState({ data: null, loading: false, error: null });
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="navbar">
      <h4 className="home-heading">
        <Link to="/" className="home">
          Home
        </Link>
      </h4>
      {state.data ? (
        <h4 className="home-heading">
          <a className="home" onClick={handleLogout}>
            Logout
          </a>
        </h4>
      ) : null}
    </div>
  );
};

export default Nav;
