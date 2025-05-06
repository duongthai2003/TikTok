import Pusher from "pusher-js";

const getLocalStorage = localStorage.getItem("Tiktok");

const pusher = new Pusher("your_pusher_key", {
  broadcaster: "pusher",
  auth: {
    headers: {
      Authorization: `Bearer ${
        getLocalStorage && JSON.parse(getLocalStorage).token_login
      }`, // Token xác thực nếu cần
    },
  },
  wsHost: process.env.REACT_APP_WS_HOST,
  wsPort: process.env.REACT_APP_WS_POST,
  forceTLS: process.env.REACT_APP_FORCE_TLS === "true",
  disableStats: true,
  authEndpoint: process.env.REACT_APP_AUTH_ENDPOINT,
  cluster: "mt1",
  enabledTransports: ["ws", "wss"],
});

export default pusher;

// ở local thì bỏ
//enabledTransports
// forceTLS: false,
// s;
