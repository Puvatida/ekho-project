import API from "./api";

/** _________________________GET ALL COMMUNITIES__________________________ */
export const getAllCommunities = () => API.get("/communities");

/** _________________________GET COMMUNITY BY ID__________________________ */
export const getCommunity = (communityId) => API.get(`/communities/${communityId}`);

/** _________________________GET POSTS IN COMMUNITY__________________________ */
export const getCommunityPosts = (communityId) => API.get(`/posts/community/${communityId}`);
/** _________________________SUBSCRIBE TO COMMUNITY__________________________ */
export const subscribeCommunity = (communityId) => API.post(`/communities/${communityId}/subscribe`);

/** _________________________GET COMMUNITY BY TITLE__________________________ */
export const getCommunityByName = (title) => API.get(`/communities/by-title?title=${encodeURIComponent(title)}`);