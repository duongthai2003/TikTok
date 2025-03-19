import HTTP from "~/utils/http";
export const login = async (email, password) => {
  try {
    const response = await HTTP.post("users/login", {
      email,
      password,
    });
    return response.data;
  } catch (err) {}
};
