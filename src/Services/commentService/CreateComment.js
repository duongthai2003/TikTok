import HTTP from "~/utils/http";

export const CreateComment = async (content, userid, videoid) => {
  await HTTP.post("comment/create", {
    content,
    userid,
    videoid,
  });
};
