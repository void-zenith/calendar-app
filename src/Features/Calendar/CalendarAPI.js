import axios from "axios";

const url = (label) => {
  return `http://de2b-49-244-6-19.ngrok.io/api/${label}/`;
};
export const get_all_calendar = async () => {
  const response = await axios.get(url("calendar"));
  return response;
};

export const get_all_events = async () => {
  const response = await axios.get(url("event"));
  return response;
};

export const post_event = async (eventData) => {
  return await axios.post(
    url("event"), //event endpoint
    { ...eventData }
  );
};

export const cancel_event = async (id) => {
  return await axios.delete(`${url("event")}${id}/`);
};

export const edit_event = async (eventData) => {
  return await axios.patch(`${url("event")}${eventData.id}/`, { ...eventData });
};
