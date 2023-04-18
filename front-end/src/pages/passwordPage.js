import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import "../style/login.css";
import { signIn, forgotPassword } from "../utils/index";
import { useNavigate, useSearchParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

export const PasswordReset = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get("username");
  const token = searchParams.get("resetToken");

  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  useEffect(() => {
    if (!email || !token) {
      navigate("/");
    }
  }, [email, navigate, token]);
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
    if (pw1.length < 8) {
      setError("Password Too Short!");
      return;
    }
    if (pw1 !== pw2) {
      setError("Password Must Match!");
      return;
    }

    setLoading(true);
    forgotPassword(email, token, pw1)
      .then((res) => {
        if (res.status === 200) {
          signInNavToMain();
        } else {
          setError("Failed to reset password!");
        }
      })
      .catch(() => {
        setError("Network Error, Please Try Again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <div className="d-flex fullScreen">
        <div className="white-background justify-content-center center text-center border border-light p-5 shadow additional-login">
          <img className={"login_logo"} src={logo} alt="logo" />
          <p className="h2 noSelect">Ribbon Receipts</p>
          <p className="mb-4 noSelect">{"Password Reset"}</p>
          <input
            type="email"
            id="email"
            className="form-control mb-4"
            placeholder="E-mail"
            value={email}
            disabled={true}
          />
          <input
            type="password"
            id="password"
            className="form-control mb-4"
            placeholder="New Password"
            value={pw1}
            onChange={(e) => {
              setError(null);

              setPw1(e.target.value);
            }}
          />

          <input
            type="password"
            id="passwordConfirm"
            className="form-control mb-4"
            placeholder="Confirm New Password"
            value={pw2}
            onChange={(e) => {
              setError(null);

              setPw2(e.target.value);
            }}
          />

          <Button
            className="btn btn-danger btn-block my-4"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? (
              <Spinner animation="border" size="sm" variant="white" />
            ) : (
              "Reset Password"
            )}
          </Button>
          {error ? <Alert variant={"danger"}>{error}</Alert> : null}
          <p className="mt-4">
            {"Don't Have An Account?"}
            <br />
            <a href="/signup">{"Sign Up Here"}</a>
          </p>
          <p className="mt-4">
            {"Already Have An Account?"}
            <br />
            <a href="/">{"Sign In Here"}</a>
          </p>
        </div>
      </div>
    </div>
  );
};
