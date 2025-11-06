import axios from 'axios'

export const SERVER_URL =
	process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000'

export const axiosClient = axios.create({
	baseURL: SERVER_URL,
	withCredentials: true,
	timeout: 30000, // 30 seconds timeout to prevent hanging
})
