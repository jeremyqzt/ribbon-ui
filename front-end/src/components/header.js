import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import logo from "../assets/logo.png";
import { signOut, checkCookie } from "../utils/index";

import { FiLogOut } from "react-icons/fi";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar>
        <Navbar.Brand href="/main" className={"receipt_header_brand"}>
          <img className={"receipt_header_logo"} src={logo} alt="logo" />
          Ribbon Receipts
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link disabled={props.activeId === 0} href="/main">
            {props.activeId === 0 ? <b>Home</b> : <div>Home</div>}
          </Nav.Link>
          <Nav.Link disabled={props.activeId === 1} href="/buckets">
            {props.activeId === 1 ? <b>Buckets</b> : <div>Buckets</div>}
          </Nav.Link>
          <Nav.Link disabled={props.activeId === 2} href="/upload">
            {props.activeId === 2 ? <b>Upload</b> : <div>Upload</div>}
          </Nav.Link>
          <Nav.Link disabled={props.activeId === 3} href="/settings">
            {props.activeId === 3 ? <b>Settings</b> : <div>Settings</div>}
          </Nav.Link>

          <NavDropdown title="Analytics" id="navbarScrollingDropdown">
            <NavDropdown.Item href="/analytics" disabled={props.activeId === 4}>
              {props.activeId === 4 ? (
                <b>{'Monthly & Aggregate Charts'}</b>
              ) : (
                <div>{'Monthly & Aggregate Charts'}</div>
              )}
            </NavDropdown.Item>
            <NavDropdown.Item
              href="/monthylTotals"
              disabled={props.activeId === 5}
            >
              {props.activeId === 5 ? (
                <b>Monthly Category Totals</b>
              ) : (
                <div>Monthly Category Totals</div>
              )}
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Navbar.Text>
          Signed in as: <a href="/">{checkCookie("username")}</a>
        </Navbar.Text>
        <Button
          variant="danger"
          className="ml-4"
          onClick={() => {
            signOut();
            navigate("/");
          }}
        >
          {"Logout "}
          <IconContext.Provider value={{ color: "white" }}>
            <FiLogOut />
          </IconContext.Provider>
        </Button>
      </Navbar>
    </>
  );
};

export default Header;
