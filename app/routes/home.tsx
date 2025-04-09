import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Roastery" },
    { name: "Roast everything", content: "Welcome to ya favourite Roastery!" },
  ];
}

export default function Home() {
  return <>
    <a href="/spotify">Spotify Playlist</a>
  </>;
}
