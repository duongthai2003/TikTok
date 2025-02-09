import HTTP from "~/utils/http";

export const DeleteVideosevice = async (idvideo, iduser) => {
  try {
    HTTP.delete("/delete/video", {
      params: {
        idvideo,
        iduser,
      },
    });
  } catch (er) {}
};
