import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Milestone from "./Milestone";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import styles from "../../styles/PostsMilestonesPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function MilestonesPage({ message, filter = "" }) {
  const [milestones, setMilestones] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const { data } = await axiosReq.get(`/milestones/?${filter}search=${query}`);
        setMilestones(data);
        setHasLoaded(true);
      } catch (err) {
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchMilestones();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search milestones..."
          />
        </Form>

        {hasLoaded ? (
          <>
            {milestones.results.length ? (
              <InfiniteScroll
                children={milestones.results.map((milestone) => (
                  <Milestone key={milestone.id} {...milestone} setMilestones={setMilestones} />
                ))}
                dataLength={milestones.results.length}
                loader={<Asset spinner />}
                hasMore={!!milestones.next}
                next={() => fetchMoreData(milestones, setMilestones)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default MilestonesPage;