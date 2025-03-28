import type { Route } from "../services/+types/spotify";
import roastService from './roasts'
import history from "~/libs/history";
import RoastBlock from "./components/RoastBlock";
import { AxiosError } from "axios";
import { useEffect, useRef } from "react";
import { useOutletContext } from "react-router";
import type { AppContext } from "~/root";

export async function clientLoader({}: Route.ClientLoaderArgs) {
    return await history.get()
}

export async function action({
    request
}: Route.ActionArgs) {
    // Retrieves form data
    const formData = await request.formData()
    let input = formData.get('input') as string
    const language = formData.get('language') as "EN" | "ID"

    
    try {
        // Validates playlist ID from input
        const isValidPlaylistId = new RegExp('^[a-zA-Z0-9_-]{22}$').test(input);

        if (isValidPlaylistId)
            // Generates new roast and returns it
            return await roastService.createSpotifyPlaylistRoast(input, language)
        else 
            throw new AxiosError(`${input} is not a valid playlist ID`, '400')
    } catch (err) {
        if (err instanceof AxiosError) {
            switch (err.response?.status) {
                case 400:
                    throw err
                case 404:
                    err.message = `Playlist with ID ${input} could not be found, make sure it's made public`
                    throw err
                case 429:
                    err.message = 'Too many requests'
                    throw err
                default: 
                    err.message = 'Could not generate, try again'
                    throw err
            }
        } else {
            throw new Error('Could not generate, try again')
        }
    }
}

export async function clientAction({
    serverAction    
}: Route.ClientActionArgs) {
    // Retrieves serverAction data
    const data = await serverAction()

    // Retrieves history data
    const roasts = await history.get()

    // If history is null, creates new, else pushes
    if (!roasts)
        await history.set([data])
    else 
        await history.set([...roasts, data])

    return data
}

export default function ServiceRouteComponent({
    loaderData,
    actionData
}: Route.ComponentProps) {
    const divRef = useRef<HTMLDivElement>(null)
    const {busy, setBusy} = useOutletContext<AppContext>()

    useEffect(() => {
        if (divRef.current)
            divRef.current.scrollIntoView({
                behavior: 'smooth'
            })
    })

    useEffect(() => {
        if (actionData)
            setBusy(false)
    }, [actionData])

    return (
        <>
            {loaderData && loaderData.map((r, i) => (
                <RoastBlock roast={r} errorMsg="" key={i} playlistId={r.playlistId}/>
            ))}
            {busy && <RoastBlock roast={undefined} errorMsg=""/>}
            <div ref={divRef}/>
        </>
    )
}

export function ErrorBoundary({ 
    error,
    loaderData,
    actionData
}: Route.ErrorBoundaryProps) {
    const divRef = useRef<HTMLDivElement>(null)
    const {busy, setBusy} = useOutletContext<AppContext>()

    useEffect(() => {
        if (divRef.current)
            divRef.current.scrollIntoView({
                behavior: 'smooth'
            })
    })

    useEffect(() => {
        if (actionData || error)
            setBusy(false)

    }, [actionData, error])

    return (
        <>
            {loaderData && loaderData.map((r, i) => (
                <RoastBlock roast={r} errorMsg="" key={i} playlistId={r.playlistId}/>
            ))}
            {error instanceof Error && <RoastBlock errorMsg={error.message} />}
            {busy && <RoastBlock roast={undefined} errorMsg=""/>}
            <div ref={divRef}/>
        </>
    );
}