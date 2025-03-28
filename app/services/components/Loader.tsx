import { memo } from "react"

const Loader = () => {
    return (
        <>
            <span className="loader block" aria-hidden/>
        </>
    )
}

export default memo(Loader)