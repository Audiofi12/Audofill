import React from 'react';
import { VerifiedIcon, Music, ExternalLink, Share2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { toast } from "sonner";

interface ChainDistribution {
  name: string;
  percentage: number;
}

interface ArtistCardProps {
  artist: {
    id: string;
    name: string;
    image: string;
    followers: number;
    tracks: number;
    verified: boolean;
    chains: string[];
    distribution?: ChainDistribution[];
  };
  showStats?: boolean;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ 
  artist,
  showStats = true
}) => {
  const handleViewArtist = () => {
    // Navigate to artist page
    toast.info(`Viewing ${artist.name}'s profile`);
  };

  const handleFollowArtist = () => {
    toast.success(`You are now following ${artist.name}`);
  };

  const handleShareArtist = () => {
    toast.success("Artist profile link copied to clipboard!");
  };

  return (
    <div className="audio-card flex flex-col">
      <div className="relative mx-auto mb-4">
        <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-gray-800">
          <img 
            src={artist.image} 
            alt={artist.name} 
            className="h-full w-full object-cover"
          />
        </div>
        {artist.verified && (
          <div className="absolute bottom-0 right-0 bg-secondary rounded-full p-0.5 border border-gray-800">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <VerifiedIcon className="h-4 w-4 text-primary" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Verified Artist</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
      
      <div className="text-center mb-3">
        <h3 className="font-semibold truncate">{artist.name}</h3>
        
        {showStats && (
          <div className="flex items-center justify-center space-x-3 mt-1 text-xs text-gray-400">
            <div className="flex items-center">
              <span className="mr-1">{artist.followers.toLocaleString()}</span>
              <span>followers</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-gray-700"></div>
            <div className="flex items-center">
              <span className="mr-1">{artist.tracks}</span>
              <Music className="h-3 w-3" />
            </div>
          </div>
        )}
      </div>
      
      {artist.chains.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1 mb-4">
          {artist.chains.map((chain) => (
            <span key={chain} className="chain-pill">{chain}</span>
          ))}
        </div>
      )}
      
      {artist.distribution && (
        <div className="mb-4">
          <p className="text-xs text-gray-400 mb-1 text-center">Royalty Distribution</p>
          <div className="flex h-2 rounded-full overflow-hidden">
            {artist.distribution.map((chain, index) => (
              <div 
                key={chain.name}
                className="h-full" 
                style={{ 
                  width: `${chain.percentage}%`, 
                  backgroundColor: getChainColor(chain.name, index)
                }} 
                title={`${chain.name}: ${chain.percentage}%`}
              ></div>
            ))}
          </div>
          <div className="flex justify-between mt-1">
            <div className="text-xs text-gray-400">
              {artist.distribution[0]?.name}
            </div>
            <div className="text-xs text-gray-400">
              {artist.distribution[artist.distribution.length - 1]?.name}
            </div>
          </div>
        </div>
      )}
      
      <div className="flex space-x-2 mt-auto">
        <Button 
          onClick={handleViewArtist}
          variant="ghost" 
          size="sm" 
          className="flex-1 text-xs"
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          View
        </Button>
        <Button 
          onClick={handleFollowArtist}
          variant="default" 
          size="sm" 
          className="flex-1 text-xs bg-primary hover:bg-primary/90"
        >
          Follow
        </Button>
        <Button 
          onClick={handleShareArtist}
          variant="outline" 
          size="sm"
          className="text-xs"
        >
          <Share2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

const getChainColor = (chainName: string, index: number): string => {
  const colors = [
    'hsl(252, 87%, 67%)', // primary
    'hsl(217, 91%, 60%)', // accent
    '#9b59b6', // purple
    '#e74c3c', // red
    '#f39c12', // orange
    '#2ecc71', // green
  ];
  
  // If chain has a specific color, return it
  if (chainName === 'Ethereum') return '#6c7ae0';
  if (chainName === 'Solana') return '#14f195';
  if (chainName === 'Polygon') return '#8247e5';
  if (chainName === 'Binance') return '#f3ba2f';
  if (chainName === 'Nero') return '#ff6b6b';
  
  // Otherwise use index in colors array
  return colors[index % colors.length];
};

export default ArtistCard;
