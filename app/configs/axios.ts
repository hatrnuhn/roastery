import type { CreateAxiosDefaults } from "axios"

const config: CreateAxiosDefaults = {
    baseURL: process.env.SPOTIFY_API_URL
}

export default config