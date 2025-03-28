import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    layout("services/layout.tsx", [
        route("spotify", "services/spotify.tsx")
    ])    
] satisfies RouteConfig;
