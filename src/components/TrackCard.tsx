
import React, { useState } from 'react';
import { Play, Pause, MoreHorizontal, GripVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface TrackCardProps {
  track: {
    id: string;
    title: string;
    artist: string;
    cover: string;
    plays: number;
    duration: string;
    chain: string;
    createdAt: string;
    royalties?: {
      total: string;
      chains: { name: string; amount: string }[];
    };
  };
  index?: number;
  compact?: boolean;
  showChain?: boolean;
  onPlay?: (trackId: string) => void;
  isPlaying?: boolean;
  isCurrentTrack?: boolean;
}

const TrackCard: React.FC<TrackCardProps> = ({ 
  track, 
  index, 
  compact = false, 
  showChain = true,
  onPlay,
  isPlaying = false,
  isCurrentTrack = false
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handlePlay = () => {
    if (onPlay) {
      onPlay(track.id);
    }
  };

  const handleShare = () => {
    toast.success("Track link copied to clipboard!");
  };

  const handleAddToPlaylist = () => {
    toast.success("Track added to playlist!");
  };

  if (compact) {
    return (
      <div 
        className={`flex items-center p-2 rounded-md transition-colors hover:bg-secondary group ${isCurrentTrack ? 'bg-secondary' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center flex-1">
          <div className="flex-shrink-0 mr-3">
            {index !== undefined && (
              <span className={`w-6 text-center text-sm ${isHovered || isCurrentTrack ? 'hidden' : 'block'} text-gray-400`}>
                {index + 1}
              </span>
            )}
            {(isHovered || isCurrentTrack) && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 p-0"
                onClick={handlePlay}
              >
                {isPlaying && isCurrentTrack ? (
                  <Pause className="h-4 w-4 text-primary" />
                ) : (
                  <Play className="h-4 w-4 text-primary ml-0.5" />
                )}
              </Button>
            )}
          </div>
          
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="relative h-10 w-10 rounded overflow-hidden">
              <img src={track.cover} alt={track.title} className="h-full w-full object-cover" />
              {showChain && (
                <div className="absolute bottom-0 right-0">
                  <span className="chain-pill text-[8px] py-0.5">{track.chain}</span>
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{track.title}</p>
              <p className="text-xs text-gray-400 truncate">{track.artist}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          <span className="text-xs text-gray-400 mr-4">{track.duration}</span>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-secondary border border-gray-800">
              <DropdownMenuItem onClick={handleAddToPlaylist}>Add to Playlist</DropdownMenuItem>
              <DropdownMenuItem onClick={handleShare}>Share</DropdownMenuItem>
              <DropdownMenuItem>View Artist</DropdownMenuItem>
              <DropdownMenuItem>View NFT Details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 cursor-grab">
            <GripVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="audio-card group">
      <div className="relative aspect-square mb-3 rounded-lg overflow-hidden bg-muted">
        <img 
          src={track.cover} 
          alt={track.title} 
          className="w-full h-full object-cover transition-transform group-hover:scale-105" 
        />
        
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            onClick={handlePlay}
            variant="outline"
            size="icon"
            className="rounded-full h-12 w-12 bg-primary/90 text-white hover:bg-primary border-0"
          >
            {isPlaying && isCurrentTrack ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 ml-0.5" />
            )}
          </Button>
        </div>
        
        {showChain && (
          <div className="absolute top-2 right-2">
            <span className="chain-pill">{track.chain}</span>
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-sm truncate">{track.title}</h3>
          <p className="text-xs text-gray-400">{track.artist}</p>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-secondary border border-gray-800">
            <DropdownMenuItem onClick={handlePlay}>
              {isPlaying && isCurrentTrack ? "Pause" : "Play"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleAddToPlaylist}>Add to Playlist</DropdownMenuItem>
            <DropdownMenuItem onClick={handleShare}>Share</DropdownMenuItem>
            <DropdownMenuItem>View Artist</DropdownMenuItem>
            <DropdownMenuItem>View NFT Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
        <span>{track.plays.toLocaleString()} plays</span>
        <span>{track.duration}</span>
      </div>
    </div>
  );
};

export default TrackCard;
