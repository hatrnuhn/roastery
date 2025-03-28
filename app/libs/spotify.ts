import type { Playlist, Track } from "~/types/spotify";
import { snakeToCamelCase } from "./formatter";
import axios from "./axios";
import { type AxiosInstance } from "axios";

export class SpotifyLibrary {
    private axios: AxiosInstance

    constructor(axios: AxiosInstance) {
        this.axios = axios
    }

    private formatTracks(tracks: {[key: string]: any}[]) {
        return tracks.map(t => {
            const { album, artists, name } = t.track
            return {
                trackName: name,
                artists,
                album: snakeToCamelCase(album)
            } as Track
        })

    }

    public async getPlaylist(playlistId: string) {
        const res = await this.axios.get(`/playlists/${playlistId}`, {
            params: {
                market: 'US',
                fields: "followers(total),name,tracks.items(track(name,album(name,release_date),artists(name)))"
            }
        })

        const tracks = this.formatTracks(res.data.tracks.items)

        return {
            playlistName: res.data.name,
            playlistTotalFollowers: res.data.followers.total,
            tracks
        } as Playlist
    }
}

export default new SpotifyLibrary(axios)