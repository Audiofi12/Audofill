
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import MusicPlayer from '@/components/MusicPlayer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Radio, 
  Play, 
  Pause, 
  Users, 
  BarChart3, 
  TrendingUp, 
  Coins, 
  Volume2, 
  Heart, 
  ChevronRight,
  Filter,
  Clock,
  Music
} from 'lucide-react';
import { toast } from "sonner";

interface RadioStation {
  id: string;
  name: string;
  image: string;
  description: string;
  listeners: number;
  genre: string;
  chain: string;
  currentTrack: {
    title: string;
    artist: string;
    cover: string;
  };
  tokenPrice: string;
  marketCap: string;
  roi: string;
  stakedAmount: string;
  stakers: number;
}

const RadioPage = () => {
  const [activeStation, setActiveStation] = useState<string | null>(null);
  const [showStakeDialog, setShowStakeDialog] = useState(false);
  const [stakeAmount, setStakeAmount] = useState("100");
  const [activeGenre, setActiveGenre] = useState("all");
  const [activeChain, setActiveChain] = useState("all");
  const [userStakedRadios, setUserStakedRadios] = useState<Record<string, number>>({});
  
  // Mock radio stations
  const radioStations: RadioStation[] = [
    {
      id: '1',
      name: 'Crypto Beats FM',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419568d?w=500&h=500&q=80',
      description: 'The hottest beats from Ethereum artists. Non-stop music 24/7.',
      listeners: 1478,
      genre: 'Hip-Hop',
      chain: 'Ethereum',
      currentTrack: {
        title: 'Chain Reaction',
        artist: 'BlockBeats',
        cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&q=80',
      },
      tokenPrice: '$0.58',
      marketCap: '$3.4M',
      roi: '+24.5%',
      stakedAmount: '125,000 AFI',
      stakers: 876
    },
    {
      id: '2',
      name: 'PolyRadio',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&h=500&q=80',
      description: 'Music curated for the Polygon ecosystem. Discover new artists daily.',
      listeners: 983,
      genre: 'Electronic',
      chain: 'Polygon',
      currentTrack: {
        title: 'Digital Dreams',
        artist: 'CyberSymphony',
        cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&q=80',
      },
      tokenPrice: '$0.42',
      marketCap: '$2.8M',
      roi: '+18.7%',
      stakedAmount: '98,000 AFI',
      stakers: 645
    },
    {
      id: '3',
      name: 'Binance Beats',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&h=500&q=80',
      description: 'The sound of Binance Chain. All your favorite BNB artists in one place.',
      listeners: 756,
      genre: 'Reggae',
      chain: 'Binance',
      currentTrack: {
        title: 'Chain Links',
        artist: 'TokenTunes',
        cover: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=500&h=500&q=80',
      },
      tokenPrice: '$0.39',
      marketCap: '$2.1M',
      roi: '+15.2%',
      stakedAmount: '85,000 AFI',
      stakers: 512
    },
    {
      id: '4',
      name: 'Nero Nights',
      image: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=500&h=500&q=80',
      description: 'Late night vibes on the Nero blockchain. Chill and relax with the best lo-fi.',
      listeners: 624,
      genre: 'Lo-Fi',
      chain: 'Nero',
      currentTrack: {
        title: 'Midnight Chain',
        artist: 'The Miners',
        cover: 'https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?w=500&h=500&q=80',
      },
      tokenPrice: '$0.32',
      marketCap: '$1.7M',
      roi: '+12.8%',
      stakedAmount: '72,000 AFI',
      stakers: 423
    },
    {
      id: '5',
      name: 'Classical Chain',
      image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=500&h=500&q=80',
      description: 'The finest classical music from across all blockchains. Timeless pieces reimagined.',
      listeners: 532,
      genre: 'Classical',
      chain: 'Ethereum',
      currentTrack: {
        title: 'Blockchain Symphony',
        artist: 'Crypto Philharmonic',
        cover: 'https://images.unsplash.com/photo-1425342605259-25d80e320565?w=500&h=500&q=80',
      },
      tokenPrice: '$0.35',
      marketCap: '$1.9M',
      roi: '+14.2%',
      stakedAmount: '78,000 AFI',
      stakers: 467
    },
    {
      id: '6',
      name: 'R&B Chains',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&h=500&q=80',
      description: 'Smooth R&B tracks from artists across multiple chains. Perfect evening vibes.',
      listeners: 489,
      genre: 'R&B',
      chain: 'Polygon',
      currentTrack: {
        title: 'Token Love',
        artist: 'CryptoRhythm',
        cover: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500&h=500&q=80',
      },
      tokenPrice: '$0.31',
      marketCap: '$1.6M',
      roi: '+11.5%',
      stakedAmount: '65,000 AFI',
      stakers: 389
    },
    {
      id: '7',
      name: 'Hip-Hop Blocks',
      image: 'https://images.unsplash.com/photo-1493676304190-35d0509efce7?w=500&h=500&q=80',
      description: 'The best in blockchain hip-hop. Fresh beats from emerging Web3 artists.',
      listeners: 743,
      genre: 'Hip-Hop',
      chain: 'Binance',
      currentTrack: {
        title: 'NFT Flow',
        artist: 'Digital Nomad',
        cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419cd86?w=500&h=500&q=80',
      },
      tokenPrice: '$0.44',
      marketCap: '$2.3M',
      roi: '+16.9%',
      stakedAmount: '92,000 AFI',
      stakers: 578
    },
    {
      id: '8',
      name: 'Instrumental Chains',
      image: 'https://images.unsplash.com/photo-1520166012956-add9ba0835a5?w=500&h=500&q=80',
      description: 'Pure instrumental music with no lyrics. Focus and concentrate with blockchain backing.',
      listeners: 612,
      genre: 'Instrumental',
      chain: 'Nero',
      currentTrack: {
        title: 'Blockchain Ballad',
        artist: 'TokenTunes',
        cover: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=500&h=500&q=80',
      },
      tokenPrice: '$0.38',
      marketCap: '$2.0M',
      roi: '+15.1%',
      stakedAmount: '82,000 AFI',
      stakers: 498
    },
    {
      id: '9',
      name: 'Electronic Chain',
      image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=500&h=500&q=80',
      description: 'Electronic dance music from DJs across all blockchains. Keep the party going.',
      listeners: 876,
      genre: 'Electronic',
      chain: 'Ethereum',
      currentTrack: {
        title: 'Crypto Rave',
        artist: 'Binance Beats',
        cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=500&q=80',
      },
      tokenPrice: '$0.49',
      marketCap: '$2.6M',
      roi: '+19.8%',
      stakedAmount: '102,000 AFI',
      stakers: 723
    },
    {
      id: '10',
      name: 'Reggae Blocks',
      image: 'https://images.unsplash.com/photo-1526142514275-16eaae0a0157?w=500&h=500&q=80',
      description: 'Chill reggae vibes powered by blockchain technology. Relax and enjoy.',
      listeners: 421,
      genre: 'Reggae',
      chain: 'Polygon',
      currentTrack: {
        title: 'One Chain',
        artist: 'Web3Waves',
        cover: 'https://images.unsplash.com/photo-1425342605259-25d80e320565?w=500&h=500&q=80',
      },
      tokenPrice: '$0.30',
      marketCap: '$1.5M',
      roi: '+10.4%',
      stakedAmount: '62,000 AFI',
      stakers: 356
    }
  ];
  
  const currentStation = activeStation 
    ? radioStations.find(station => station.id === activeStation) 
    : null;
  
  const filteredStations = radioStations.filter(station => {
    if (activeGenre !== 'all' && station.genre !== activeGenre) return false;
    if (activeChain !== 'all' && station.chain !== activeChain) return false;
    return true;
  });
  
  const genres = [...new Set(radioStations.map(station => station.genre))];
  const chains = [...new Set(radioStations.map(station => station.chain))];

  const handlePlay = (stationId: string) => {
    setActiveStation(stationId);
    toast.success(`Now playing: ${radioStations.find(s => s.id === stationId)?.name}`);
  };

  const handleStake = (stationId: string) => {
    // Store the station id to use in the stake dialog
    setActiveStation(stationId);
    setShowStakeDialog(true);
  };

  const handleStakeSubmit = () => {
    if (!activeStation) return;
    
    // Simulate staking
    const amount = parseInt(stakeAmount);
    setUserStakedRadios({
      ...userStakedRadios,
      [activeStation]: (userStakedRadios[activeStation] || 0) + amount
    });
    
    toast.success(`Staked ${stakeAmount} AFI on ${currentStation?.name}!`);
    setShowStakeDialog(false);
    setStakeAmount("100");
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 mix-blend-overlay"></div>
            <div className="audio-gradient backdrop-blur-sm py-10 px-6 md:px-12">
              <div className="max-w-3xl">
                <div className="flex items-center mb-2">
                  <Radio className="h-6 w-6 mr-2 text-primary" />
                  <h1 className="text-3xl font-bold">
                    <span className="gradient-text">Cross-Chain Radio</span>
                  </h1>
                </div>
                <p className="text-lg mb-6 text-gray-200">
                  Listen to curated streams from across the blockchain ecosystem. Discover new artists, earn rewards, and stake on your favorite stations.
                </p>
                
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={() => handlePlay('1')}>
                    <Play className="mr-2 h-5 w-5" />
                    Start Listening
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => handleStake('1')}>
                    <Coins className="mr-2 h-5 w-5" />
                    Stake on Radio
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Currently Playing */}
        {currentStation && (
          <section className="mb-8">
            <Card className="border-gray-800 bg-secondary/60">
              <CardHeader>
                <CardTitle>Now Playing</CardTitle>
                <CardDescription>
                  Streaming on {currentStation.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <div className="aspect-square rounded-lg overflow-hidden">
                      <img src={currentStation.image} alt={currentStation.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-medium">{currentStation.name}</h3>
                        <p className="text-gray-400">{currentStation.description}</p>
                        
                        <div className="flex items-center mt-2 space-x-2">
                          <Badge variant="outline" className="bg-secondary">
                            {currentStation.genre}
                          </Badge>
                          <Badge variant="outline" className="bg-secondary">
                            {currentStation.chain}
                          </Badge>
                          <Badge variant="outline" className="bg-secondary flex items-center">
                            <Users className="h-3 w-3 mr-1" /> {formatNumber(currentStation.listeners)}
                          </Badge>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-full h-10 w-10 bg-primary text-white hover:bg-primary/90 border-0"
                        onClick={() => setActiveStation(null)}
                      >
                        <Pause className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-background/40 rounded-lg">
                      <div className="h-12 w-12 rounded overflow-hidden">
                        <img src={currentStation.currentTrack.cover} alt={currentStation.currentTrack.title} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{currentStation.currentTrack.title}</div>
                        <div className="text-xs text-gray-400">{currentStation.currentTrack.artist}</div>
                      </div>
                      <div className="flex items-center ml-auto">
                        <Clock className="h-3 w-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-400">2:45 / 3:58</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                      <div className="bg-muted/50 p-2 rounded-md">
                        <div className="text-xs text-gray-400">Token Price</div>
                        <div className="font-medium">{currentStation.tokenPrice}</div>
                      </div>
                      <div className="bg-muted/50 p-2 rounded-md">
                        <div className="text-xs text-gray-400">Market Cap</div>
                        <div className="font-medium">{currentStation.marketCap}</div>
                      </div>
                      <div className="bg-muted/50 p-2 rounded-md">
                        <div className="text-xs text-gray-400">ROI (30d)</div>
                        <div className="font-medium text-green-400">{currentStation.roi}</div>
                      </div>
                      <div className="bg-muted/50 p-2 rounded-md">
                        <div className="text-xs text-gray-400">Total Staked</div>
                        <div className="font-medium">{currentStation.stakedAmount}</div>
                      </div>
                    </div>
                    
                    {userStakedRadios[currentStation.id] ? (
                      <div className="mt-4 bg-primary/10 p-3 rounded-lg border border-primary/20">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-sm font-medium">Your Stake</div>
                            <div className="text-lg font-bold">{userStakedRadios[currentStation.id]} AFI</div>
                          </div>
                          <Button size="sm" onClick={() => handleStake(currentStation.id)}>
                            <Coins className="mr-1 h-4 w-4" />
                            Add More
                          </Button>
                        </div>
                        <div className="mt-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Your share</span>
                            <span>
                              {((userStakedRadios[currentStation.id] / parseInt(currentStation.stakedAmount.replace(/[^0-9]/g, ''))) * 100).toFixed(4)}%
                            </span>
                          </div>
                          <Progress 
                            value={(userStakedRadios[currentStation.id] / parseInt(currentStation.stakedAmount.replace(/[^0-9]/g, ''))) * 100} 
                            className="h-1.5" 
                          />
                        </div>
                      </div>
                    ) : (
                      <Button className="mt-4" onClick={() => handleStake(currentStation.id)}>
                        <Coins className="mr-2 h-4 w-4" />
                        Stake on This Station
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}
        
        {/* Radio Stations */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-1">Radio Stations</h2>
              <p className="text-sm text-gray-400">Discover curated music stations from across the blockchain</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Filter className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <select 
                  className="bg-muted border-gray-800 pl-10 pr-3 py-2 rounded-md text-sm focus:ring-primary focus:border-primary"
                  value={activeGenre}
                  onChange={(e) => setActiveGenre(e.target.value)}
                >
                  <option value="all">All Genres</option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>
              
              <div className="relative">
                <Filter className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <select 
                  className="bg-muted border-gray-800 pl-10 pr-3 py-2 rounded-md text-sm focus:ring-primary focus:border-primary"
                  value={activeChain}
                  onChange={(e) => setActiveChain(e.target.value)}
                >
                  <option value="all">All Chains</option>
                  {chains.map((chain) => (
                    <option key={chain} value={chain}>{chain}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredStations.map((station) => (
              <Card key={station.id} className="border-gray-800 bg-secondary/60 hover:bg-secondary/80 transition-colors">
                <CardContent className="p-0">
                  <div className="aspect-[3/1] overflow-hidden relative">
                    <img src={station.image} alt={station.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                    <div className="absolute bottom-3 left-3">
                      <Badge variant="outline" className="bg-secondary/80 border-0">
                        {station.genre}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <Badge variant="outline" className="bg-secondary/80 border-0">
                        {station.chain}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{station.name}</h3>
                        <p className="text-xs text-gray-400 line-clamp-2">{station.description}</p>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className={`rounded-full h-8 w-8 ${activeStation === station.id ? 'bg-primary text-white' : 'bg-muted text-foreground'}`}
                        onClick={() => handlePlay(station.id)}
                      >
                        {activeStation === station.id ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      <Users className="h-3.5 w-3.5 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-400">{formatNumber(station.listeners)} listeners</span>
                      
                      <div className="mx-2 h-1 w-1 rounded-full bg-gray-600"></div>
                      
                      <Music className="h-3.5 w-3.5 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-400">Now Playing</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-2 bg-background/40 rounded-md mb-3">
                      <div className="h-8 w-8 rounded overflow-hidden">
                        <img src={station.currentTrack.cover} alt={station.currentTrack.title} className="h-full w-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-xs truncate">{station.currentTrack.title}</div>
                        <div className="text-xs text-gray-400 truncate">{station.currentTrack.artist}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-3 text-center">
                      <div className="bg-muted/50 p-2 rounded-md">
                        <div className="text-xs text-gray-400">Token Price</div>
                        <div className="font-medium text-sm">{station.tokenPrice}</div>
                      </div>
                      <div className="bg-muted/50 p-2 rounded-md">
                        <div className="text-xs text-gray-400">ROI (30d)</div>
                        <div className="font-medium text-sm text-green-400">{station.roi}</div>
                      </div>
                    </div>
                    
                    {userStakedRadios[station.id] ? (
                      <div className="flex justify-between items-center bg-primary/10 p-2 rounded-md border border-primary/20">
                        <div className="text-xs">
                          <span className="text-gray-400">Your Stake: </span>
                          <span className="font-medium">{userStakedRadios[station.id]} AFI</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => handleStake(station.id)}>
                          <Coins className="mr-1 h-3 w-3" />
                          Add More
                        </Button>
                      </div>
                    ) : (
                      <Button className="w-full" size="sm" onClick={() => handleStake(station.id)}>
                        <Coins className="mr-1 h-4 w-4" />
                        Stake ({station.stakers} stakers)
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Radio Staking */}
        <section className="mb-8">
          <div className="bg-secondary rounded-xl border border-gray-800 p-6">
            <div className="flex items-center mb-4">
              <Coins className="h-5 w-5 mr-2 text-primary" />
              <h2 className="text-xl font-bold">Radio Staking</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-400 mb-4">
                  Stake AudioFi tokens on your favorite radio stations to earn a share of streaming rewards and help curate content.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-sm font-medium mb-1">How Radio Staking Works</div>
                    <p className="text-xs text-gray-400">
                      When you stake on a radio station, you receive a portion of the streaming rewards generated by that station. Stations with more listeners and stakers tend to generate higher returns.
                    </p>
                  </div>
                  
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-sm font-medium mb-1">Your Voting Rights</div>
                    <p className="text-xs text-gray-400">
                      Staking gives you voting rights to influence the station's playlist and curation. The more you stake, the more influence you have over the station's direction.
                    </p>
                  </div>
                  
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="text-sm font-medium mb-1">Rewards Distribution</div>
                    <p className="text-xs text-gray-400">
                      Rewards are distributed daily based on listener engagement and total staked amount. Higher listener counts lead to more rewards for all stakers.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-muted/30 rounded-lg p-4 border border-gray-800">
                  <h3 className="font-medium mb-3">Your Radio Staking Portfolio</h3>
                  
                  {Object.keys(userStakedRadios).length > 0 ? (
                    <div className="space-y-3">
                      {Object.entries(userStakedRadios).map(([stationId, amount]) => {
                        const station = radioStations.find(s => s.id === stationId);
                        if (!station) return null;
                        
                        return (
                          <div key={stationId} className="flex items-center justify-between p-2 bg-background/40 rounded-md">
                            <div className="flex items-center space-x-2">
                              <div className="h-8 w-8 rounded overflow-hidden">
                                <img src={station.image} alt={station.name} className="h-full w-full object-cover" />
                              </div>
                              <div>
                                <div className="text-sm font-medium">{station.name}</div>
                                <div className="text-xs text-gray-400">{station.chain}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">{amount} AFI</div>
                              <div className="text-xs text-green-400">{station.roi}</div>
                            </div>
                          </div>
                        );
                      })}
                      
                      <div className="pt-3 border-t border-gray-800">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Total Staked</span>
                          <span className="text-sm font-medium">
                            {Object.values(userStakedRadios).reduce((a, b) => a + b, 0)} AFI
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Estimated Daily Yield</span>
                          <span className="text-sm font-medium text-green-400">
                            +{(Object.values(userStakedRadios).reduce((a, b) => a + b, 0) * 0.0015).toFixed(2)} AFI
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Radio className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                      <p className="text-gray-400 mb-3">You haven't staked on any radio stations yet</p>
                      <Button>
                        <Coins className="mr-2 h-4 w-4" />
                        Start Staking
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Staking Dialog */}
      <Dialog open={showStakeDialog} onOpenChange={setShowStakeDialog}>
        <DialogContent className="bg-background border-gray-800">
          <DialogHeader>
            <DialogTitle>Stake on Radio Station</DialogTitle>
            <DialogDescription>
              Stake your AudioFi tokens to earn streaming rewards
            </DialogDescription>
          </DialogHeader>
          
          {currentStation && (
            <div className="space-y-4 mt-2">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded overflow-hidden">
                  <img src={currentStation.image} alt={currentStation.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="font-medium">{currentStation.name}</h3>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs bg-secondary">
                      {currentStation.genre}
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-secondary">
                      <Users className="h-3 w-3 mr-1" />
                      {formatNumber(currentStation.listeners)}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/50 p-2 rounded-md">
                  <div className="text-xs text-gray-400">ROI (30d)</div>
                  <div className="font-medium text-green-400">{currentStation.roi}</div>
                </div>
                <div className="bg-muted/50 p-2 rounded-md">
                  <div className="text-xs text-gray-400">Total Staked</div>
                  <div className="font-medium">{currentStation.stakedAmount}</div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <div className="text-sm font-medium">Stake Amount (AFI)</div>
                  <div className="text-sm text-gray-400">Balance: 2,500 AFI</div>
                </div>
                
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    className="bg-muted"
                  />
                  <Button variant="outline" size="sm" className="whitespace-nowrap" onClick={() => setStakeAmount("100")}>
                    Min
                  </Button>
                  <Button variant="outline" size="sm" className="whitespace-nowrap" onClick={() => setStakeAmount("2500")}>
                    Max
                  </Button>
                </div>
              </div>
              
              <div className="bg-muted/50 p-3 rounded-md">
                <div className="text-sm font-medium mb-1">Estimated Returns</div>
                <div className="text-xs text-gray-400 mb-2">
                  Based on current listener count and token performance
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-gray-400">Daily</div>
                    <div className="text-sm text-green-400">+{(parseInt(stakeAmount) * 0.0015).toFixed(2)} AFI</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Monthly</div>
                    <div className="text-sm text-green-400">+{(parseInt(stakeAmount) * 0.0015 * 30).toFixed(2)} AFI</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">APR</div>
                    <div className="text-sm text-green-400">~54.75%</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Your Share</div>
                    <div className="text-sm">
                      {((parseInt(stakeAmount) / parseInt(currentStation.stakedAmount.replace(/[^0-9]/g, ''))) * 100).toFixed(4)}%
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <Button className="w-full" onClick={handleStakeSubmit}>
                  <Coins className="mr-2 h-4 w-4" />
                  Stake {stakeAmount} AFI
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Music Player (empty for Radio page since radio plays in-page) */}
      <MusicPlayer />
    </div>
  );
};

export default RadioPage;
