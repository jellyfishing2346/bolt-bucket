import axios from 'axios'

const API = axios.create({ baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:4000/api' })

export const getOptions = () => API.get('/options').then(r => r.data)
export const getAllItems = () => API.get('/custom-items').then(r => r.data)
export const getItem = (id) => API.get(`/custom-items/${id}`).then(r => r.data)
export const createItem = (payload) => API.post('/custom-items', payload).then(r => r.data)
export const updateItem = (id, payload) => API.put(`/custom-items/${id}`, payload).then(r => r.data)
export const deleteItem = (id) => API.delete(`/custom-items/${id}`).then(r => r.data)
