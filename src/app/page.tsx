import { auth } from "@/auth";
import { SignInButton } from "./components/app-ui/auth/AuthButtons";
import TimeRangeSelector from "./components/app-ui/wrapped/TimeRangeSelector";
import TopArtists from "./components/app-ui/wrapped/TopArtists";
import { getTopArtists, getTopTracks } from "./actions/spotify";
import { Suspense } from "react";
import TopTracks from "./components/app-ui/wrapped/TopTracks";
import Intro from "./components/app-ui/wrapped/Intro";
import MainContent from "./components/containers/MainContent";

interface PageProps {
  searchParams: {
    timeRange?: string;
  };
}

export default async function Home({ searchParams }: PageProps) {
  const timeRange = searchParams.timeRange || "medium_term";
  const session = await auth();

  // Fetch data on the server side
  const topArtistsPromise = getTopArtists(timeRange);
  const topTracksPromise = getTopTracks(timeRange);

  const [topArtists, topTracks] = await Promise.all([
    topArtistsPromise,
    topTracksPromise,
  ]);

  return (
    <div className="flex flex-col min-h-screen py-2">
      {!session ? (
        <SignInButton />
      ) : (
        <>
          <Intro />
          <MainContent>
            <div className="col-span-6 flex flex-col gap-4">
              <TimeRangeSelector initialTimeRange={timeRange} />

              <Suspense fallback={<div>Loading artists...</div>}>
                <TopArtists artists={topArtists} timeRange={timeRange} />
              </Suspense>
            </div>
            <div className="col-span-6">
              <Suspense fallback={<div>Loading tracks...</div>}>
                <TopTracks tracks={topTracks} timeRange={timeRange} />
              </Suspense>
            </div>
          </MainContent>
        </>
      )}
    </div>
  );
}
