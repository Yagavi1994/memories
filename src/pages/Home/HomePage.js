import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Post from "../posts/Post";
import Milestone from "../milestones/Milestone";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsMilestonesPage.module.css";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";

function HomePage({ message }) {
  const [feed, setFeed] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        // Fetch followed users with their permissions
        const { data: followedUsers } = await axiosReq.get("/profiles/?can_view_posts=true&can_view_milestones=true");
        const followedUserIds = followedUsers.results.map((user) => user.owner);

        // Fetch posts and milestones
        const [postData, milestoneData] = await Promise.all([
          axiosReq.get(`/posts/?search=${query}`),
          axiosReq.get(`/milestones/?search=${query}`),
        ]);

        // Filter posts and milestones by followed users
        const filteredPosts = postData.data.results.filter((post) =>
          followedUserIds.includes(post.owner)
        );
        const filteredMilestones = milestoneData.data.results.filter((milestone) =>
          followedUserIds.includes(milestone.owner)
        );

        // Combine and sort feed
        const combinedFeed = [
          ...filteredPosts.map((post) => ({ ...post, type: "post" })),
          ...filteredMilestones.map((milestone) => ({ ...milestone, type: "milestone" })),
        ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setFeed({ results: combinedFeed });
      } catch (err) {
        console.error("Error fetching the feed:", err);
      } finally {
        setHasLoaded(true); // Ensure loading stops
      }
    };

    // Debounce timer
    const timer = setTimeout(() => {
      setHasLoaded(false); // Reset loading state before fetching
      fetchFeed();
    }, 500); // Delay API call by 500ms

    return () => clearTimeout(timer); // Clear timer on dependency change
  }, [query]);

  return (
    <Row className="h-100">
      {/* Left Side (Main Feed) */}
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
            placeholder="Search posts and milestones..."
          />
        </Form>

        {hasLoaded ? (
          <>
            {feed.results.length ? (
              <InfiniteScroll
                children={feed.results.map((item) =>
                  item.type === "post" ? (
                    <Post key={item.id} {...item} setFeed={setFeed} />
                  ) : (
                    <Milestone key={item.id} {...item} setFeed={setFeed} />
                  )
                )}
                dataLength={feed.results.length}
                loader={<Asset spinner />}
                hasMore={!!feed.next}
                next={() => fetchMoreData(feed, setFeed)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message || "No posts or milestones found."} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>

      {/* Right Side (Popular Profiles) */}
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default HomePage;