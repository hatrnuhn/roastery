import { useCallback, type FC } from "react"
import { SiGithub } from "react-icons/si"
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link';
import Icon from '@mui/material/Icon'
import { useColorScheme } from "@mui/material/styles";
import SvgIcon from "@mui/material/SvgIcon";

type HeaderProps = {
    repoUrl: string
}

export const Header: FC<HeaderProps> = ({ repoUrl }) => {
    const { mode, setMode } = useColorScheme()

    const onModeToggle = useCallback(() => {
        setMode(mode === 'light' ? 'dark' : 'light')
    }, [mode, setMode])
    
    return (
        <header className="border-b border-gray-700 shadow min-h-20 flex gap-1 items-center px-5 lg:px-10">
            <h1 className="font-semibold grow flex items-center justify-between text-sm">
                <span 
                    className="-rotate-3 relative -top-2 sm:-top-3 md:-top-3" 
                    style={{ fontFamily: "Shantell Sans, cursive"}}
                >
                    <span>{'Boom! Roasted.'}</span>
                    <span className="relative top-3 right-14">{'-Gemini'}</span>
                    <span className="relative top-6 right-28">{'-Michael Scott'}</span>
                </span>
                <IconButton 
                    onClick={onModeToggle} 
                    color="inherit"
                >
                    <Icon>{'light_mode'}</Icon>
                </IconButton>
                <IconButton color="inherit">
                    <Link 
                        href={repoUrl} 
                        color="inherit"
                    >
                        <SvgIcon component={SiGithub} inheritViewBox/>
                    </Link>
                </IconButton>
            </h1>
        </header>
    )
}