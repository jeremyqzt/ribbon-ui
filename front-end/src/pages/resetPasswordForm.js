import logo from "../assets/logo.png";
import { useState } from "react";
import "../style/login.css";
import { resetForm } from "../utils/index";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

export const PasswordResetStartForm = () => {
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setSuccess(false);
    setError(false);
    resetForm(email, description)
      .then((res) => {
        if (res.status === 200 || res.status === 202) {
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
            placeholder="Login E-mail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          <textarea
            rows="3"
            className="form-control mb-4"
            placeholder="Tell us about your account. You'll receive a password reset link if we can verify the ownership."
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
          />
          <Button
            className="btn btn-danger btn-block my-4"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? (
              <Spinner animation="border" size="sm" variant="white" />
            ) : (
              "Request Password Reset"
            )}
          </Button>
          {success ? <Alert variant={"success"}>Form Submitted!</Alert> : null}
          {error ? <Alert variant={"danger"}>{error}</Alert> : null}
          <p className="mt-4">
            {"Already Have An Account?"}
            <br />
            <a href="/">{"Sign In Here"}</a>
          </p>
          <p className="mt-4">
            {"Don't Have An Account?"}
            <br />
            <a href="/signup">{"Sign Up Here"}</a>
          </p>
        </div>
      </div>
    </div>
  );
};
