import { type ChangeEventHandler, type FC, type FormEventHandler, useEffect, useRef, useState } from "react"
import { useOutletContext, useSubmit} from "react-router"
import { type AppContext } from "~/root"
import Button from "@mui/material/Button"
import Icon from "@mui/material/Icon"
import IconButton from "@mui/material/IconButton"
import TextField from "@mui/material/TextField"

type InputProps = {}

export const Input: FC<InputProps> = ({}) => {
    const [input, setinput] = useState('')
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const submit = useSubmit()
    const { language, setLanguage } = useOutletContext<AppContext>()

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setinput(() => e.target.value)
    }

    // Validates input function
    const isValidURL = (string: string) => {
        try {
            return new URL(string)
        } catch (err) {
            if (err) return false
        }
    }

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        setIsButtonDisabled(true)
        setTimeout(() => setIsButtonDisabled(false), 2000)

        // If input is an URL, extract playlist ID
        const url = isValidURL(input)
        let playlistId: string

        if (url) {
            playlistId = url.pathname.split('/')[2]
            if (!playlistId)
                setErrorMsg('Invalid URL')
        } else 
            playlistId = input

        const isValidPlaylistId = new RegExp('^[a-zA-Z0-9_-]{22}$').test(playlistId);

        if (!isValidPlaylistId) {
            if (inputRef.current)
                inputRef.current.focus()
            if (playlistId && playlistId.length > 22)
                playlistId = playlistId.slice(0, 20).concat('...')

            if (playlistId && !errorMsg)
                setErrorMsg(`${playlistId} is not a valid playlist ID`)

            setTimeout(() => setErrorMsg(''), 3000)
        } else  {
            submit(
                {
                    language,
                    input
                }, {
                    action: '/spotify',
                    method: 'POST'
                }
            )            
        }
    }

    const switchLanguage = () => {
        switch (language) {
            case 'EN':
                setLanguage('ID')
                break;
            case 'ID':
                setLanguage('EN')
                break
        }
    }

    return (
        <div 
            className="flex gap-2.5 lg:gap-5 border-t shadow border-gray-700 pt-5 px-5 lg:px-10" 
            style={{ boxShadow: " 0 -1px 3px 0 rgba(0, 0, 0, 0.1), 0 -1px 2px 0 rgba(0, 0, 0, 0.06)" }}
        >
            <Button 
                type="button" 
                onClick={() => switchLanguage()} 
                aria-label={`Language`} 
            >
                <span>{language === 'EN' ? '🇺🇲' : '🇮🇩'}</span>
            </Button>
            <form onSubmit={isButtonDisabled ? undefined : onSubmit} className="flex grow gap-2.5 lg:gap-5 items-center relative">
                <TextField 
                    id="input" 
                    label="Playlist ID" 
                    variant="filled" 
                    name="input"
                    placeholder="Enter your playlist URL or ID here"
                    fullWidth
                    onChange={onChange}
                    ref={inputRef}
                    size={'small'}
                />
                {errorMsg && <InputErrorMsg  errorMsg={errorMsg}/>}
                <IconButton
                    type="submit"
                    aria-label="Send"
                    disabled={isButtonDisabled}
                    color="inherit"
                >
                    <Icon>
                        {'send'}
                    </Icon>
                </IconButton>
            </form>
        </div>
    )
}

type InputErrorMsgProps = {
    errorMsg: string
}

const InputErrorMsg: FC<InputErrorMsgProps> = ({ errorMsg }) => {
    const [show, setShow] = useState(false)

    useEffect(() => {
        setShow(true)
    }, [])

    return (
        <p className={`absolute text-center translate-x-2 -top-4 text-xs bg-red-800 text-gray-200 font-semibold px-2 py-1 rounded-t-md pb-5 transition-all shadow ${show ? 'input-error-active' : 'input-error'}`} role='alert'>{errorMsg}</p>
    )
}