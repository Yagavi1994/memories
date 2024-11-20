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
        // Fetch followed users
        const { data: followedUsers } = await axiosReq.get("/followers/");
        console.log("Followed Users Response:", followedUsers);
  
        // Extract followed profile IDs
        const followedProfileIds = followedUsers.results.map((user) => user.followed);
        console.log("Followed Profile IDs:", followedProfileIds);
  
        // Fetch posts and milestones
        const [postData, milestoneData] = await Promise.all([
          axiosReq.get(`/posts/?search=${query}`),
          axiosReq.get(`/milestones/?search=${query}`),
        ]);
        console.log("Posts Response:", postData.data.results);
        console.log("Milestones Response:", milestoneData.data.results);
  
        // Filter posts and milestones by `profile_id`
        const filteredPosts = postData.data.results.filter((post) => {
          console.log("Post Profile ID:", post.profile_id);
          return followedProfileIds.includes(post.profile_id);
        });
  
        const filteredMilestones = milestoneData.data.results.filter((milestone) => {
          console.log("Milestone Profile ID:", milestone.profile_id);
          return followedProfileIds.includes(milestone.profile_id);
        });
  
        console.log("Filtered Posts:", filteredPosts);
        console.log("Filtered Milestones:", filteredMilestones);
  
        // Combine and sort feed
        const combinedFeed = [
          ...filteredPosts.map((post) => ({ ...post, type: "post" })),
          ...filteredMilestones.map((milestone) => ({ ...milestone, type: "milestone" })),
        ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  
        console.log("Combined Feed:", combinedFeed);
  
        setFeed({ results: combinedFeed });
      } catch (err) {
        console.error("Error fetching the feed:", err);
        setFeed({ results: [] });
      } finally {
        setHasLoaded(true);
      }
    };
  
    const timer = setTimeout(() => {
      setHasLoaded(false);
      fetchFeed();
    }, 500);
  
    return () => clearTimeout(timer);
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
                hasMore={false} // Adjust if you add pagination
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
