import React from "react";
import { Button } from "react-bootstrap";
import { useSetProfileData } from "../contexts/ProfileDataContext";
import btnStyles from "../styles/Button.module.css";

const FollowButton = ({ profile }) => {
  const { handleFollow, handleUnfollow, getFollowButtonState } =
    useSetProfileData();
  const followState = getFollowButtonState(profile);

  const handleClick = () => {
    if (followState === "follow") {
      handleFollow(profile);
    } else if (followState === "unfollow") {
      handleUnfollow(profile);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={followState === "request_sent"} // Disable if request is already sent
      variant={
        followState === "unfollow"
          ? btnStyles.Gold
          : followState === "request_sent"
          ? btnStyles.Disabled
          : btnStyles.White
      }
      className={`${btnStyles.Button} ${
        followState === "unfollow"
          ? btnStyles.Gold
          : followState === "request_sent"
          ? btnStyles.Disabled
          : btnStyles.White
      }`}
    >
      {followState === "unfollow"
        ? "Unfollow"
        : followState === "request_sent"
        ? "Request Sent"
        : "Follow"}
    </Button>
  );
};

export default FollowButton;
