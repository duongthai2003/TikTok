import HTTP from "~/utils/http";

export const SenMessageService = async (message, receiver_id) => {
  try {
    const resuilt = await HTTP.post("/messages/send", {
      message,
      receiver_id,
    });

    return resuilt.data;
  } catch (err) {}
};

export const GetOldMessageService = async (idUser) => {
  try {
    const resuilt = await HTTP.get(`/messages/getListMessages/${idUser}`);
    return resuilt;
  } catch (err) {}
};

export const GeUserMessageListService = async (idUser) => {
  try {
    const resuilt = await HTTP.get(`messages/list-users`);
    return resuilt;
  } catch (err) {}
};

export const CreateGroupService = async (receiver_id) => {
  try {
    const resuilt = await HTTP.post("group-chat/create-group", {
      receiver_id,
    });

    return resuilt.data;
  } catch (err) {}
};
