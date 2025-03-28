import type { Route } from "../services/+types/spotify";
import roastService from './roasts'
import history from "~/libs/history";
import RoastBlock from "./components/RoastBlock";
import { AxiosError } from "axios";
import { useEffect, useRef } from "react";
import { useOutletContext, data, isRouteErrorResponse } from "react-router";
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
            throw data(`${input} is not a valid playlist ID`, { status: 400 })
    } catch (err) {
        if (err instanceof AxiosError) {
            switch (err.response?.status) {
                case 400:
                    throw data(`${input} is not a valid playlist ID`, { status: 400 })
                case 404:
                    throw data(`Playlist with ID ${input} could not be found, make sure it's made public`, { status: 404 })
                case 429:
                    throw data('Too many requests', { status: 429 })
                default: 
                    throw data('Could not generate, try again', { status: err.status })
            }
        }
    }
}

export async function clientAction({
    serverAction    
}: Route.ClientActionArgs) {
    // Retrieves serverAction data
    const serverActionData = await serverAction()

    // Retrieves history data
    const roasts = await history.get()

    // If history is null, creates new, else pushes
    if (!roasts)
        await history.set([serverActionData!])
    else 
        await history.set([...roasts, serverActionData!])

    return data
}

export default function ServiceRouteComponent({
    loaderData
}: Route.ComponentProps) {
    const divRef = useRef<HTMLDivElement>(null)
    const { navigation } = useOutletContext<AppContext>()

    useEffect(() => {
        if (divRef.current)
            divRef.current.scrollIntoView({
                behavior: 'smooth'
            })
    })

    return (
        <>
            {loaderData && loaderData.map((r, i) => (
                <RoastBlock roast={r} errorMsg="" key={i} playlistId={r.playlistId}/>
            ))}
            {navigation.state !== 'idle' && <RoastBlock roast={undefined} errorMsg=""/>}
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
    const { navigation } = useOutletContext<AppContext>()

    useEffect(() => {
        if (divRef.current)
            divRef.current.scrollIntoView({
                behavior: 'smooth'
            })
    })

    return (
        <>
            {loaderData && loaderData.map((r, i) => (
                <RoastBlock roast={r} errorMsg="" key={i} playlistId={r.playlistId}/>
            ))}
            <RoastBlock errorMsg={isRouteErrorResponse(error) 
                ? error.data 
                : error instanceof Error && error.message} />
            {navigation.state !== 'idle' && <RoastBlock roast={undefined} errorMsg=""/>}
            <div ref={divRef}/>
        </>
    );
}