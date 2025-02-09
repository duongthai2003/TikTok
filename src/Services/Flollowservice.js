import HTTP from "~/utils/http";

export const FollowingList = async (userId) => {
  try {
    const resuilt = await HTTP.get("me/following", {
      params: {
        userId,
      },
    });

    return resuilt.data;
  } catch (err) {}
};

export const FollowerList = async (userId) => {
  try {
    const resuilt = await HTTP.get("me/follower", {
      params: {
        userId,
      },
    });

    return resuilt.data;
  } catch (err) {}
};

export const friendsList = async (userId) => {
  try {
    const resuilt = await HTTP.get("me/friends", {
      params: {
        userId,
      },
    });

    return resuilt.data;
  } catch (err) {}
};

export const followAndUnfollow = async (userID, followingUserId) => {
  try {
    await HTTP.post("me/following", {
      userID,
      followingUserId,
    });
  } catch (err) {}
};
