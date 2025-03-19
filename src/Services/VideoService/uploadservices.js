import HTTP from "~/utils/http";

export const Uploadservice = async (
  description,
  file_url,
  user_id,
  thumnailvideosecond,
  music
) => {
  try {
    const response = await HTTP.post(
      "videos/create",
      {
        description,
        file_url,
        user_id,
        snapshot_time: thumnailvideosecond,
        music,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "response-type": "blob",
        },
      }
    );
    return response.data;
  } catch (er) {}
};
