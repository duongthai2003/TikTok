import HTTP from "~/utils/http";

export const Video = async ({ page }) => {
  try {
    const res = await HTTP.get("videos", {
      params: { page },
    });
    return res.data?.data;
  } catch (err) {}
};

export const FollowingVideoList = async ({ userId, page }) => {
  try {
    const res = await HTTP.get("me/following/videos", {
      params: { userId, page },
    });
    return res.data;
  } catch (err) {}
};
export const FriendVideoList = async ({ userId, page }) => {
  try {
    const res = await HTTP.get("me/friends/videos", {
      params: { userId, page },
    });
    return res;
  } catch (err) {}
};
