import { type FC, memo } from "react"
import type { Roast } from "~/types"
import Loader from "./Loader"

type PlaylistChipProps = {
    playlistId?: string
}

const PlaylistChip: FC<PlaylistChipProps> = ({ playlistId }) => {
    return (
        <h2>
            <a 
                href={`https://open.spotify.com/playlist/${playlistId}`} 
                className="bg-gray-800 text-sm px-4 py-2 box-border rounded-full shadow-lg text-gray-300 hover:bg-gray-600 focus-visible:outline-offset-4"
                target="_blank"
                aria-label={`Link to playlist ${playlistId}`}
            >
                {playlistId}
            </a>
        </h2>
    )
}


type RoastPaperProps = {
    roast?: Roast,
}

const RoastPaper: FC<RoastPaperProps> = ({ roast }) => {
    return (
        <p className="text-sm rounded-lg bg-green-600 box-border px-6 py-3 shadow-lg text-justify flex flex-col" aria-label={`"For playlist ID: ${roast?.playlistId}`}>
            {
                !roast 
                    ? 
                        <Loader /> 
                    :
                        <>
                            <>{roast.content}</>
                            <span className="text-xs self-end mt-2">{new Date(roast.createdAt).toLocaleString(navigator.language)}</span>
                        </>
            }
        </p>
    )
}

type RoastBlockProps = {
    errorMsg: string
    playlistId?: string
    roast?: Roast
    marginAuto?: boolean
}

const RoastBlock: FC<RoastBlockProps> = ({ errorMsg, marginAuto, playlistId, roast }) => {
    return (
        <article 
            className={`flex flex-col items-center gap-5 my-5 mx-5 lg:mx-10 ${marginAuto ? 'mt-auto' : ''}`}
            aria-live="polite"
            aria-busy={roast ? 'false' : 'true'}
            role={errorMsg ? 'alert' : 'article'}
        >
        {
            errorMsg.length > 0 ? 
                <p className="bg-red-800 text-gray-300 text-sm px-3 py-2 text-sm rounded-full text-center shadow">{errorMsg}</p> :
                <>
                    {roast && <PlaylistChip playlistId={playlistId} />}
                    <RoastPaper roast={roast} />
                </>
        }
        </article>
    )
}

export default memo(RoastBlock)