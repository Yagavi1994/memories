import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { axiosRes } from "../../api/axiosDefaults";
import { removeTokenTimestamp } from "../../utils/utils";
import { useCurrentUser, useSetCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/Form.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

const DeleteProfilePage = () => {
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  // Redirect if the current user is not the owner of the profile
  useEffect(() => {
    if (currentUser?.profile_id?.toString() !== id) {
      history.push("/home");
    }
  }, [currentUser, history, id]);

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/profiles/${id}/`); // API call to delete the profile
      setCurrentUser(null); // Log out the user after deleting their profile
      removeTokenTimestamp();
      history.push("/signup"); // Redirect to the signup page
    } catch (err) {
      setErrors(err.response?.data || { detail: "An error occurred while deleting the profile." });
    }
  };

  return (
    <Row>
      <Col className="py-2 mx-auto text-center" md={6}>
        <Container className={appStyles.Content}>
          <h5 className="my-2 mt-3">Delete Profile</h5>
          <hr />
          <p>
            Are you sure, you want to <span className={styles.Bold}>delete your profile?</span> This action is
            irreversible, and all your data will be permanently removed.
          </p>
          {errors?.detail && (
            <Alert variant="danger" className="mt-3">
              {errors.detail}
            </Alert>
          )}
          <div className={`${btnStyles.Form} mb-3 mt-4`}>
            <Button
              className={`${btnStyles.White} mx-2`}
              onClick={() => history.goBack()}
            >
              No, Cancel
            </Button>
            <Button
              className={`${btnStyles.Gold} mt-md-3 mt-lg-0 mx-2`}
              onClick={handleDelete}
            >
              Yes, Delete
            </Button>
          </div>
        </Container>
      </Col>
    </Row>
  );
};

export default DeleteProfilePage;
