import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink, useHistory } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";
import { Link } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory(); // useHistory hook for navigation

  // Variables to toggle open and closed mobile navbar burger menu
  const [toggleNavBar, setToggleNavBar] = useState(false);

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
      history.push("/signin"); // Redirect to the sign-in page after sign-out
    } catch (err) {
      // console.log(err);
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
          <i className="far fa-plus-square"></i>Add post
        </NavLink>
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to="/milestones/create"
        >
          <i className="far fa-plus-square"></i>Add milestone
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
          <i className="fas fa-stream"></i> Home
          </span>
          }
      >
        <NavDropdown.Item
          id={styles.dropdownItem}
          as={Link}
          className={styles.NavLink}
          to="/"
          onClick={() => {
            setToggleNavBar(!toggleNavBar);
          }}
        >
          <i className={`fa-solid fa-bullhorn ${styles.Icon}`}></i> Posts
        </NavDropdown.Item>
        <NavDropdown.Item
          id={styles.dropdownItem}
          as={Link}
          className={styles.NavLink}
          to="/milestones"
          onClick={() => {
            setToggleNavBar(!toggleNavBar);
          }}
        >
          <i className={`fa-regular fa-calendar-days ${styles.Icon}`}></i> Milestones
        </NavDropdown.Item>
      </NavDropdown>

      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/liked"
      >
        <i className="fas fa-heart"></i>Liked
      </NavLink>
      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt"></i>Sign out
      </NavLink>
      <NavLink
        className={styles.NavLink}
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
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        {currentUser && addIcons}
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
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
