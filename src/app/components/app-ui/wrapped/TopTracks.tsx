// import Image from "next/image";
import { Track, TopTracksResponse } from "../../../../utils/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface TopTracksProps {
  tracks: TopTracksResponse | null;
  timeRange: string;
}

export default function TopTracks({ tracks, timeRange }: TopTracksProps) {
  if (!tracks) return null;
  
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Top Tracks ({timeRange})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tracks.items.map((track: Track, index: number) => (
            <div
              key={track.id}
              className="flex items-center space-x-4 hover:bg-muted p-2 rounded-md transition-colors"
            >
              <span className="text-muted-foreground w-5">{index + 1}</span>
              <Avatar>
                {track.album.images?.[0] ? (
                  <AvatarImage 
                    src={track.album.images[0].url} 
                    alt={track.name} 
                  />
                ) : null}
                <AvatarFallback>{track.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{track.name}</p>
                <p className="text-sm text-muted-foreground">
                  {track.artists.map((artist) => artist.name).join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}