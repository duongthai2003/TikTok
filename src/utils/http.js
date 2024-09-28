import axios from "axios";

const HTTP = axios.create({
  baseURL: `https://quangthai2003.id.vn/public/api/`,
});

HTTP.interceptors.request.use((req) => {
  const token = "toi la duong quang thai";
  if (token && req.headers) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }
  return req;
});

// HTTP.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   (err) => {
//     const data = err.response && err.response.data;
//     if (err.response && err.response.status === 401 && Event !== undefined) {
//       const event = new Event("unauthorized");
//       // const event = document.createEvent("Event");
//       // event.initEvent("unauthorized", true, true);
//       document.dispatchEvent(event);
//     }
//     console.error("HTTP error: ", err);
//     const msg = data.message || err.message;
//     err.message = msg;
//     throw err;
//   }
// );

// export const handleResponse = (res) => res.data.result;

// export const wrapResponse = (res) => {
//   if (!res.data?.result?.success && res.data?.result?.message) {
//     throw new Error(res.data?.result?.message);
//   }

//   return res;
// };

export default HTTP;
