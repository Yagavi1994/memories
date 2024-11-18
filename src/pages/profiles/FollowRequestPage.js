import React, { useEffect, useState } from "react";
import { Alert, Button, Container, ListGroup, Row, Col } from "react-bootstrap";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import styles from "../../styles/FollowRequestsPage.module.css";
import btnStyles from "../../styles/Button.module.css";

const FollowRequestsPage = () => {
  const [followRequests, setFollowRequests] = useState([]);
  const [errors, setErrors] = useState("");

  // Fetch follow requests on component mount
  useEffect(() => {
    const fetchFollowRequests = async () => {
      try {
        const { data } = await axiosRes.get("/follow-requests/");
        console.log("Follow Requests Data:", data); // Debugging
        setFollowRequests(data.results || []); // Ensure results is defined
      } catch (err) {
        console.error("Error fetching follow requests:", err);
        setErrors("Failed to load follow requests.");
      }
    };

    fetchFollowRequests();
  }, []);

  // Handle accept request
  const handleAccept = async (requestId) => {
    try {
      await axiosRes.put(`/follow-requests/${requestId}/accept/`);
      // Remove the request from the list after accepting
      setFollowRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== requestId)
      );
    } catch (err) {
      console.error("Error accepting follow request:", err);
      setErrors("Failed to accept follow request.");
    }
  };

  // Handle decline request
  const handleDecline = async (requestId) => {
    try {
      await axiosRes.delete(`/follow-requests/${requestId}/decline/`);
      // Remove the request from the list after declining
      setFollowRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== requestId)
      );
    } catch (err) {
      console.error("Error declining follow request:", err);
      setErrors("Failed to decline follow request.");
    }
  };

  return (
    <Container>
      <h2 className="text-center text-white mt-4">Follow Requests</h2>
      <hr />
      {errors && <Alert variant="danger">{errors}</Alert>}
      {followRequests.length > 0 ? (
        <ListGroup>
          {followRequests.map((request) => (
            <ListGroup.Item
              key={request.id}
              className={`${styles.RequestItem} bg-dark text-light`}
            >
              <Row className="align-items-center">
                <Col xs={2} className="text-center">
                  <Avatar src={request.requester_profile_image} height={50} />
                </Col>
                <Col xs={10} md={7} className="pl-4 pl-md-0">
                  <span>{request.requester_username} has requested to follow you.</span>
                </Col>
                <Col md={3} className={`mt-3 mt-md-0 ${styles.ButtonGroup}`}>
                  <Button
                    variant="success"
                    className={btnStyles.Gold}
                    onClick={() => handleAccept(request.id)}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="danger"
                    className={btnStyles.White}
                    onClick={() => handleDecline(request.id)}
                  >
                    Decline
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p className="text-center text-white mt-4">No follow requests at the moment.</p>
      )}
    </Container>
  );
};

export default FollowRequestsPage;
