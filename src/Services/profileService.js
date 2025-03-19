import HTTP from "~/utils/http";

export const getaUser = async (path) => {
  try {
    const res = await HTTP.get(`users/profile${path}`);
    return res.data?.data[0];
  } catch (err) {}
};
