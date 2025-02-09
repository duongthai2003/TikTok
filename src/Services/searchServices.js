import HTTP from "~/utils/http";
export const Searchuser = async (q, typevl, page) => {
  try {
    const res = await HTTP.get(`users/search`, {
      params: { q, type: typevl, page },
    });
    return res.data;
  } catch (err) {}
};

export const SearchVideo = async (q, page) => {
  try {
    const resuilt = await HTTP.get("search/videos", {
      params: { q, page },
    });
    return resuilt.data;
  } catch (err) {}
};
