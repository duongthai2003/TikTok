import HTTP from "~/utils/http";

export const LikeAndUnlike = async (userID, videoID) => {
  try {
    await HTTP.post("like", {
      // la post thif ko canf them chu params
      userID,
      videoID,
    });
  } catch (err) {}
};
