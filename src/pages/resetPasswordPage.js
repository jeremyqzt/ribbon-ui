import logo from "../assets/logo.png";
import { useState } from "react";
import "../style/login.css";
import { requestReset } from "../utils/index";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

export const PasswordResetStart = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setSuccess(false);
    setError(false);
    requestReset(email)
      .then((res) => {
        if (res.status === 200) {
          setSuccess(true);
        } else {
          setError("Request to reset password failed!");
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
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
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
          {success ? (
            <Alert variant={"success"}>
              If the email is valid, you will receive a link to reset your
              password.
            </Alert>
          ) : !loading ? (
            <p>This will send a reset link to the above email, if it valid.</p>
          ) : null}
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
