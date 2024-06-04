import axios from "axios";
export var IPHTTP = "https://quangthai2003.id.vn/"; //http://localhost:81/
const httprequest = axios.create({
  // baseURL: `${IPHTTP}TIKTOK_API/public/api/`,// dung cho localhost
  baseURL: `${IPHTTP}public/api/`,
});

export const lay = async (apipath, options = {}) => {
  const response = await httprequest.get(apipath, options);
  return response.data;
};
export const post = async (apipath, options = {}) => {
  const response = await httprequest.post(apipath, options);
  return response.data;
};
export const deleteData = async (apipath, options) => {
  const response = await httprequest.delete(apipath, options);
  return response.data;
};
export default httprequest;
