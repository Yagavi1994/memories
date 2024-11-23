import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "./CurrentUserContext";
import { followHelper, unfollowHelper } from "../utils/utils";

const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    popularProfiles: { results: [], next: null, previous: null },
  });

  const currentUser = useCurrentUser();

  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post("/followers/", {
        followed: clickedProfile.profile_pk,
      });

      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            profile.id === clickedProfile.id
              ? followHelper(profile, clickedProfile, data.id, clickedProfile.is_private)
              : profile
          ),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id, clickedProfile.is_private)
          ),
        },
      }));
    } catch (err) {
      console.error(`Error following profile ${clickedProfile.id}:`, err.response?.data || err.message);
    }
  };

  const handleUnfollow = async (clickedProfile) => {
    try {
      await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);

      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            profile.id === clickedProfile.id
              ? unfollowHelper(profile, clickedProfile)
              : profile
          ),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          ),
        },
      }));
    } catch (err) {
      console.error(`Error unfollowing profile ${clickedProfile.id}:`, err.response?.data || err.message);
    }
  };

  const getFollowButtonState = (profile) => {
    if (profile.is_private) {
      if (profile.following_id) {
        return "unfollow";
      } else if (profile.request_sent) {
        return "request_sent";
      } else {
        return "follow";
      }
    } else {
      return profile.following_id ? "unfollow" : "follow";
    }
  };

  useEffect(() => {
    const fetchPopularProfiles = async () => {
      try {
        const { data } = await axiosReq.get("/profiles/?ordering=-followers_count");
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
      } catch (err) {
        console.error("Error fetching popular profiles:", err.response?.data || err.message);
      }
    };

    fetchPopularProfiles();
  }, [currentUser]);

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider
        value={{
          setProfileData,
          handleFollow,
          handleUnfollow,
          getFollowButtonState,
        }}
      >
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
