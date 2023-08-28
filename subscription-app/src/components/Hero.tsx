import React, { useState, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import heroImage from "../assets/bg-image-new.jpg";
import "./Hero.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context";

const Hero: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [ErrorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const [state, setState] = useContext(UserContext);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const switchForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  const handleClick = async () => {
    const response = await axios.post(
      isLoginForm
        ? "http://localhost:5000/auth/login"
        : "http://localhost:5000/auth/signup",
      {
        email,
        password,
      }
    );
    console.log(response.data);

    if (
      response.data &&
      response.data.errors &&
      response.data.errors.length > 0
    ) {
      const errorMessage = response.data.errors[0].msg;
      toast.error(errorMessage);
      setErrorMessage(errorMessage);
    } else {
      toast.success(isLoginForm ? "Login successful!" : "Sign up successful!");
    }

    setState({
      ...state,
      data: {
        id: response.data.data.user.id,
        email: response.data.data.user.email,
        customerStripeId: response.data.data.user.customerStripeId,
      },
      loading: false,
      error: null,
    });

    localStorage.setItem("token", response.data.data.token);
    axios.defaults.headers.common["authorization"] =
      "Bearer ${response.data.data.token}";
    navigate("/subscription");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleClick();
  };

  return (
    <div className="hero">
      <img src={heroImage} alt="image" className="hero-img" />
      <div className={`hero-content ${isPopupOpen ? "blur" : ""}`}>
        <div className="content">
          <h2 className="disk">
            Empowering Learning Through Collaborative Exchange
            <span className="disk-span">
              Unlocking Learning Potential through Collaborative Knowledge
              Exchange.
            </span>
          </h2>
          <button className="hero-button" onClick={togglePopup}>
            Login
          </button>
          <button
            className="hero-button"
            onClick={() => {
              togglePopup();
              setIsLoginForm(false);
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-inner">
            <div className="popup-first">
              <h3 className="popup-heading">Enter your details:</h3>
              <button className="popup-close" onClick={togglePopup}>
                X
              </button>
            </div>
            <form
              onSubmit={handleSubmit}
              action={isLoginForm ? "/login" : "/signup"}
              method="POST"
            >
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="popup-input"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password: 5 Chars"
                  className="popup-input"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              {ErrorMessage && (
                <div className="error-message">{ErrorMessage}</div>
              )}
              <div className="popup-action">
                <button type="submit" className="popup-action-button">
                  {isLoginForm ? "Login" : "Sign Up"}
                </button>
                <button
                  type="button"
                  className="popup-action-button"
                  onClick={switchForm}
                >
                  {isLoginForm ? "Switch to Sign Up" : "Switch to Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Hero;
