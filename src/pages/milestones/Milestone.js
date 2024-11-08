import React from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Milestone = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    updated_at,
    title,
    content,
    milestone_date,
    image,
    like_id, 
    likes_count, 
    comments_count,
    milestonePage,
    setMilestones,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  // Format the milestone_date to "05 Nov 2024" format
  const formattedDate = milestone_date
    ? new Date(milestone_date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  const handleEdit = () => {
    history.push(`/milestones/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/milestones/${id}/`);
      history.goBack();
    } catch (err) {
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { milestone: id });
      setMilestones((prevMilestones) => ({
        ...prevMilestones,
        results: prevMilestones.results.map((milestone) => {
          return milestone.id === id
            ? { ...milestone, likes_count: milestone.likes_count + 1, like_id: data.id }
            : milestone;
        }),
      }));
    } catch (err) {
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setMilestones((prevMilestones) => ({
        ...prevMilestones,
        results: prevMilestones.results.map((milestone) => {
          return milestone.id === id
            ? { ...milestone, likes_count: milestone.likes_count - 1, like_id: null }
            : milestone;
        }),
      }));
    } catch (err) {
    }
  };

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && milestonePage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/milestones/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body className="d-flex justify-content-center align-items-center flex-column">
        <div className="text-left">
          {title && <Card.Text><strong>Milestone:</strong> {title}</Card.Text>}<hr></hr>
          {milestone_date && <Card.Text><strong>Milestone Date:</strong> {formattedDate}</Card.Text>}<hr></hr>
          {content && <Card.Text><strong>Description:</strong> {content}</Card.Text>}<hr></hr>
        </div>
        <div className={`mt-3 ${styles.PostBar}`}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own milestone!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like milestones!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {likes_count}
          <Link to={`/milestones/${id}`}>
            <i className="fa-regular fa-comment ms-5"></i>
          </Link>
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Milestone;
