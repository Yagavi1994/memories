import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();
  const { expanded, setExpanded, ref } = useClickOutsideToggle();
  const location = useLocation();

  // State for follow requests count
  const [followRequestCount, setFollowRequestCount] = useState(0);

  // Fetch the count of follow requests
  useEffect(() => {
    const fetchFollowRequestCount = async () => {
      try {
        const { data } = await axios.get("/follow-requests/count/");
        setFollowRequestCount(data.count);
      } catch (err) {
        console.error("Failed to fetch follow request count", err);
      }
    };

    if (currentUser) {
      fetchFollowRequestCount();
    }
  }, [currentUser]);

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
      history.push("/");
    } catch (err) {
      console.error("Sign out failed", err);
    }
  };

  const navItemSelect = () => {
    setExpanded(false);
  }

  // Determine active state for dropdowns
  const isFeedActive = ["/posts", "/milestones"].includes(location.pathname);
  const isLikedActive = ["/liked/posts", "/liked/milestones"].includes(location.pathname);

  // Icons for creating posts or milestones
  const addIcons = currentUser && (
    <div>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/posts/create"
      >
        <i className={`far fa-plus-square ${styles.PlusIcon}`}></i> Post
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/milestones/create"
      >
        <i className={`far fa-plus-square ${styles.PlusIcon}`}></i> Milestone
      </NavLink>
    </div>
  );

  // Logged-in navigation items
  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/home"
        onClick={navItemSelect}
      >
        <i className="fa-solid fa-house"></i>
        <span className="d-md-none d-xl-inline">Home</span>
      </NavLink>
      <NavDropdown
        id={styles.dropdownMenu}
        title={
          <span
            className={`${styles.dropdownText} d-sm-inline-column ${isFeedActive ? styles.Active : ""
              }`}
          >
            <i className="fa-solid fa-bars-staggered"></i>{" "}
            <span className="d-md-none d-xl-inline">Feed</span>
          </span>
        }
      >
        <NavDropdown.Item
          id={styles.dropdownItem}
          as={NavLink}
          to="/posts"
          onClick={navItemSelect}
        >
          <i className={`fa-solid fa-bullhorn ${styles.Icon}`}></i> Posts
        </NavDropdown.Item>
        <NavDropdown.Item
          id={styles.dropdownItem}
          as={NavLink}
          to="/milestones"
          onClick={navItemSelect}
        >
          <i className={`fa-regular fa-calendar-days ${styles.Icon}`}></i> Milestones
        </NavDropdown.Item>
      </NavDropdown>

      <NavDropdown
        id={styles.dropdownMenu}
        title={
          <span
            className={`${styles.dropdownText} d-sm-inline-column ${isLikedActive ? styles.Active : ""
              }`}
          >
            <i className="fas fa-heart"></i>{" "}
            <span className="d-md-none d-xl-inline">Liked</span>
          </span>
        }
      >
        <NavDropdown.Item
          id={styles.dropdownItem}
          as={NavLink}
          to="/liked/posts"
          onClick={navItemSelect}
        >
          <i className={`fa-solid fa-bullhorn ${styles.Icon}`}></i> Posts
        </NavDropdown.Item>
        <NavDropdown.Item
          id={styles.dropdownItem}
          as={NavLink}
          to="/liked/milestones"
          onClick={navItemSelect}
        >
          <i className={`fa-regular fa-calendar-days ${styles.Icon}`}></i> Milestones
        </NavDropdown.Item>
      </NavDropdown>

      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/followrequests"
        onClick={navItemSelect}
      >
        <i className={`fa-solid fa-user pr-0`}></i>
        {followRequestCount > 0 && (
          <sup className={` ${styles.NotificationBadge}`}>{followRequestCount}</sup>
        )}
        <span className="d-md-none d-xl-inline ml-2">Requests</span>
      </NavLink>

      <NavLink
        className={styles.NavLink}
        to="/"
        onClick={handleSignOut}
      >
        <i className="fas fa-sign-out-alt ml-md-1"></i>
        <span className="d-md-none d-xl-inline">Sign out</span>
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to={`/profiles/${currentUser?.profile_id}`}
        onClick={navItemSelect}
      >
        <Avatar src={currentUser?.profile_image} height={40} />
        <span className="d-md-none d-xl-inline">Profile</span>
      </NavLink>
    </>
  );

  // Logged-out navigation items
  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/"
        exact
        onClick={navItemSelect}
      >
        <i className="fas fa-sign-in-alt"></i> Sign in
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signup"
        onClick={navItemSelect}
      >
        <i className="fa-solid fa-user-plus"></i> Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar
      ref={ref}
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <Container>
        <NavLink to="/posts">
          <Navbar.Brand>
            <img src={logo} alt="logo" className={styles.Logo} />
          </Navbar.Brand>
        </NavLink>
        {addIcons}
        <Navbar.Toggle
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        >
          <span
            className="navbar-toggler-icon"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='%23FFFFFF' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E\")",
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
