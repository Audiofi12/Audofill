import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import MusicPlayer from '@/components/MusicPlayer';
import TrackCard from '@/components/TrackCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Search, 
  Music, 
  Disc, 
  User, 
  Heart, 
  TrendingUp, 
  BarChart3, 
  Play, 
  ListMusic, 
  Radio,
  MoveHorizontal,
  Check,
  Sparkles,
  Zap
} from 'lucide-react';
import { toast } from "sonner";

interface Track {
  id: string;
  title: string;
  artist: string;
  cover: string;
  plays: number;
  duration: string;
  chain: string;
  createdAt: string;
  genre?: string;
  marketCap?: string;
  stakers?: number;
  roi?: string;
  totalStaked?: string;
}

interface AIRecommendation {
  id: string;
  name: string;
  description: string;
  tracks: Track[];
  match: number;
  icon: React.ReactNode;
}

const AIDiscovery = () => {
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [likedRecommendations, setLikedRecommendations] = useState<string[]>([]);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [activePreferences, setActivePreferences] = useState<string[]>(['Hip-Hop', 'Ethereum', 'High Energy']);
  
  const allGenres = ['Hip-Hop', 'Electronic', 'Lo-Fi', 'Classical', 'Reggae', 'R&B', 'Instrumental'];
  const allChains = ['Ethereum', 'Polygon', 'Binance', 'Nero'];
  const allMoods = ['High Energy', 'Chill', 'Focus', 'Party', 'Workout', 'Relax'];
  
  const mockTracks: Track[] = [
    {
      id: '1',
      title: 'Crypto Harmony',
      artist: 'BlockBeats',
      cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&q=80',
      plays: 127850,
      duration: '3:42',
      chain: 'Ethereum',
      createdAt: '2023-04-10',
      genre: 'Hip-Hop',
      marketCap: '$1.2M',
      stakers: 342,
      roi: '+18.5%',
      totalStaked: '45,000 AFI'
    },
    {
      id: '2',
      title: 'NFT Dreams',
      artist: 'Digital Nomad',
      cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419cd86?w=500&h=500&q=80',
      plays: 98432,
      duration: '4:15',
      chain: 'Ethereum',
      createdAt: '2023-04-12',
      genre: 'Electronic',
      marketCap: '$850K',
      stakers: 215,
      roi: '+12.3%',
      totalStaked: '28,000 AFI'
    },
    {
      id: '3',
      title: 'DeFi Groove',
      artist: 'Cyber Symphony',
      cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&q=80',
      plays: 76129,
      duration: '3:58',
      chain: 'Polygon',
      createdAt: '2023-04-15',
      genre: 'Hip-Hop',
      marketCap: '$620K',
      stakers: 187,
      roi: '+9.7%',
      totalStaked: '23,400 AFI'
    },
    {
      id: '4',
      title: 'Chain Reaction',
      artist: 'Binance Beats',
      cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=500&q=80',
      plays: 54398,
      duration: '3:21',
      chain: 'Binance',
      createdAt: '2023-04-18',
      genre: 'Reggae',
      marketCap: '$520K',
      stakers: 134,
      roi: '+7.8%',
      totalStaked: '19,300 AFI'
    },
    {
      id: '5',
      title: 'Nero Nightline',
      artist: 'The Miners',
      cover: 'https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?w=500&h=500&q=80',
      plays: 42167,
      duration: '5:03',
      chain: 'Nero',
      createdAt: '2023-04-20',
      genre: 'Lo-Fi',
      marketCap: '$410K',
      stakers: 98,
      roi: '+6.2%',
      totalStaked: '15,700 AFI'
    },
    {
      id: '6',
      title: 'Metaverse Melody',
      artist: 'TokenTunes',
      cover: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=500&h=500&q=80',
      plays: 31945,
      duration: '3:36',
      chain: 'Ethereum',
      createdAt: '2023-04-22',
      genre: 'Classical',
      marketCap: '$380K',
      stakers: 87,
      roi: '+5.4%',
      totalStaked: '12,800 AFI'
    },
    {
      id: '7',
      title: 'Blockchain Beats',
      artist: 'CryptoRhythm',
      cover: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500&h=500&q=80',
      plays: 28762,
      duration: '4:27',
      chain: 'Polygon',
      createdAt: '2023-04-24',
      genre: 'R&B',
      marketCap: '$325K',
      stakers: 76,
      roi: '+4.9%',
      totalStaked: '11,500 AFI'
    },
    {
      id: '8',
      title: 'Decentralized Vibes',
      artist: 'Web3Waves',
      cover: 'https://images.unsplash.com/photo-1425342605259-25d80e320565?w=500&h=500&q=80',
      plays: 19543,
      duration: '3:52',
      chain: 'Nero',
      createdAt: '2023-04-26',
      genre: 'Instrumental',
      marketCap: '$275K',
      stakers: 58,
      roi: '+3.8%',
      totalStaked: '9,200 AFI'
    },
    {
      id: '9',
      title: 'Token Trance',
      artist: 'Digital Nomad',
      cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419cd86?w=500&h=500&q=80',
      plays: 43256,
      duration: '4:47',
      chain: 'Ethereum',
      createdAt: '2023-05-01',
      genre: 'Electronic',
      marketCap: '$390K',
      stakers: 98,
      roi: '+8.1%',
      totalStaked: '16,500 AFI'
    },
    {
      id: '10',
      title: 'Smart Contract',
      artist: 'BlockBeats',
      cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&q=80',
      plays: 67890,
      duration: '3:18',
      chain: 'Ethereum',
      createdAt: '2023-05-05',
      genre: 'Hip-Hop',
      marketCap: '$580K',
      stakers: 156,
      roi: '+10.3%',
      totalStaked: '21,300 AFI'
    },
    {
      id: '11',
      title: 'Polygon Patterns',
      artist: 'Cyber Symphony',
      cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&q=80',
      plays: 34567,
      duration: '4:23',
      chain: 'Polygon',
      createdAt: '2023-05-10',
      genre: 'Electronic',
      marketCap: '$320K',
      stakers: 78,
      roi: '+6.7%',
      totalStaked: '14,200 AFI'
    },
    {
      id: '12',
      title: 'Reggae Chain',
      artist: 'Binance Beats',
      cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=500&q=80',
      plays: 29876,
      duration: '5:12',
      chain: 'Binance',
      createdAt: '2023-05-15',
      genre: 'Reggae',
      marketCap: '$290K',
      stakers: 65,
      roi: '+5.9%',
      totalStaked: '11,900 AFI'
    }
  ];
  
  const aiRecommendations: AIRecommendation[] = [
    {
      id: '1',
      name: 'Your Personalized Mix',
      description: 'Tracks selected based on your listening history and preferences',
      match: 98,
      icon: <User className="h-5 w-5 text-primary" />,
      tracks: mockTracks.filter(t => t.id === '1' || t.id === '3' || t.id === '5' || t.id === '10')
    },
    {
      id: '2',
      name: 'Trending on Your Chains',
      description: 'Popular tracks from chains you listen to most',
      match: 92,
      icon: <TrendingUp className="h-5 w-5 text-primary" />,
      tracks: mockTracks.filter(t => t.id === '2' || t.id === '4' || t.id === '9' || t.id === '11')
    },
    {
      id: '3',
      name: 'Similar to "Crypto Harmony"',
      description: 'If you liked Crypto Harmony, you\'ll love these tracks',
      match: 95,
      icon: <Music className="h-5 w-5 text-primary" />,
      tracks: mockTracks.filter(t => t.id === '3' || t.id === '10' || t.id === '11' || t.id === '6')
    },
    {
      id: '4',
      name: 'Discover Across Chains',
      description: 'Expand your listening across different blockchains',
      match: 88,
      icon: <MoveHorizontal className="h-5 w-5 text-primary" />,
      tracks: mockTracks.filter(t => t.id === '4' || t.id === '5' || t.id === '7' || t.id === '12')
    },
    {
      id: '5',
      name: 'Hip-Hop Essentials',
      description: 'The best hip-hop tracks across all chains',
      match: 96,
      icon: <Disc className="h-5 w-5 text-primary" />,
      tracks: mockTracks.filter(t => t.genre === 'Hip-Hop')
    },
    {
      id: '6',
      name: 'Chill Vibes',
      description: 'Perfect for relaxing and unwinding',
      match: 90,
      icon: <Heart className="h-5 w-5 text-primary" />,
      tracks: mockTracks.filter(t => t.id === '5' || t.id === '8' || t.id === '6' || t.id === '7')
    }
  ];
  
  const currentTrack = currentTrackId 
    ? mockTracks.find(track => track.id === currentTrackId) 
    : null;

  const handlePlayTrack = (trackId: string) => {
    setCurrentTrackId(trackId);
  };

  const handleGenerateRecommendations = () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          toast.success("New recommendations generated!");
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const toggleLikeRecommendation = (id: string) => {
    if (likedRecommendations.includes(id)) {
      setLikedRecommendations(likedRecommendations.filter(recId => recId !== id));
    } else {
      setLikedRecommendations([...likedRecommendations, id]);
    }
  };

  const togglePreference = (preference: string) => {
    if (activePreferences.includes(preference)) {
      setActivePreferences(activePreferences.filter(p => p !== preference));
    } else {
      setActivePreferences([...activePreferences, preference]);
    }
  };

  const filteredRecommendations = aiRecommendations.filter(rec => {
    if (searchQuery && !rec.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !rec.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    const hasMatchingTrack = rec.tracks.some(track => {
      const matchesGenre = track.genre && activePreferences.includes(track.genre);
      const matchesChain = activePreferences.includes(track.chain);
      
      if (activePreferences.length === 0) return true;
      
      return matchesGenre || matchesChain;
    });
    
    return hasMatchingTrack;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGenerating(true);
      
      const interval = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsGenerating(false);
            return 100;
          }
          return prev + 20;
        });
      }, 200);
      
      return () => clearInterval(interval);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-24">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <section className="mb-8">
          <div className="rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 mix-blend-overlay"></div>
            <div className="audio-gradient backdrop-blur-sm py-10 px-6 md:px-12">
              <div className="max-w-3xl">
                <div className="flex items-center mb-2">
                  <Sparkles className="h-6 w-6 mr-2 text-primary" />
                  <h1 className="text-3xl font-bold">
                    <span className="gradient-text">AI Music Discovery</span>
                  </h1>
                </div>
                <p className="text-lg mb-6 text-gray-200">
                  Our AI analyzes listening patterns across chains to recommend music you'll love. Discover new artists and tracks tailored to your preferences.
                </p>
                
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    placeholder="Search for recommendations or describe the music you want..." 
                    className="pl-10 h-12 bg-background/60 border-gray-700 text-white placeholder:text-gray-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
          <div className="space-y-6">
            <Card className="border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-primary" />
                  Preferences
                </CardTitle>
                <CardDescription>
                  Customize your AI recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {allGenres.map(genre => (
                      <Badge 
                        key={genre}
                        variant={activePreferences.includes(genre) ? "default" : "outline"}
                        className={`cursor-pointer ${activePreferences.includes(genre) ? 'bg-primary/20 text-primary hover:bg-primary/30' : 'hover:bg-secondary/80'}`}
                        onClick={() => togglePreference(genre)}
                      >
                        {activePreferences.includes(genre) && <Check className="h-3 w-3 mr-1" />}
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Chains</h3>
                  <div className="flex flex-wrap gap-2">
                    {allChains.map(chain => (
                      <Badge 
                        key={chain}
                        variant={activePreferences.includes(chain) ? "default" : "outline"}
                        className={`cursor-pointer ${activePreferences.includes(chain) ? 'bg-primary/20 text-primary hover:bg-primary/30' : 'hover:bg-secondary/80'}`}
                        onClick={() => togglePreference(chain)}
                      >
                        {activePreferences.includes(chain) && <Check className="h-3 w-3 mr-1" />}
                        {chain}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Mood</h3>
                  <div className="flex flex-wrap gap-2">
                    {allMoods.map(mood => (
                      <Badge 
                        key={mood}
                        variant={activePreferences.includes(mood) ? "default" : "outline"}
                        className={`cursor-pointer ${activePreferences.includes(mood) ? 'bg-primary/20 text-primary hover:bg-primary/30' : 'hover:bg-secondary/80'}`}
                        onClick={() => togglePreference(mood)}
                      >
                        {activePreferences.includes(mood) && <Check className="h-3 w-3 mr-1" />}
                        {mood}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={handleGenerateRecommendations}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Recommendations
                    </>
                  )}
                </Button>
                
                {isGenerating && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Analyzing preferences</span>
                      <span>{generationProgress}%</span>
                    </div>
                    <Progress value={generationProgress} className="h-1" />
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ListMusic className="h-5 w-5 mr-2 text-primary" />
                  Recent Discoveries
                </CardTitle>
                <CardDescription>
                  Tracks you've recently discovered
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[250px]">
                  <div className="p-4 space-y-3">
                    {mockTracks.slice(0, 5).map((track) => (
                      <div 
                        key={track.id}
                        className="flex items-center space-x-3 p-2 rounded-md hover:bg-secondary/50 transition-colors cursor-pointer"
                        onClick={() => handlePlayTrack(track.id)}
                      >
                        <div className="relative h-10 w-10 rounded overflow-hidden">
                          <img src={track.cover} alt={track.title} className="h-full w-full object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                            <Play className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium truncate">{track.title}</div>
                          <div className="text-xs text-gray-400 truncate">{track.artist}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
            
            <Card className="border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Radio className="h-5 w-5 mr-2 text-primary" />
                  Radio Stations
                </CardTitle>
                <CardDescription>
                  AI-curated radio stations
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="p-4 space-y-3">
                  {['Deep Focus', 'Hip-Hop Essentials', 'Electronic Vibes', 'Cross-Chain Mix'].map((station, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-secondary/50 transition-colors cursor-pointer"
                      onClick={() => toast.success(`Starting ${station} radio station!`)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded bg-primary/20 flex items-center justify-center">
                          <Radio className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">{station}</div>
                          <div className="text-xs text-gray-400">Based on your preferences</div>
                        </div>
                      </div>
                      <Play className="h-4 w-4" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-8">
            <Tabs defaultValue="forYou">
              <TabsList className="mb-6">
                <TabsTrigger value="forYou">For You</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="newReleases">New Releases</TabsTrigger>
                <TabsTrigger value="crossChain">Cross-Chain</TabsTrigger>
              </TabsList>
              
              <TabsContent value="forYou" className="space-y-6">
                {isGenerating ? (
                  <div className="space-y-8">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Skeleton className="h-6 w-48" />
                          <Skeleton className="h-5 w-16" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {[1, 2, 3, 4].map((track) => (
                            <div key={track} className="space-y-3">
                              <Skeleton className="h-48 w-full rounded-md" />
                              <Skeleton className="h-4 w-full" />
                              <Skeleton className="h-3 w-2/3" />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {filteredRecommendations.length > 0 ? (
                      filteredRecommendations.map((recommendation) => (
                        <div key={recommendation.id} className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 rounded-full bg-primary/20">
                                {recommendation.icon}
                              </div>
                              <div>
                                <h3 className="text-lg font-medium">{recommendation.name}</h3>
                                <p className="text-sm text-gray-400">{recommendation.description}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <Badge className="bg-green-500/20 text-green-400 border-0">
                                {recommendation.match}% Match
                              </Badge>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className={likedRecommendations.includes(recommendation.id) ? 'text-primary' : 'text-gray-400'}
                                onClick={() => toggleLikeRecommendation(recommendation.id)}
                              >
                                <Heart className={`h-5 w-5 ${likedRecommendations.includes(recommendation.id) ? 'fill-primary' : ''}`} />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {recommendation.tracks.map((track) => (
                              <TrackCard 
                                key={track.id} 
                                track={track}
                                onPlay={handlePlayTrack}
                                isPlaying={currentTrackId === track.id}
                                isCurrentTrack={currentTrackId === track.id}
                              />
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <Disc className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                        <h3 className="text-xl font-medium mb-2">No matching recommendations</h3>
                        <p className="text-gray-400 mb-6">Try adjusting your preferences or search terms</p>
                        <Button onClick={() => setActivePreferences([])}>
                          Clear All Filters
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
              
              <TabsContent value="trending" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                    Trending Across All Chains
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {mockTracks.slice(0, 4).map((track) => (
                      <TrackCard 
                        key={track.id} 
                        track={track}
                        onPlay={handlePlayTrack}
                        isPlaying={currentTrackId === track.id}
                        isCurrentTrack={currentTrackId === track.id}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                    Rising on Ethereum
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {mockTracks.filter(t => t.chain === 'Ethereum').slice(0, 4).map((track) => (
                      <TrackCard 
                        key={track.id} 
                        track={track}
                        onPlay={handlePlayTrack}
                        isPlaying={currentTrackId === track.id}
                        isCurrentTrack={currentTrackId === track.id}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="newReleases" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center">
                    <Disc className="h-5 w-5 mr-2 text-primary" />
                    Latest Releases
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {mockTracks.slice(8, 12).map((track) => (
                      <TrackCard 
                        key={track.id} 
                        track={track}
                        onPlay={handlePlayTrack}
                        isPlaying={currentTrackId === track.id}
                        isCurrentTrack={currentTrackId === track.id}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="crossChain" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center">
                    <MoveHorizontal className="h-5 w-5 mr-2 text-primary" />
                    Cross-Chain Discoveries
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {['Ethereum → Polygon', 'Binance → Nero', 'Polygon → Ethereum', 'Nero → Binance'].map((crossing, index) => (
                      <Card key={index} className="border-gray-800">
                        <CardHeader>
                          <CardTitle className="text-base">{crossing}</CardTitle>
                          <CardDescription>Similar tracks across different chains</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                          <div className="p-4 space-y-3">
                            {mockTracks.slice(index*2, index*2+2).map((track) => (
                              <div 
                                key={track.id}
                                className="flex items-center space-x-3 p-2 rounded-md hover:bg-secondary/50 transition-colors cursor-pointer"
                                onClick={() => handlePlayTrack(track.id)}
                              >
                                <div className="relative h-10 w-10 rounded overflow-hidden">
                                  <img src={track.cover} alt={track.title} className="h-full w-full object-cover" />
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                                    <Play className="h-5 w-5 text-white" />
                                  </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-sm font-medium truncate">{track.title}</div>
                                  <div className="text-xs text-gray-400 truncate">{track.artist}</div>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {track.chain}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <MusicPlayer 
        currentTrack={currentTrackId && currentTrack ? {
          id: currentTrack.id,
          title: currentTrack.title,
          artist: currentTrack.artist,
          cover: currentTrack.cover,
          audioUrl: '/sample-audio.mp3',
          chain: currentTrack.chain,
          genre: currentTrack.genre,
          marketCap: currentTrack.marketCap,
          stakers: currentTrack.stakers,
          roi: currentTrack.roi,
          totalStaked: currentTrack.totalStaked
        } : undefined}
      />
    </div>
  );
};

export default AIDiscovery;
