import axios from "axios";

let endpoint = "http://b786-49-244-40-252.ngrok.io/api/calendar/";

export const get_all_calendar = async () => {
  const response = await axios.get(endpoint);
  return response;
};

export const postEvent = async () => {
    await axios.post(endpoint);
};
