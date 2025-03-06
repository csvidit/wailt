export interface Artist {
  id: string;
  name: string;
  images?: { url: string; width: number; height: number }[];
}

export interface Track {
  id: string;
  name: string;
  artists: Artist[];
  album: {
    images?: { url: string; width: number; height: number }[];
  };
}

export interface TopArtistsResponse {
  items: Artist[];
}

export interface TopTracksResponse {
  items: Track[];
}
