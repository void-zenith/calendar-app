import axios from "axios"

// let url = "http://b3d1-49-244-6-19.ngrok.io/api"
let url = "https://d5b3-49-244-39-49.ngrok.io/api"

export const getAllCalendar = async () => await axios.get(`${url}/calendar/`)

export const createCalendar = async (data) => await axios.post(`${url}/calendar/`, data)

export const getAllEvents = async () => await axios.get(`${url}/event/`)

export const getCalendarEvents = async (id) => await axios.get(`${url}/calendar/${id}`)

export const create = async (data) => await axios.post(`${url}/event/`, data)

export const edit = async (data) => await axios.patch(`${url}/event/${data.id}/`, data)

export const remove = async (id) => await axios.delete(`${url}/event/${id}/`)
