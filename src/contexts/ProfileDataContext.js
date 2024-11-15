import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "./CurrentUserContext";
import { followHelper, unfollowHelper } from "../utils/utils";

// Create contexts for profile data and setters
const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

// Custom hooks for accessing context
export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] }, // Data for the currently viewed profile
    popularProfiles: { results: [] }, // Data for popular profiles
  });

  const currentUser = useCurrentUser();

  const fetchPageProfile = async (profileId) => {
    try {
      const { data } = await axiosReq.get(`/profiles/${profileId}/`);
      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: { results: [data] },
      }));
    } catch (err) {
      console.error("Error fetching page profile:", err);
    }
  };
  
  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post("/followers/", {
        followed: clickedProfile.id,
      });
  
      setProfileData((prevState) => ({
        ...prevState,
        // Update pageProfile if clicked profile matches the current page profile
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            profile.id === clickedProfile.id
              ? followHelper(profile, clickedProfile, data.id)
              : profile
          ),
        },
        // Update popularProfiles
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
      }));
  
      // Re-fetch the page profile to sync immediately
      await fetchPageProfile(clickedProfile.id);
    } catch (err) {
      console.error("Error while following profile:", err);
    }
  };
  
  const handleUnfollow = async (clickedProfile) => {
    try {
      await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);
  
      setProfileData((prevState) => ({
        ...prevState,
        // Update pageProfile if clicked profile matches the current page profile
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            profile.id === clickedProfile.id
              ? unfollowHelper(profile, clickedProfile)
              : profile
          ),
        },
        // Update popularProfiles
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          ),
        },
      }));
  
      // Re-fetch the page profile to sync immediately
      await fetchPageProfile(clickedProfile.id);
    } catch (err) {
      console.error("Error while unfollowing profile:", err);
    }
  };  
  
  // Fetch popular profiles on mount and when the current user changes
  useEffect(() => {
    const fetchPopularProfiles = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-followers_count"
        );
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
      } catch (err) {
        console.error("Error while fetching popular profiles:", err);
      }
    };

    fetchPopularProfiles();
  }, [currentUser]);

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider
        value={{ setProfileData, handleFollow, handleUnfollow }}
      >
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
