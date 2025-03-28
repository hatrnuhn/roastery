export type Track = {
    trackName: string
    artists: string[]
    album: {
        name: string,
        releaseDate: string
    }
}

export type Playlist = {
    playlistName: string
    playlistTotalFollowers: number
    tracks: Track[]
}