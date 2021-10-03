import axios from 'axios'

let endpoint = 'http://b786-49-244-40-252.ngrok.io/api/calendar/'
let url = 'http://b786-49-244-40-252.ngrok.io/api/calendar/'

export const get_all_calendar = async () => {
  const response = await axios.get(endpoint)
  return response
}

export const getAllEvents = async () => await axios.get(url)
// export const getOne = async (id) => await axios.get(`${url}${id}/`)

export const create = async (data) => await axios.post(`${url}`, data)

export const edit = async (data) => await axios.patch(`${url}${data.id}/`, data)

export const remove = async (id) => await axios.delete(`${url}${id}/`)
