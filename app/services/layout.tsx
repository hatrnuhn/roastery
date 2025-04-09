import { Outlet, useOutletContext } from "react-router";
import { Header } from "~/services/components/Header";
import { Input } from "~/services/components/Input";
import { REPO_URL } from "~/constants";
import type { Route } from "./+types/layout";
import type { AppContext } from "~/root";
import Box from '@mui/material/Box'
import { useColorScheme } from "@mui/material/styles";

export function loader() {
    return {
        repoUrl: REPO_URL
    }
}

export default function Layout({
    loaderData
}: Route.ComponentProps) {
    const context = useOutletContext<AppContext>()
    const { mode } = useColorScheme()
    return (
        <Box 
            component={'main'}
            className={`h-dvh flex flex-col overflow-hidden pb-5 ${mode === 'dark' ? 'bg-neutral-950 text-neutral-100' : 'bg-neutral-50 text-neutral-900'}`}
        >
            <Header repoUrl={loaderData.repoUrl}/>
            <div className="grow flex flex-col overflow-scroll pt-5">
                <Outlet context={context} />
            </div>
            <Input />
        </Box>
    )
}