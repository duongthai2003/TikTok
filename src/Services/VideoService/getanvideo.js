import HTTP from "~/utils/http";
export const getanvideo = async (idvideo) => {
  try {
    const resuilt = await HTTP.get(`${idvideo}`, {});
    return resuilt.data;
  } catch (err) {}
};
