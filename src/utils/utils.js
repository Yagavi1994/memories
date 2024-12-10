import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

// Fetch additional data for infinite scroll
export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: [
        ...prevResource.results,
        ...data.results.filter(
          (newItem) =>
            !prevResource.results.some(
              (existingItem) => existingItem.id === newItem.id
            )
        ),
      ],
    }));
  } catch (err) {
  }
};

// Helper function to handle follow action
export const followHelper = (profile, clickedProfile, following_id, isPrivate = false) => {
  if (profile.id === clickedProfile.id) {
    // This is the clicked profile
    return {
      ...profile,
      followers_count: profile.followers_count + 1,
      following_id: isPrivate ? null : following_id, // Null for private profiles
      request_sent: isPrivate, // True for private profiles
    };
  }

  if (profile.is_owner) {
    // This is the logged-in user's profile
    return {
      ...profile,
      following_count: profile.following_count + 1,
    };
  }

  // Unchanged profile
  return profile;
};

// Helper function to handle unfollow action
export const unfollowHelper = (profile, clickedProfile) => {
  if (profile.id === clickedProfile.id) {
    // This is the clicked profile
    return {
      ...profile,
      followers_count: profile.followers_count - 1,
      following_id: null,
      request_sent: false, // Reset request_sent for private profiles
    };
  }

  if (profile.is_owner) {
    // This is the logged-in user's profile
    return {
      ...profile,
      following_count: profile.following_count - 1,
    };
  }

  // Unchanged profile
  return profile;
};

// Set token expiration timestamp in localStorage
export const setTokenTimestamp = (data) => {
  if (data?.refresh_token) {
    const refreshTokenTimestamp = jwtDecode(data.refresh_token).exp;
    localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
  } else {
  }
};

// Check if the token should be refreshed
export const shouldRefreshToken = () => {
  const timestamp = localStorage.getItem("refreshTokenTimestamp");
  return timestamp && Date.now() / 1000 > timestamp;
};

// Remove token expiration timestamp from localStorage
export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};
