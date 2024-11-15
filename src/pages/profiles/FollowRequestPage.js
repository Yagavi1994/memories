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
        setFollowRequests(data);
      } catch (err) {
        setErrors("Failed to load follow requests.");
      }
    };

    fetchFollowRequests();
  }, []);

  const handleAccept = async (requestId) => {
    try {
      await axiosRes.post(`/follow-requests/${requestId}/accept/`);
      setFollowRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== requestId)
      );
    } catch (err) {
      setErrors("Failed to accept follow request.");
    }
  };

  const handleDecline = async (requestId) => {
    try {
      await axiosRes.delete(`/follow-requests/${requestId}/`);
      setFollowRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== requestId)
      );
    } catch (err) {
      setErrors("Failed to decline follow request.");
    }
  };

  return (
    <Container>
      <h2 className="text-center mt-4">Follow Requests</h2>
      {errors && <Alert variant="danger">{errors}</Alert>}
      {followRequests.length > 0 ? (
        <ListGroup>
          {followRequests.map((request) => (
            <ListGroup.Item key={request.id} className={styles.RequestItem}>
              <Row className="align-items-center">
                <Col xs={2} className="text-center">
                  <Avatar src={request.requester_profile_image} height={50} />
                </Col>
                <Col xs={6}>
                  <span>{request.requester_username}</span>
                </Col>
                <Col xs={2}>
                  <Button
                    variant="success"
                    onClick={() => handleAccept(request.id)}
                  >
                    Accept
                  </Button>
                </Col>
                <Col xs={2}>
                  <Button
                    variant="danger"
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
