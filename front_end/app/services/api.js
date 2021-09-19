import axios from 'axios'

const api = axios.create({
    baseURL: 'http://34.67.164.46/api/'
})

export default api;