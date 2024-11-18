import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/Dropdown.module.css";
import { useHistory } from "react-router";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fas fa-ellipsis-v"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

export const CustomDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className="ml-auto" drop="left">
      <Dropdown.Toggle as={ThreeDots} />

      <Dropdown.Menu
        className="text-left"
        popperConfig={{ strategy: "fixed" }}
      >
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleEdit}
          aria-label="edit"
        >
          <i className={`fas fa-edit ${styles.Icon}`} /> Edit
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleDelete}
          aria-label="delete"
        >
          <i className={`fa-solid fa-trash ${styles.Icon}`} /> Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const ProfileEditDropdown = ({ id }) => {
  const history = useHistory();
  return (
    <Dropdown className={`mr-3 px-3 ${styles.Absolute}`} drop="left">
      <Dropdown.Toggle as={ThreeDots} />
      <Dropdown.Menu>
        <Dropdown.Item className={styles.DropdownItem}
          onClick={() => history.push(`/profiles/${id}/edit`)}
          aria-label="edit-profile"
        >
          <i className={`fas fa-edit ${styles.Icon}`} /> Edit Profile
        </Dropdown.Item>
        <Dropdown.Item className={styles.DropdownItem}
          onClick={() => history.push(`/profiles/${id}/edit/username`)}
          aria-label="edit-username"
        >
          <i className={`far fa-id-card ${styles.Icon}`} />
          Change Username
        </Dropdown.Item>
        <Dropdown.Item className={styles.DropdownItem}
          onClick={() => history.push(`/profiles/${id}/edit/password`)}
          aria-label="edit-password"
        >
          <i className={`fas fa-key ${styles.Icon}`} />
          Change Password
        </Dropdown.Item>
        <Dropdown.Item className={styles.DropdownItem}
          onClick={() => history.push(`/profiles/${id}/edit/privacy`)}
          aria-label="edit-privacy"
        >
          <i className={`fa-solid fa-user-lock ${styles.Icon}`} />
          Change Privacy
        </Dropdown.Item>
        <Dropdown.Item className={styles.DropdownItem}
          onClick={() => {
          console.log("Navigating to delete profile with ID:", id);
          history.push(`/profiles/${id}/edit/deleteprofile`)}}
          aria-label="delete-profile"
        >
          <i className={`fa-solid fa-trash ${styles.Icon}`} />
          Delete Profile
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};