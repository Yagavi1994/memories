import React from "react";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { Button } from "react-bootstrap";
import { useSetProfileData } from "../../contexts/ProfileDataContext";

const Profile = (props) => {
  const { profile, mobile, imageSize = 55 } = props;
  const { id, following_id, image, owner } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const { handleFollow, handleUnfollow } = useSetProfileData();

  return (
    <div
      className={`my-3 d-flex align-items-center ${
        mobile ? "flex-column" : "flex-row"
      }`}
    >
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak} text-center`}>
        <strong>{owner}</strong>
      </div>
      <div className={`text-center mt-2 ${!mobile && "ml-auto"}`}>
        {currentUser && !is_owner && (
          <Button
            className={`${btnStyles.Button} ${
              following_id ? btnStyles.BlackOutline : btnStyles.Black
            }`}
            onClick={() => (following_id ? handleUnfollow(profile) : handleFollow(profile))}
          >
            {following_id ? "Unfollow" : "Follow"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Profile;
