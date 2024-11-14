import React from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const PopularProfiles = ({ mobile }) => {
  const { popularProfiles } = useProfileData();
  const currentUser = useCurrentUser();

  // Filter out the current user's profile
  const filteredProfiles = popularProfiles.results.filter(
    (profile) => profile.owner !== currentUser?.username
  );

  return (
    <Container
      className={`${appStyles.Content} ${appStyles.PopularProfiles} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {filteredProfiles.length ? (
        <>
          <p className="mt-3 mb-0">Most followed profiles <hr/></p>
          {mobile ? (
            <div className={`d-flex justify-content-around`}>
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
