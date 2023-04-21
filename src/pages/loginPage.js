import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import "../style/login.css";
import { signIn, signUp, isLoggedIn } from "../utils/index";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

export const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const isSignIn = props.isSignIn || false;
  const isAlreadyIn = isLoggedIn();

  useEffect(() => {
    if (isSignIn && isAlreadyIn) {
      navigate("/main");
    }
  }, [isAlreadyIn, isSignIn, navigate]);

  const signInNavToMain = async () => {
    signIn(email, pw1, navigate)
      .then(() => {
        setError(null);
      })
      .catch(() => {
        setError("Incorrect Login!");
      })
      .finally(() => setLoading(false));
  };

  const handleSubmit = () => {
    if (isSignIn) {
      if (pw1.length < 8) {
        setError("Password Too Short!");
        return;
      }
      setLoading(true);
      signInNavToMain();
    } else {
      if (pw1.length < 8) {
        setError("Password Too Short!");
        return;
      }
      if (pw1 !== pw2) {
        setError("Password Must Match!");
        return;
      }
      setLoading(true);
      signUp(email, pw1)
        .then((res) => {
          if (res.status === 201) {
            signInNavToMain();
          } else {
            setError("This User Already Exists!");
          }
        })
        .catch(() => {
          setError("Network Error, Please Try Again.");
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <div>
      <div className="d-flex fullScreen">
        <div className="white-background justify-content-center center text-center border border-light p-5 shadow additional-login">
          <img className={"login_logo"} src={logo} alt="logo" />
          <p className="h2 noSelect">Ribbon Receipts</p>
          <p className="mb-4 noSelect">{isSignIn ? "Sign In" : "Sign Up"}</p>
          <input
            type="email"
            id="email"
            className="form-control mb-4"
            placeholder="E-mail"
            value={email}
            onChange={(e) => {
              setError(null);
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            id="password"
            className="form-control mb-4"
            placeholder="Password"
            value={pw1}
            onChange={(e) => {
              setError(null);

              setPw1(e.target.value);
            }}
          />
          {!isSignIn && (
            <input
              type="password"
              id="passwordConfirm"
              className="form-control mb-4"
              placeholder="Confirm Password"
              value={pw2}
              onChange={(e) => {
                setError(null);

                setPw2(e.target.value);
              }}
            />
          )}
          <Button
            className="btn btn-danger btn-block my-4"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? (
              <Spinner animation="border" size="sm" variant="white" />
            ) : isSignIn ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </Button>
          {error ? <Alert variant={"danger"}>{error}</Alert> : null}
          {isSignIn ? (
            <p className="mt-4">
              {"Don't Have An Account?"}
              <br />
              <a href="/signup">{"Sign Up Here"}</a>
            </p>
          ) : (
            <p className="mt-4">
              {"Already Have An Account?"}
              <br />
              <a href="/">{"Sign In Here"}</a>
            </p>
          )}
          <p className="mt-4">
            {"Forgot your password?"}
            <br />
            <a href="/forgotPasswordForm">{"Submit a Recovery Here"}</a>
          </p>
        </div>
      </div>
    </div>
  );
};
