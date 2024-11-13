import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink, useHistory, Link } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();
  
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
      history.push("/signin");
    } catch (err) {}
  };

  const handleDropdownSelect = () => {
    if (window.innerWidth >= 768) {
      setExpanded(false); // Only close dropdown in desktop view
    }
  };

  const addIcons = (
    <>
      <div>
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to="/posts/create"
        >
          <i className={`far fa-plus-square ${styles.PlusIcon}`}></i>Post
        </NavLink>
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to="/milestones/create"
        >
          <i className={`far fa-plus-square ${styles.PlusIcon}`}></i>Milestone
        </NavLink>
      </div>
    </>
  );

  const loggedInIcons = (
    <>
      <NavDropdown
        id={styles.dropdownMenu}
        title={
          <span className={`${styles.dropdownText} d-sm-inline-column`}>
          <i className="fa-solid fa-house"></i> Home
          </span>
        }
        onToggle={(isOpen) => setExpanded(isOpen)} // Control expanded state with onToggle
      >
        <NavDropdown.Item
          id={styles.dropdownItem}
          as={Link}
          to="/"
          onClick={handleDropdownSelect}
        >
          <i className={`fa-solid fa-bullhorn ${styles.Icon}`}></i> Posts
        </NavDropdown.Item>
        <NavDropdown.Item
          id={styles.dropdownItem}
          as={Link}
          to="/milestones"
          onClick={handleDropdownSelect}
        >
          <i className={`fa-regular fa-calendar-days ${styles.Icon}`}></i> Milestones
        </NavDropdown.Item>
      </NavDropdown>

      <NavDropdown
        id={styles.dropdownMenu}
        title={
          <span className={`${styles.dropdownText} d-sm-inline-column`}>
          <i className="fas fa-heart"></i> Liked
          </span>
        }
        onToggle={(isOpen) => setExpanded(isOpen)}
      >
        <NavDropdown.Item
          id={styles.dropdownItem}
          as={Link}
          to="/liked/posts"
          onClick={handleDropdownSelect}
        >
          <i className={`fa-solid fa-bullhorn ${styles.Icon}`}></i> Posts
        </NavDropdown.Item>
        <NavDropdown.Item
          id={styles.dropdownItem}
          as={Link}
          to="/liked/milestones"
          onClick={handleDropdownSelect}
        >
          <i className={`fa-regular fa-calendar-days ${styles.Icon}`}></i> Milestones
        </NavDropdown.Item>
      </NavDropdown>

      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt"></i>Sign out
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fas fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" className={styles.Logo} />
          </Navbar.Brand>
        </NavLink>
        {currentUser && addIcons}
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
          style={{
            borderColor: "#fff"
          }}
        >
          <span
          className="navbar-toggler-icon"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='%23FFFFFF' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E\")",
          }}
          />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
