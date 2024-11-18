import React, { useState } from "react";
import { Container, Form, InputGroup } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const PopularProfiles = ({ mobile }) => {
  const { popularProfiles } = useProfileData();
  const currentUser = useCurrentUser();
  const [searchTerm, setSearchTerm] = useState("");

  // Safeguard for undefined profiles or currentUser
  const filteredProfiles = (popularProfiles.results || [])
    .filter((profile) => profile.owner !== currentUser?.username) // Exclude current user
    .filter((profile) =>
      profile.owner.toLowerCase().includes(searchTerm.toLowerCase()) // Match search term
    );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container
      className={`${appStyles.Content} ${appStyles.PopularProfiles} ${
        mobile ? "d-lg-none text-center mb-3" : ""
      }`}
    >
      {/* Search Bar */}
      <InputGroup className="mb-3 mt-1">
        <Form.Control
          placeholder="Search profiles..."
          aria-label="Search profiles"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </InputGroup>

      {popularProfiles.results && popularProfiles.results.length ? (
        <>
          <p className="mt-3 mb-0">
            Most followed profiles
            <hr />
          </p>
          {mobile ? (
            <div className="d-flex justify-content-around">
              {filteredProfiles.slice(0, 3).map((profile) => (
                <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            filteredProfiles.map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularProfiles;
