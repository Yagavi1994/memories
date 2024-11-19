import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import styles from "../../styles/Form.module.css";
import { useHistory, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

const UserPrivacyForm = () => {
  const [privacy, setPrivacy] = useState("private"); // Default privacy setting
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const { id } = useParams();

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  useEffect(() => {
    console.log("Current User (Privacy):", currentUser?.is_private);
    if (currentUser?.profile_id?.toString() === id) {
      setPrivacy(currentUser.is_private ? "private" : "public");
    } else {
      history.push("/posts");
    }
  }, [currentUser, history, id]);
  
  const handlePrivacyChange = (e) => {
    setPrivacy(e.target.value); // Update privacy state
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const is_private = privacy === "private";
      await axiosRes.put(`/profiles/${id}/`, { is_private });
      setCurrentUser((prevUser) => ({
        ...prevUser,
        is_private,
      }));
      history.goBack();
    } catch (err) {
      console.error("Error updating privacy:", err.response?.data); // Debug error
      setErrors(err.response?.data);
    }
  };

  return (
    <Row>
      <Col className="py-2 mx-auto text-center" md={6}>
        <Container className={appStyles.Content}>
          <Form onSubmit={handleSubmit} className="my-2 mt-3">
            <Form.Group>
              <Form.Label><h5>Change Privacy</h5></Form.Label><hr />
              <div className={styles.Form}>
                <Form.Check
                  type="radio"
                  id="private"
                  label="Private"
                  name="privacy"
                  value="private"
                  checked={privacy === "private"}
                  onChange={handlePrivacyChange}
                />
                <Form.Check
                  type="radio"
                  id="public"
                  label="Public"
                  name="privacy"
                  value="public"
                  checked={privacy === "public"}
                  onChange={handlePrivacyChange}
                />
              </div>
            </Form.Group>
            {errors?.is_private?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Button
              className={`${btnStyles.Button} ${btnStyles.Gold}`}
              type="submit"
            >
              Save
            </Button>
            <Button
              className={`${btnStyles.Button} ${btnStyles.White}`}
              onClick={() => history.goBack()}
            >
              Cancel
            </Button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default UserPrivacyForm;
