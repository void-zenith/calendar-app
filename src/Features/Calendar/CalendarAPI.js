import axios from "axios";

let endpoint = "http://5329-49-244-17-231.ngrok.io/api/calendar/";

export const get_all_calendar = async () => {
  const response = await axios.get(endpoint);
  return response;
};

export const get_all_events = async () => {
  const response = await axios.get(
    "http://5329-49-244-17-231.ngrok.io/api/event/"
  );
  return response;
};
