import React from "react";
import styles from "../../styles/PostMilestone.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { CustomDropdown } from "../../components/Dropdown";

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
    age_months,
    age_years,
    height,
    weight,
    milestone_category,
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
          <Link to={`/profiles/${profile_id}`} className={styles.Name}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span className="mr-2">{updated_at}</span>
            {is_owner && milestonePage && (
              <CustomDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <div className={styles.ImageContainer}>
        <Link to={`/milestones/${id}`}>
          <Card.Img src={image} alt={title} className={styles.Image} />
        </Link>
      </div>
      <Card.Body className={"text-left"}>
        <div>
          <table style={{ width: "100%" }}>
            <tbody>
              {title && (
                <tr>
                  <td>
                    <i className={`fa-solid fa-heart fa-2xs ${styles.HeartBullets}`}></i>
                  </td>
                  <td className={styles.Font}><strong>Milestone</strong></td>
                  <td>: {title}</td>
                </tr>
              )}
              {milestone_date && (
                <tr>
                  <td>
                    <i className={`fa-solid fa-heart fa-2xs ${styles.HeartBullets}`}></i>
                  </td>
                  <td className={styles.Font}><strong>Date</strong></td>
                  <td>: {formattedDate}</td>
                </tr>
              )}
              {(age_years || age_months) && (
                <tr>
                  <td>
                    <i className={`fa-solid fa-heart fa-2xs ${styles.HeartBullets}`}></i>
                  </td>
                  <td className={styles.Font}><strong>Age</strong></td>
                  <td>
                    : {age_years && `${age_years} Year${age_years > 1 ? "s" : ""}`}
                    {age_months && ` ${age_months} Month${age_months > 1 ? "s" : ""}`}
                  </td>
                </tr>
              )}
              {height && (
                <tr>
                  <td>
                    <i className={`fa-solid fa-heart fa-2xs ${styles.HeartBullets}`}></i>
                  </td>
                  <td className={styles.Font}><strong>Height</strong></td>
                  <td>: {height} cm</td>
                </tr>
              )}
              {weight && (
                <tr>
                  <td>
                    <i className={`fa-solid fa-heart fa-2xs ${styles.HeartBullets}`}></i>
                  </td>
                  <td className={styles.Font}><strong>Weight</strong></td>
                  <td>: {weight} kg</td>
                </tr>
              )}
              {milestone_category && (
                <tr>
                  <td>
                    <i className={`fa-solid fa-heart fa-2xs ${styles.HeartBullets}`}></i>
                  </td>
                  <td className={styles.Font}><strong>Category</strong></td>
                  <td>
                    : {milestone_category.charAt(0).toUpperCase() +
                      milestone_category.slice(1)}
                  </td>
                </tr>
              )}
              {content && (
                <tr>
                  <td>
                    <i className={`fa-solid fa-heart fa-2xs ${styles.HeartBullets}`}></i>
                  </td>
                  <td className={styles.Font}><strong>Description</strong></td>
                  <td style={{ textAlign: "justify" }}>: {content}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className={"mt-3 text-center"}>
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
            <i className={`far fa-comments ${styles.Comments}`} />
          </Link>
          {comments_count}
        </div>
      </Card.Body>
    </Card >
  );
};

export default Milestone;
