
import React, { useState, useEffect } from 'react';
import { Sparkles, Filter, ArrowRight, Music, Headphones, Radio, ListMusic } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrackCard from './TrackCard';
import { toast } from "sonner";

interface AIRecommendationProps {
  onSelectTrack?: (trackId: string) => void;
}

const AIRecommendation: React.FC<AIRecommendationProps> = ({ onSelectTrack }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personalized');
  const [interests, setInterests] = useState<string[]>([
    'Electronic', 'Ambient', 'Hip-Hop', 'Jazz'
  ]);

  // Simulated AI recommendation categories
  const categories = [
    {
      id: 'personalized',
      name: 'Personalized For You',
      icon: <Sparkles className="h-4 w-4" />,
      description: 'Tracks tailored to your listening history'
    },
    {
      id: 'trending',
      name: 'Cross-Chain Trending',
      icon: <ArrowRight className="h-4 w-4" />,
      description: 'Popular tracks across all chains'
    },
    {
      id: 'discover',
      name: 'Discover Weekly',
      icon: <Headphones className="h-4 w-4" />,
      description: 'New releases that match your taste'
    },
    {
      id: 'radio',
      name: 'AI Radio',
      icon: <Radio className="h-4 w-4" />,
      description: 'Continuous stream of recommended tracks'
    },
    {
      id: 'playlists',
      name: 'Smart Playlists',
      icon: <ListMusic className="h-4 w-4" />,
      description: 'Auto-curated playlists based on your mood'
    }
  ];

  // Sample tracks data
  const recommendedTracks = [
    {
      id: '1',
      title: 'Lost in the Metaverse',
      artist: 'Crypto Punk',
      cover: 'https://images.unsplash.com/photo-1578589318433-39b5de440c3f?q=80&w=200',
      plays: 24350,
      duration: '3:24',
      chain: 'Ethereum',
      createdAt: '2023-04-15'
    },
    {
      id: '2',
      title: 'Blockchain Beats',
      artist: 'NEROchild',
      cover: 'https://images.unsplash.com/photo-1602848597941-0d3c4c18b8d5?q=80&w=200',
      plays: 18720,
      duration: '4:12',
      chain: 'Nero',
      createdAt: '2023-04-18'
    },
    {
      id: '3',
      title: 'Decentralized Dreams',
      artist: 'SolFlow',
      cover: 'https://images.unsplash.com/photo-1558682217-dc0dd47e1daf?q=80&w=200',
      plays: 31205,
      duration: '2:58',
      chain: 'Solana',
      createdAt: '2023-04-21'
    },
    {
      id: '4',
      title: 'NFT Groove',
      artist: 'PolyRhythm',
      cover: 'https://images.unsplash.com/photo-1603267402586-17db4c2097dc?q=80&w=200',
      plays: 9560,
      duration: '3:45',
      chain: 'Polygon',
      createdAt: '2023-04-22'
    },
    {
      id: '5',
      title: 'Smart Contract Shuffle',
      artist: 'Binance Bards',
      cover: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=200',
      plays: 12680,
      duration: '3:33',
      chain: 'Binance',
      createdAt: '2023-04-25'
    },
    {
      id: '6',
      title: 'Gas Fee Blues',
      artist: 'Crypto Punk',
      cover: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?q=80&w=200',
      plays: 7890,
      duration: '4:05',
      chain: 'Ethereum',
      createdAt: '2023-04-28'
    }
  ];

  // Simulate loading AI recommendations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSelectTrack = (trackId: string) => {
    if (onSelectTrack) {
      onSelectTrack(trackId);
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
    toast.success(`Removed ${interest} from your interests`);
  };

  const handleAddInterest = () => {
    const newInterests = ['Reggae', 'Classical', 'Rock', 'Pop', 'Lo-Fi', 'Funk'];
    const filtered = newInterests.filter(i => !interests.includes(i));
    if (filtered.length > 0) {
      const randomInterest = filtered[Math.floor(Math.random() * filtered.length)];
      setInterests([...interests, randomInterest]);
      toast.success(`Added ${randomInterest} to your interests`);
    }
  };

  return (
    <div className="bg-secondary rounded-xl border border-gray-800 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-primary" />
            AI Audio Discovery
          </h2>
          <Button variant="outline" size="sm" className="text-xs">
            <Filter className="h-3.5 w-3.5 mr-1" />
            Refine
          </Button>
        </div>
        
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Your Musical Interests</h3>
          <div className="flex flex-wrap gap-2">
            {interests.map(interest => (
              <Badge 
                key={interest} 
                variant="outline"
                className="bg-muted/50 hover:bg-muted cursor-pointer"
                onClick={() => handleRemoveInterest(interest)}
              >
                {interest} <span className="ml-1 text-gray-400">×</span>
              </Badge>
            ))}
            <Badge 
              variant="outline"
              className="bg-primary/20 hover:bg-primary/30 text-primary cursor-pointer"
              onClick={handleAddInterest}
            >
              + Add
            </Badge>
          </div>
        </div>
        
        <div className="mb-4">
          <TabsList className="w-full bg-background p-1">
            {categories.map(category => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex items-center data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                onClick={() => setActiveTab(category.id)}
              >
                {category.icon}
                <span className="hidden md:inline ml-1.5">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        <div className="mb-4">
          <h3 className="font-medium mb-1">{categories.find(c => c.id === activeTab)?.name}</h3>
          <p className="text-sm text-gray-400">{categories.find(c => c.id === activeTab)?.description}</p>
        </div>
      </div>
      
      {isLoading ? (
        <div className="audio-gradient p-16 flex flex-col items-center justify-center space-y-4">
          <div className="flex items-end space-x-1 h-12">
            {Array.from({ length: 5 }).map((_, i) => (
              <div 
                key={i}
                className="w-2 bg-primary/80 rounded-sm animate-wave"
                style={{ 
                  height: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.1}s`
                }}
              ></div>
            ))}
          </div>
          <p className="text-sm text-center mt-4">AI is analyzing your listening patterns...</p>
        </div>
      ) : (
        <ScrollArea className="h-[400px]">
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedTracks.map(track => (
                <TrackCard 
                  key={track.id}
                  track={track}
                  showChain={true}
                  onPlay={() => handleSelectTrack(track.id)}
                />
              ))}
            </div>
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default AIRecommendation;
