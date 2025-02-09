import HTTP from "~/utils/http";

export const detailuser = async (token) => {
  try {
    const response = await HTTP.post(
      "users/details",
      {
        //parrams
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {}
};
