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
import { axiosRes, axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";

const HomePage = ({ message }) => {
  const [feed, setFeed] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        // Fetch followed users
        const { data: followedUsers } = await axiosReq.get("/followers/");
        console.log("Followed Users:", followedUsers);

        const followedUserIds = followedUsers.results.map((user) => user.followed) || [];
        console.log("Followed User IDs:", followedUserIds);
        const followedNames = followedUsers?.results?.map((user) => user.followed_name) || [];
        
        console.log("Followed User IDs:", followedUserIds);
        console.log("Followed Usernames:", followedNames);

        // Fetch posts and milestones
        const [postData, milestoneData] = await Promise.all([
          axiosReq.get(`/posts/?search=${query}`),
          axiosReq.get(`/milestones/?search=${query}`),
        ]);

        console.log("Posts Data:", postData.data.results);
        console.log("Milestones Data:", milestoneData.data.results);

        // Filter posts and milestones
        const filteredPosts = postData?.data?.results?.filter((post) =>
          followedUserIds.includes(post.owner) || followedNames.includes(post.owner)
        ) || [];
        const filteredMilestones = milestoneData?.data?.results?.filter((milestone) =>
          followedUserIds.includes(milestone.owner) || followedNames.includes(milestone.owner)
        ) || [];

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
      } finally {
        setHasLoaded(true);
      }
    };

    // Fetch data with a debounce-like effect
    const timer = setTimeout(() => {
      setHasLoaded(false);
      fetchFeed();
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleLike = async (id, type) => {
    try {
      const { data } = await axiosRes.post("/likes/", { [type]: id });

      // Optimistically update the feed
      setFeed((prevState) => ({
        ...prevState,
        results: prevState.results.map((item) =>
          item.id === id
            ? { ...item, likes_count: item.likes_count + 1, like_id: data.id }
            : item
        ),
      }));
    } catch (err) {
      console.error("Error liking the item:", err);
    }
  };

  const handleUnlike = async (id, like_id, type) => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);

      // Optimistically update the feed
      setFeed((prevState) => ({
        ...prevState,
        results: prevState.results.map((item) =>
          item.id === id
            ? { ...item, likes_count: item.likes_count - 1, like_id: null }
            : item
        ),
      }));
    } catch (err) {
      console.error("Error unliking the item:", err);
    }
  };

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
            placeholder="Search posts and milestones..."
          />
        </Form>

        {hasLoaded ? (
          feed.results.length ? (
            <InfiniteScroll
              dataLength={feed.results.length}
              next={() => fetchMoreData(feed, setFeed)}
              hasMore={!!feed.next}
              loader={<Asset spinner />}
            >
              {feed.results.map((item) =>
                item.type === "post" ? (
                  <Post
                    key={item.id}
                    {...item}
                    setPosts={setFeed}
                    handleLike={() => handleLike(item.id, "post")}
                    handleUnlike={() => handleUnlike(item.id, item.like_id, "post")}
                  />
                ) : (
                  <Milestone
                    key={item.id}
                    {...item}
                    setMilestones={setFeed}
                    handleLike={() => handleLike(item.id, "milestone")}
                    handleUnlike={() => handleUnlike(item.id, item.like_id, "milestone")}
                  />
                )
              )}
            </InfiniteScroll>
          ) : (
            <Container className={appStyles.Content}>
              <Asset src={NoResults} message={message || "No posts or milestones found."} />
            </Container>
          )
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
};

export default HomePage;


