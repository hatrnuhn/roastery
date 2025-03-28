import { type ChangeEventHandler, type FC, type FormEventHandler, useEffect, useRef, useState } from "react"
import { useOutletContext, useSubmit} from "react-router"
import { type AppContext } from "~/root"

type InputProps = {}

export const Input: FC<InputProps> = ({}) => {
    const [input, setinput] = useState('')
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const submit = useSubmit()
    const {language, setLanguage, busy, setBusy} = useOutletContext<AppContext>()

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
            
            setBusy(true)
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
        <div className="flex gap-2.5 lg:gap-5 border-t shadow border-gray-700 pt-5 px-5 lg:px-10" style={{ boxShadow: " 0 -1px 3px 0 rgba(0, 0, 0, 0.1), 0 -1px 2px 0 rgba(0, 0, 0, 0.06)" }}>
            <button type="button" onClick={() => switchLanguage()} className="uppercase text-sm font-bold min-w-5" aria-live="polite" aria-label={`Button: switch responses language`} disabled={isButtonDisabled}>
                <span>{language}</span>
            </button>
            <form onSubmit={isButtonDisabled ? undefined : onSubmit} className="flex grow gap-2.5 lg:gap-5 items-center relative">
                <input type="text" name="input" placeholder="Enter your playlist URL or ID here" className="bg-white text-black z-10 indent-2 grow rounded-lg py-1" onChange={onChange} ref={inputRef} aria-label="TextField: Enter your Spotify's playlist ID or URL here"/>
                {errorMsg && <InputErrorMsg  errorMsg={errorMsg}/>}
                <button className="h-6 w-6 block text-gray-800 dark:text-white" type="submit" aria-label="Button: generate response" disabled={isButtonDisabled}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16" aria-hidden>
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
                    </svg>
                </button>
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