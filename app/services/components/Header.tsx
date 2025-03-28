import type { FC } from "react"

type HeaderProps = {
    repoUrl: string
}

export const Header: FC<HeaderProps> = ({ repoUrl }) => {
    return (
        <header className="border-b border-gray-700 shadow min-h-20 flex gap-1 items-center px-5 lg:px-10">
            <h1 className="font-semibold grow flex items-center justify-between text-sm">
                <span className="-rotate-3 relative -top-2 sm:-top-3 md:-top-3" style={{ fontFamily: "Shantell Sans, cursive"}}>
                    <span>{'Boom! Roasted.'}</span>
                    <span className="relative top-3 right-14">{'-Gemini'}</span>
                    <span className="relative top-6 right-28">{'-Michael Scott'}</span>
                </span>
                <a href={repoUrl} target="_blank" className="group relative">
                    <span className="h-6 w-6 block group-hover:scale-125 group-focus:scale-125 transition-all ease-in-out" aria-hidden>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                        </svg>
                    </span>
                    <span className="rounded-lg text-gray-200 bg-gray-800 px-2.5 shadow py-1 -translate-x-[10%] absolute truncate -left-20 translate-y-0 scale-y-0 group-hover:scale-y-100 group-focus:scale-y-100 group-hover:translate-y-2 delay-500 transition-all ease-in-out">{'View on GitHub'}</span>
                </a>
            </h1>
        </header>
    )
}