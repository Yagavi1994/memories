import React from "react";
import styles from "../../styles/Profile.module.css";

import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

import FollowButton from "../../components/FollowButton";

const Profile = (props) => {
  const { profile, mobile, imageSize = 55 } = props;
  const { id, image, owner } = profile;

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
        <FollowButton profile={profile} />
      </div>
    </div>
  );
};

export default Profile;
