import HTTP from "~/utils/http";

export const Suggest = async ({ page, perpage }) => {
  try {
    const res = await HTTP.get("suggess/users", {
      params: { page },
    });
    return res.data;
  } catch (err) {}
};
