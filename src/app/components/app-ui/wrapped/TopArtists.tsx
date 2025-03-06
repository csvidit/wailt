import { Artist, TopArtistsResponse } from "../../../../utils/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface TopArtistsProps {
  artists: TopArtistsResponse | null;
  timeRange: string;
}

export default function TopArtists({ artists, timeRange }: TopArtistsProps) {
  if (!artists) return null;
  
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Top Artists ({timeRange})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {artists.items.map((artist: Artist, index: number) => (
            <div
              key={artist.id}
              className="flex items-center space-x-4 hover:bg-muted p-2 rounded-md transition-colors"
            >
              <span className="text-muted-foreground w-5">{index + 1}</span>
              <Avatar>
                {artist.images?.[0] ? (
                  <AvatarImage 
                    src={artist.images[0].url} 
                    alt={artist.name} 
                  />
                ) : null}
                <AvatarFallback>{artist.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{artist.name}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}