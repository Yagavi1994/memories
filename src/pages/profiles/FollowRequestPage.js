import React, { useEffect, useState } from "react";
import { Alert, Button, Container, ListGroup, Row, Col } from "react-bootstrap";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import styles from "../../styles/FollowRequestsPage.module.css";

const FollowRequestsPage = () => {
  const [followRequests, setFollowRequests] = useState([]);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    const fetchFollowRequests = async () => {
      try {
        const { data } = await axiosRes.get("/follow-requests/");
        console.log("Follow Requests Data:", data); // Debugging
        setFollowRequests(data.results);
      } catch (err) {
        setErrors("Failed to load follow requests.");
      }
    };

    fetchFollowRequests();
  }, []);

  const handleAccept = async (requestId) => {
    try {
      // Use `put` for the accept action if the backend expects it
      await axiosRes.put(`/follow-requests/${requestId}/accept/`);
      setFollowRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== requestId)
      );
    } catch (err) {
      setErrors("Failed to accept follow request.");
    }
  };
  
  const handleDecline = async (requestId) => {
    try {
      // Use `delete` for the decline action as specified in the endpoint
      await axiosRes.delete(`/follow-requests/${requestId}/decline/`);
      setFollowRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== requestId)
      );
    } catch (err) {
      setErrors("Failed to decline follow request.");
    }
  };
  
  return (
    <Container>
      <h2 className="text-center text-white mt-4">Follow Requests</h2><hr />
      {errors && <Alert variant="danger">{errors}</Alert>}
      {followRequests.length > 0 ? (
        <ListGroup>
          {followRequests.map((request) => (
            <ListGroup.Item key={request.id} className={styles.RequestItem}>
              <Row className={`align-items-center`}>
                <Col xs={2} className="text-center">
                  <Avatar src={request.requester_profile_image} height={50} />
                </Col>
                <Col xs={6}>
                  <span className="text-white">{request.requester_username} has requested to follow you.</span>
                </Col>
                <Col xs={4} className={`${styles.ButtonGroup}`}>
                  <Button
                    className={`${styles.Accept}`}
                    onClick={() => handleAccept(request.id)}
                  >
                    Accept
                  </Button>
                  <Button
                    className={`${styles.Decline}`}
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
        <p className="text-center">No follow requests at the moment.</p>
      )}
    </Container>
  );
};

export default FollowRequestsPage;
