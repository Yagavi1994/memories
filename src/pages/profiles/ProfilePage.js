import React, { useEffect, useState } from "react";
import { Col, Row, Container, Tab, Tabs, Image } from "react-bootstrap";
import { useParams } from "react-router";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../posts/Post";
import Milestone from "../milestones/Milestone";
import { fetchMoreData } from "../../utils/utils";
import Asset from "../../components/Asset";
import PopularProfiles from "./PopularProfiles";
import NoResults from "../../assets/no-results.png";
import { ProfileEditDropdown } from "../../components/Dropdown";
import FollowButton from "../../components/FollowButton"; // Import FollowButton
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profilePosts, setProfilePosts] = useState({ results: [] });
  const [profileMilestones, setProfileMilestones] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const { setProfileData } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results || [];
  const isOwner = currentUser?.username === profile?.owner;
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "posts"
  );

  // Update local storage whenever the active tab changes
  const handleTabSelect = (key) => {
    setActiveTab(key);
    localStorage.setItem("activeTab", key);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          { data: fetchedProfile },
          { data: fetchedPosts },
          { data: fetchedMilestones },
        ] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(`/posts/?owner__profile=${id}`),
          axiosReq.get(`/milestones/?owner__profile=${id}`),
        ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [fetchedProfile] },
        }));
        setProfilePosts(fetchedPosts);
        setProfileMilestones(fetchedMilestones);
        setHasLoaded(true);
      } catch (err) {
      }
    };

    fetchData();
  }, [id, setProfileData]);

  const mainProfile = profile && (
    <>
      {isOwner && <ProfileEditDropdown id={profile.id} />}
      <Row noGutters className="px-3 text-left">
        <Col lg={3} className="text-lg-left text-center">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile.image}
          />
        </Col>
        <Col lg={7}>
          <h3 className="m-2 text-center">{profile.owner}</h3>
          <Row
            className={`justify-content-center no-gutters text-center ${styles.Font}`}
          >
            <Col xs={2} className="my-2 mr-2 mr-md-0">
              <div className={styles.Count}>{profile.posts_count}</div>
              <div>posts</div>
            </Col>
            <Col xs={4} className="my-2 mr-2 mr-md-0">
              <div className={styles.Count}>{profile.milestones_count}</div>
              <div>milestones</div>
            </Col>
            <Col xs={3} className="my-2 mr-2 mr-md-0">
              <div className={styles.Count}>{profile.followers_count}</div>
              <div>followers</div>
            </Col>
            <Col xs={3} className="my-2 mr-2 mr-md-0">
              <div className={styles.Count}>{profile.following_count}</div>
              <div>following</div>
            </Col>
          </Row>
        </Col>
        <Col lg={2} className="text-lg-right text-center mt-3">
          {currentUser && !isOwner && (
            <FollowButton profile={profile} />
          )}
        </Col>
        {profile.content && <Col className="p-3">{profile.content}</Col>}
      </Row>
    </>
  );

  const mainProfilePosts = profile?.can_view_posts ? (
    <>
      <h5 className="text-center mt-4">{profile?.owner}'s posts</h5>
      <hr />
      {profilePosts.results.length ? (
        <InfiniteScroll
          children={profilePosts.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setProfilePosts} />
          ))}
          dataLength={profilePosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`${profile?.owner} hasn't posted yet.`}
        />
      )}
    </>
  ) : null;

  const mainProfileMilestones = profile?.can_view_milestones ? (
    <>
      <h5 className="text-center mt-4">{profile?.owner}'s milestones</h5>
      <hr />
      {profileMilestones.results.length ? (
        <InfiniteScroll
          children={profileMilestones.results.map((milestone) => (
            <Milestone
              key={milestone.id}
              {...milestone}
              setMilestones={setProfileMilestones}
            />
          ))}
          dataLength={profileMilestones.results.length}
          loader={<Asset spinner />}
          hasMore={!!profileMilestones.next}
          next={() => fetchMoreData(profileMilestones, setProfileMilestones)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`${profile?.owner} hasn't added any milestones yet.`}
        />
      )}
    </>
  ) : null;

  const profileTabs = (
    <Tabs
      activeKey={activeTab}
      onSelect={handleTabSelect}
      id="profile-tab"
      className={`mt-3 ${styles.CustomTab}`}
    >
      {profile?.can_view_posts && (
        <Tab eventKey="posts" title="Posts">
          {mainProfilePosts}
        </Tab>
      )}
      {profile?.can_view_milestones && (
        <Tab eventKey="milestones" title="Milestones">
          {mainProfileMilestones}
        </Tab>
      )}
    </Tabs>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Container className={appStyles.Content} id={appStyles.ProfileContainer}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {!profile?.can_view_posts && !profile?.can_view_milestones && (
                <Container className="text-center mt-3 mb-3">
                  <hr />
                  <i className={`fa-solid fa-lock fa-bounce ${styles.Lock}`}></i>
                  <h5 className="mt-4 mb-4">This profile is private.</h5>
                </Container>
              )}
              {profileTabs}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;
