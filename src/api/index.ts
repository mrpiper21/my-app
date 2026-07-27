import { useUserStore } from '@/store/user-store'
import axios from 'axios'

export const api = axios.create({
    baseURL: "https://example.com.api",
    timeout: 10000
})


api.interceptors.request.use((config) => {
    const { session } = useUserStore()
    if (session) {
        config.headers.Authorization = `Bearer ${session}`
    }
    return config
})