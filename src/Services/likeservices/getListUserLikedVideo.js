import HTTP from "~/utils/http";

export const getListUserLikedVideo = async (userId) => {
  try {
    const resuilt = await HTTP.get("like/current-user-liked-video-list", {
      params: {
        user_id: userId,
      },
    });
    return resuilt.data;
  } catch (err) {}
};
