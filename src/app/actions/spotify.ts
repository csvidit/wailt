"use server";

import { auth } from "@/auth";

interface Artist {
  id: string;
  name: string;
  images?: { url: string; width: number; height: number }[];
}

interface Track {
  id: string;
  name: string;
  artists: Artist[];
  album: {
    images?: { url: string; width: number; height: number }[];
  };
}

interface TopArtistsResponse {
  items: Artist[];
}

interface TopTracksResponse {
  items: Track[];
}

export async function getTopArtists(
  timeRange: string = "medium_term"
): Promise<TopArtistsResponse | null> {
  const session = await auth();
  if (!session?.accessToken) {
    return null;
  }

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch top artists:", error);
    return null;
  }
}

export async function getTopTracks(
  timeRange: string = "medium_term"
): Promise<TopTracksResponse | null> {
  const session = await auth();
  if (!session?.accessToken) {
    return null;
  }

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch top tracks:", error);
    return null;
  }
}

export async function updateTimeRange(timeRange: string) {
  return { timeRange };
}
