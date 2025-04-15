
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import MusicPlayer from '@/components/MusicPlayer';
import AIRecommendation from '@/components/AIRecommendation';
import TrackCard from '@/components/TrackCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Sparkles, 
  Globe, 
  Music, 
  Radio, 
  Podcast, 
  History,
  Mic,
  X,
  PlayCircle,
  PauseCircle
} from 'lucide-react';

const AIDiscovery = () => {
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'electronic music', 'hip-hop beats', 'jazz fusion', 'reggae remix'
  ]);
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
  const mockTracks = [
    {
      id: '1',
      title: 'Neural Network Nocturne',
      artist: 'AI Ensemble',
      cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&h=500&q=80',
      plays: 35786,
      duration: '3:24',
      chain: 'Ethereum',
      createdAt: '2023-05-01'
    },
    {
      id: '2',
      title: 'Blockchain Frequency',
      artist: 'Data Miners',
      cover: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&h=500&q=80',
      plays: 28459,
      duration: '4:12',
      chain: 'Solana',
      createdAt: '2023-05-03'
    },
    {
      id: '3',
      title: 'Algorithmic Beats',
      artist: 'Code Conductor',
      cover: 'https://images.unsplash.com/photo-1593697972672-b1c1362d7432?w=500&h=500&q=80',
      plays: 21378,
      duration: '2:58',
      chain: 'Polygon',
      createdAt: '2023-05-05'
    },
    {
      id: '4',
      title: 'Quantum Riddim',
      artist: 'Tech Tribe',
      cover: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&h=500&q=80',
      plays: 19542,
      duration: '3:45',
      chain: 'Binance',
      createdAt: '2023-05-07'
    },
    {
      id: '5',
      title: 'Machine Learning Melodies',
      artist: 'Neural DJs',
      cover: 'https://images.unsplash.com/photo-1558862107-d49ef2a04d72?w=500&h=500&q=80',
      plays: 15698,
      duration: '3:33',
      chain: 'Nero',
      createdAt: '2023-05-09'
    },
    {
      id: '6',
      title: 'Pattern Recognition',
      artist: 'Deep Frequencies',
      cover: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=500&h=500&q=80',
      plays: 12345,
      duration: '4:05',
      chain: 'Ethereum',
      createdAt: '2023-05-11'
    },
  ];
  
  const currentTrack = currentTrackId 
    ? mockTracks.find(track => track.id === currentTrackId) 
    : undefined;

  const handlePlayTrack = (trackId: string) => {
    setCurrentTrackId(trackId);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && !recentSearches.includes(searchQuery)) {
      setRecentSearches([searchQuery, ...recentSearches.slice(0, 4)]);
    }
    // In a real app, this would trigger a search
    console.log('Searching for:', searchQuery);
  };

  const handleRemoveSearch = (search: string) => {
    setRecentSearches(recentSearches.filter(s => s !== search));
  };

  const handleVoiceSearch = () => {
    setShowVoiceSearch(true);
    // In a real app, this would activate speech recognition
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    // In a real app, this would start recording
    setTimeout(() => {
      setIsRecording(false);
      setShowVoiceSearch(false);
      setSearchQuery('electronic music with deep bass');
      // In a real app, this would be the result of speech recognition
    }, 3000);
  };

  const handleCancelVoiceSearch = () => {
    setIsRecording(false);
    setShowVoiceSearch(false);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        {/* AI Discovery Hero */}
        <section className="mb-8">
          <div className="rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 mix-blend-overlay"></div>
            <div className="audio-gradient backdrop-blur-sm py-10 px-6 md:px-12">
              <div className="max-w-3xl">
                <h1 className="text-3xl font-bold mb-2 flex items-center">
                  <Sparkles className="h-6 w-6 mr-2 text-primary" />
                  <span className="gradient-text">AI Audio Discovery</span>
                </h1>
                <p className="text-lg mb-6 text-gray-200">
                  Let our AI analyze your listening patterns to find your next favorite tracks across all blockchain networks.
                </p>
                
                <form onSubmit={handleSearch} className="relative mb-6">
                  <Input
                    type="text"
                    placeholder="Search for artists, tracks, or genres..."
                    className="bg-background/60 backdrop-blur-md border-gray-700 pr-20 h-12"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute right-1 top-1 flex space-x-1">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon"
                      className="h-10 w-10 text-gray-400"
                      onClick={handleVoiceSearch}
                    >
                      <Mic className="h-5 w-5" />
                    </Button>
                    <Button type="submit" className="h-10 bg-primary hover:bg-primary/90">
                      <Search className="h-5 w-5" />
                    </Button>
                  </div>
                </form>
                
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center mb-2">
                      <History className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-400">Recent searches:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search, index) => (
                        <Badge 
                          key={index} 
                          variant="outline"
                          className="bg-background/40 backdrop-blur-sm hover:bg-background/60 cursor-pointer"
                          onClick={() => setSearchQuery(search)}
                        >
                          {search}
                          <X 
                            className="h-3 w-3 ml-1 cursor-pointer" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveSearch(search);
                            }}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Voice Search Modal */}
        {showVoiceSearch && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-secondary p-6 rounded-xl max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4 text-center">Voice Search</h3>
              
              <div className="text-center mb-6">
                <p className="text-gray-400 mb-4">
                  {isRecording 
                    ? "Listening... Speak now" 
                    : "Click the microphone to start speaking"}
                </p>
                
                <div className="inline-flex items-center justify-center">
                  <button 
                    className={`h-20 w-20 rounded-full flex items-center justify-center transition-all ${
                      isRecording 
                        ? 'bg-red-500 animate-pulse' 
                        : 'bg-primary hover:bg-primary/90'
                    }`}
                    onClick={handleStartRecording}
                  >
                    <Mic className="h-8 w-8 text-white" />
                  </button>
                </div>
                
                {isRecording && (
                  <div className="mt-4">
                    <div className="flex items-end justify-center space-x-1 h-12">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div 
                          key={i}
                          className="w-1.5 bg-primary/80 rounded-sm animate-wave"
                          style={{ 
                            height: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.1}s`
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  className="mr-2"
                  onClick={handleCancelVoiceSearch}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => setShowVoiceSearch(false)}
                  disabled={!isRecording}
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Content Type Tabs */}
        <section className="mb-8">
          <Tabs defaultValue="all">
            <TabsList className="bg-muted/40 p-1 w-full justify-start">
              <TabsTrigger value="all" className="text-sm">
                <Globe className="h-4 w-4 mr-2" />
                All
              </TabsTrigger>
              <TabsTrigger value="music" className="text-sm">
                <Music className="h-4 w-4 mr-2" />
                Music
              </TabsTrigger>
              <TabsTrigger value="radio" className="text-sm">
                <Radio className="h-4 w-4 mr-2" />
                Radio
              </TabsTrigger>
              <TabsTrigger value="podcasts" className="text-sm">
                <Podcast className="h-4 w-4 mr-2" />
                Podcasts
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </section>
        
        {/* AI Recommendations */}
        <section className="mb-8">
          <AIRecommendation onSelectTrack={handlePlayTrack} />
        </section>
        
        {/* Top Picks */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-primary" />
              AI Top Picks For You
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {mockTracks.map((track) => (
              <TrackCard 
                key={track.id} 
                track={track}
                onPlay={handlePlayTrack}
                isPlaying={currentTrackId === track.id}
                isCurrentTrack={currentTrackId === track.id}
              />
            ))}
          </div>
        </section>
        
        {/* Currently Playing */}
        {currentTrackId && (
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Currently Playing</h2>
            
            <Card className="bg-secondary border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center space-x-6">
                  <div className="relative h-20 w-20 rounded-lg overflow-hidden">
                    <img 
                      src={currentTrack?.cover} 
                      alt={currentTrack?.title} 
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-10 w-10"
                        onClick={() => handlePlayTrack(currentTrack?.id as string)}
                      >
                        {true ? (
                          <PauseCircle className="h-10 w-10 text-white" />
                        ) : (
                          <PlayCircle className="h-10 w-10 text-white" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold">{currentTrack?.title}</h3>
                    <p className="text-gray-400">{currentTrack?.artist}</p>
                    
                    <div className="flex items-center mt-2">
                      <div className="w-full music-progress h-2">
                        <div className="music-progress-filled" style={{ width: '45%' }}></div>
                      </div>
                      <span className="ml-2 text-xs text-gray-400">1:45 / 3:45</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Similar tracks based on your listening:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {mockTracks.slice(0, 3).map((track) => (
                      <div 
                        key={track.id}
                        className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted/50 cursor-pointer"
                        onClick={() => handlePlayTrack(track.id)}
                      >
                        <img 
                          src={track.cover} 
                          alt={track.title} 
                          className="h-12 w-12 rounded object-cover"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate">{track.title}</p>
                          <p className="text-xs text-gray-400 truncate">{track.artist}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}
      </main>
      
      {/* Music Player */}
      <MusicPlayer 
        currentTrack={currentTrack ? {
          id: currentTrack.id,
          title: currentTrack.title,
          artist: currentTrack.artist,
          cover: currentTrack.cover,
          audioUrl: '/sample-audio.mp3', // In a real app, this would be the actual URL
          chain: currentTrack.chain,
        } : undefined}
      />
    </div>
  );
};

export default AIDiscovery;
