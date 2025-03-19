import HTTP from "~/utils/http";
export const Getcomment = async (idvideo) => {
  try {
    const resuilt = await HTTP.get(`comment`, {
      params: { video_id: idvideo },
    });
    return resuilt.data;
  } catch (err) {}
};
