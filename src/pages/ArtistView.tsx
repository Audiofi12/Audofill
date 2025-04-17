
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import MusicPlayer from '@/components/MusicPlayer';
import TrackCard from '@/components/TrackCard';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Music, 
  BarChart3, 
  Users, 
  Heart, 
  Share2, 
  Clock,
  TrendingUp,
  Coins,
  Play,
  Pause,
  ChevronRight,
  Globe,
  Filter,
  Shield,
  CheckCircle
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { toast } from "sonner";

interface ArtistData {
  id: string;
  name: string;
  image: string;
  banner: string;
  bio: string;
  followers: number;
  tracks: number;
  verified: boolean;
  chains: string[];
  totalEarnings: string;
  audiofiBalance: string;
  marketCap: string;
  tokenPrice: string;
  distribution: {
    name: string;
    percentage: number;
    color: string;
  }[];
  topTracks: {
    id: string;
    title: string;
    cover: string;
    plays: number;
    duration: string;
    chain: string;
    createdAt: string;
    marketCap: string;
    stakers: number;
    roi: string;
    totalStaked: string;
    genre: string;
  }[];
  earningsHistory: {
    date: string;
    amount: number;
  }[];
  listenersHistory: {
    date: string;
    listeners: number;
  }[];
}

const ArtistView = () => {
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [currentArtist, setCurrentArtist] = useState<string>('1');
  
  const artists: ArtistData[] = [
    {
      id: '1',
      name: 'BlockBeats',
      image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&q=80',
      banner: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=300&q=80',
      bio: 'Pioneering the fusion of blockchain and hip-hop. BlockBeats creates music that spans across multiple chains with a focus on beats that resonate with the crypto community.',
      followers: 24389,
      tracks: 32,
      verified: true,
      chains: ['Ethereum', 'Polygon', 'Nero'],
      totalEarnings: '345,678 AFI',
      audiofiBalance: '145,890 AFI',
      marketCap: '$2.4M',
      tokenPrice: '$0.78',
      distribution: [
        { name: 'Ethereum', percentage: 45, color: '#6c7ae0' },
        { name: 'Polygon', percentage: 30, color: '#8247e5' },
        { name: 'Nero', percentage: 25, color: '#ff6b6b' }
      ],
      topTracks: [
        {
          id: '1',
          title: 'Crypto Harmony',
          cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&q=80',
          plays: 127850,
          duration: '3:42',
          chain: 'Ethereum',
          createdAt: '2023-04-10',
          marketCap: '$1.2M',
          stakers: 342,
          roi: '+18.5%',
          totalStaked: '45,000 AFI',
          genre: 'Hip-Hop'
        },
        {
          id: '2',
          title: 'Chain Reaction',
          cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=500&q=80',
          plays: 98432,
          duration: '3:21',
          chain: 'Polygon',
          createdAt: '2023-04-15',
          marketCap: '$850K',
          stakers: 215,
          roi: '+14.3%',
          totalStaked: '32,000 AFI',
          genre: 'Hip-Hop'
        },
        {
          id: '3',
          title: 'Digital Gold',
          cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&q=80',
          plays: 76129,
          duration: '4:05',
          chain: 'Nero',
          createdAt: '2023-04-18',
          marketCap: '$620K',
          stakers: 187,
          roi: '+12.7%',
          totalStaked: '28,400 AFI',
          genre: 'Hip-Hop'
        },
        {
          id: '4',
          title: 'Web3 State of Mind',
          cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419cd86?w=500&h=500&q=80',
          plays: 65430,
          duration: '3:58',
          chain: 'Ethereum',
          createdAt: '2023-04-22',
          marketCap: '$520K',
          stakers: 154,
          roi: '+10.8%',
          totalStaked: '22,300 AFI',
          genre: 'Hip-Hop'
        }
      ],
      earningsHistory: [
        { date: 'Jan', amount: 18500 },
        { date: 'Feb', amount: 22340 },
        { date: 'Mar', amount: 26780 },
        { date: 'Apr', amount: 32450 },
        { date: 'May', amount: 38670 },
        { date: 'Jun', amount: 42380 },
        { date: 'Jul', amount: 48920 },
        { date: 'Aug', amount: 54670 },
        { date: 'Sep', amount: 58340 },
        { date: 'Oct', amount: 62780 },
        { date: 'Nov', amount: 68540 },
        { date: 'Dec', amount: 74320 }
      ],
      listenersHistory: [
        { date: 'Jan', listeners: 5650 },
        { date: 'Feb', listeners: 6780 },
        { date: 'Mar', listeners: 7890 },
        { date: 'Apr', listeners: 8920 },
        { date: 'May', listeners: 10340 },
        { date: 'Jun', listeners: 12450 },
        { date: 'Jul', listeners: 14780 },
        { date: 'Aug', listeners: 16890 },
        { date: 'Sep', listeners: 18340 },
        { date: 'Oct', listeners: 20120 },
        { date: 'Nov', listeners: 22340 },
        { date: 'Dec', listeners: 24389 }
      ]
    },
    {
      id: '2',
      name: 'Digital Nomad',
      image: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=400&h=400&q=80',
      banner: 'https://images.unsplash.com/photo-1511379938547-c1f69419cd86?w=1200&h=300&q=80',
      bio: 'Digital Nomad produces electronic music influenced by global sounds. Their tracks are distributed primarily on Ethereum and Polygon chains, reaching audiences across the world.',
      followers: 18756,
      tracks: 24,
      verified: true,
      chains: ['Ethereum', 'Polygon'],
      totalEarnings: '267,590 AFI',
      audiofiBalance: '98,450 AFI',
      marketCap: '$1.8M',
      tokenPrice: '$0.65',
      distribution: [
        { name: 'Ethereum', percentage: 65, color: '#6c7ae0' },
        { name: 'Polygon', percentage: 35, color: '#8247e5' }
      ],
      topTracks: [
        {
          id: '5',
          title: 'NFT Dreams',
          cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419cd86?w=500&h=500&q=80',
          plays: 98432,
          duration: '4:15',
          chain: 'Ethereum',
          createdAt: '2023-04-12',
          marketCap: '$780K',
          stakers: 198,
          roi: '+16.3%',
          totalStaked: '28,000 AFI',
          genre: 'Electronic'
        },
        {
          id: '6',
          title: 'Decentralized',
          cover: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=500&h=500&q=80',
          plays: 87654,
          duration: '3:32',
          chain: 'Polygon',
          createdAt: '2023-04-16',
          marketCap: '$720K',
          stakers: 176,
          roi: '+15.1%',
          totalStaked: '26,300 AFI',
          genre: 'Electronic'
        },
        {
          id: '7',
          title: 'Metaverse Journey',
          cover: 'https://images.unsplash.com/photo-1425342605259-25d80e320565?w=500&h=500&q=80',
          plays: 65432,
          duration: '5:08',
          chain: 'Ethereum',
          createdAt: '2023-04-20',
          marketCap: '$580K',
          stakers: 154,
          roi: '+13.7%',
          totalStaked: '22,800 AFI',
          genre: 'Electronic'
        },
        {
          id: '8',
          title: 'Token Economy',
          cover: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500&h=500&q=80',
          plays: 54321,
          duration: '3:45',
          chain: 'Polygon',
          createdAt: '2023-04-25',
          marketCap: '$450K',
          stakers: 132,
          roi: '+11.2%',
          totalStaked: '19,500 AFI',
          genre: 'Electronic'
        }
      ],
      earningsHistory: [
        { date: 'Jan', amount: 12450 },
        { date: 'Feb', amount: 15780 },
        { date: 'Mar', amount: 18930 },
        { date: 'Apr', amount: 22450 },
        { date: 'May', amount: 25670 },
        { date: 'Jun', amount: 29380 },
        { date: 'Jul', amount: 32920 },
        { date: 'Aug', amount: 36670 },
        { date: 'Sep', amount: 40340 },
        { date: 'Oct', amount: 43780 },
        { date: 'Nov', amount: 47540 },
        { date: 'Dec', amount: 52320 }
      ],
      listenersHistory: [
        { date: 'Jan', listeners: 3250 },
        { date: 'Feb', listeners: 4780 },
        { date: 'Mar', listeners: 5890 },
        { date: 'Apr', listeners: 7920 },
        { date: 'May', listeners: 9340 },
        { date: 'Jun', listeners: 10450 },
        { date: 'Jul', listeners: 12780 },
        { date: 'Aug', listeners: 14190 },
        { date: 'Sep', listeners: 15340 },
        { date: 'Oct', listeners: 16120 },
        { date: 'Nov', listeners: 17340 },
        { date: 'Dec', listeners: 18756 }
      ]
    }
  ];
  
  const selectedArtist = artists.find(artist => artist.id === currentArtist) || artists[0];
  const currentTrack = currentTrackId 
    ? selectedArtist.topTracks.find(track => track.id === currentTrackId) 
    : null;

  const handlePlayTrack = (trackId: string) => {
    setCurrentTrackId(trackId);
  };

  const handleFollowArtist = () => {
    toast.success(`You are now following ${selectedArtist.name}!`);
  };

  const handleShareArtist = () => {
    toast.success(`Artist profile link copied to clipboard!`);
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Navbar />
      
      <main>
        {/* Artist Banner */}
        <div className="relative h-48 md:h-64">
          <img 
            src={selectedArtist.banner} 
            alt={`${selectedArtist.name} banner`} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
        </div>
        
        <div className="container mx-auto px-4 -mt-16">
          {/* Artist Header */}
          <section className="mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              <div className="h-32 w-32 rounded-xl overflow-hidden border-4 border-background z-10">
                <img 
                  src={selectedArtist.image} 
                  alt={selectedArtist.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h1 className="text-3xl font-bold">{selectedArtist.name}</h1>
                  {selectedArtist.verified && (
                    <Badge className="bg-primary text-white">
                      <CheckCircle className="h-3.5 w-3.5 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center space-x-4 mt-2 text-gray-400">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{formatNumber(selectedArtist.followers)} followers</span>
                  </div>
                  <div className="flex items-center">
                    <Music className="h-4 w-4 mr-1" />
                    <span>{selectedArtist.tracks} tracks</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-1" />
                    <span>{selectedArtist.chains.join(', ')}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-4 md:mt-0">
                <Button onClick={handleFollowArtist}>
                  <Users className="mr-2 h-4 w-4" />
                  Follow
                </Button>
                <Button variant="outline" onClick={handleShareArtist}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </section>
          
          {/* Artist Overview */}
          <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="border-gray-800">
                  <CardHeader>
                    <CardTitle>Artist Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 mb-6">{selectedArtist.bio}</p>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="bg-secondary p-3 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">Total Earnings</div>
                        <div className="flex items-center">
                          <Coins className="h-4 w-4 text-primary mr-1" />
                          <span className="font-medium">{selectedArtist.totalEarnings}</span>
                        </div>
                      </div>
                      
                      <div className="bg-secondary p-3 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">AudioFi Balance</div>
                        <div className="flex items-center">
                          <Coins className="h-4 w-4 text-primary mr-1" />
                          <span className="font-medium">{selectedArtist.audiofiBalance}</span>
                        </div>
                      </div>
                      
                      <div className="bg-secondary p-3 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">Token Price</div>
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                          <span className="font-medium">{selectedArtist.tokenPrice}</span>
                        </div>
                      </div>
                      
                      <div className="bg-secondary p-3 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">Market Cap</div>
                        <div className="flex items-center">
                          <BarChart3 className="h-4 w-4 text-primary mr-1" />
                          <span className="font-medium">{selectedArtist.marketCap}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="border-gray-800 h-full">
                  <CardHeader>
                    <CardTitle>Chain Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center">
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={selectedArtist.distribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="percentage"
                            label={({ name, percentage }) => `${name}: ${percentage}%`}
                            labelLine={false}
                          >
                            {selectedArtist.distribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `${value}%`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                      {selectedArtist.distribution.map((chain) => (
                        <div key={chain.name} className="flex items-center">
                          <div 
                            className="h-3 w-3 rounded-full mr-1" 
                            style={{ backgroundColor: chain.color }}
                          ></div>
                          <span className="text-xs">{chain.name}: {chain.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          
          {/* Analytics Tabs */}
          <section className="mb-8">
            <Tabs defaultValue="earnings">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="earnings">Earnings Analytics</TabsTrigger>
                <TabsTrigger value="listeners">Listener Growth</TabsTrigger>
              </TabsList>
              
              <TabsContent value="earnings">
                <Card className="border-gray-800">
                  <CardHeader>
                    <CardTitle>Earnings Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={selectedArtist.earningsHistory}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="date" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip 
                            formatter={(value) => [`${value.toLocaleString()} AFI`, 'Earnings']}
                            contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="amount" 
                            stroke="#8B5CF6" 
                            fill="#8B5CF6" 
                            fillOpacity={0.2} 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                      <div className="bg-secondary p-3 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">Monthly Avg</div>
                        <div className="font-medium">
                          {Math.round(selectedArtist.earningsHistory.reduce((acc, curr) => acc + curr.amount, 0) / 12).toLocaleString()} AFI
                        </div>
                      </div>
                      
                      <div className="bg-secondary p-3 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">Yearly Total</div>
                        <div className="font-medium">
                          {selectedArtist.earningsHistory.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()} AFI
                        </div>
                      </div>
                      
                      <div className="bg-secondary p-3 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">Growth (YoY)</div>
                        <div className="font-medium text-green-400">+42.8%</div>
                      </div>
                      
                      <div className="bg-secondary p-3 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">Top Chain</div>
                        <div className="font-medium">
                          {selectedArtist.distribution[0].name} ({selectedArtist.distribution[0].percentage}%)
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="listeners">
                <Card className="border-gray-800">
                  <CardHeader>
                    <CardTitle>Listener Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={selectedArtist.listenersHistory}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="date" stroke="#9CA3AF" />
                          <YAxis stroke="#9CA3AF" />
                          <Tooltip 
                            formatter={(value) => [`${value.toLocaleString()}`, 'Listeners']}
                            contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="listeners" 
                            stroke="#0EA5E9" 
                            fill="#0EA5E9" 
                            fillOpacity={0.2} 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                      <div className="bg-secondary p-3 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">Total Followers</div>
                        <div className="font-medium">{formatNumber(selectedArtist.followers)}</div>
                      </div>
                      
                      <div className="bg-secondary p-3 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">Monthly Growth</div>
                        <div className="font-medium text-green-400">+9.4%</div>
                      </div>
                      
                      <div className="bg-secondary p-3 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">Avg. Daily Listens</div>
                        <div className="font-medium">8,523</div>
                      </div>
                      
                      <div className="bg-secondary p-3 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">Engagement Rate</div>
                        <div className="font-medium">12.7%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>
          
          {/* Top Tracks */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Top Tracks</h2>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Filter className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <select className="bg-muted border-gray-800 pl-10 pr-3 py-2 rounded-md text-sm focus:ring-primary focus:border-primary">
                    <option>All Chains</option>
                    {selectedArtist.chains.map((chain) => (
                      <option key={chain}>{chain}</option>
                    ))}
                  </select>
                </div>
                <Button variant="outline" size="sm">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-1">
              {selectedArtist.topTracks.map((track, index) => (
                <div 
                  key={track.id}
                  className="flex items-center p-3 rounded-md transition-colors hover:bg-secondary group"
                >
                  <div className="flex items-center flex-1 min-w-0">
                    <div className="w-8 text-center text-gray-400 mr-2">
                      {index + 1}
                    </div>
                    
                    <div className="relative h-12 w-12 rounded overflow-hidden mr-3">
                      <img src={track.cover} alt={track.title} className="h-full w-full object-cover" />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute inset-0 h-full w-full bg-black/40 opacity-0 group-hover:opacity-100 rounded-none"
                        onClick={() => handlePlayTrack(track.id)}
                      >
                        {currentTrackId === track.id ? (
                          <Pause className="h-5 w-5 text-white" />
                        ) : (
                          <Play className="h-5 w-5 text-white ml-0.5" />
                        )}
                      </Button>
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <div className="font-medium truncate">{track.title}</div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs bg-muted">
                          {track.chain}
                        </Badge>
                        <span className="text-xs text-gray-400">
                          {formatNumber(track.plays)} plays
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-xs text-gray-400">Market Cap</div>
                      <div className="font-medium">{track.marketCap}</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-xs text-gray-400">ROI</div>
                      <div className="font-medium text-green-400">{track.roi}</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-xs text-gray-400">Stakers</div>
                      <div className="font-medium">{formatNumber(track.stakers)}</div>
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="whitespace-nowrap text-xs h-8"
                      onClick={() => handlePlayTrack(track.id)}
                    >
                      <Coins className="h-3.5 w-3.5 mr-1.5" />
                      Stake
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Artist Selection */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Other Featured Artists</h2>
            <div className="flex overflow-x-auto space-x-4 pb-4">
              {artists.map((artist) => (
                <div 
                  key={artist.id}
                  onClick={() => setCurrentArtist(artist.id)}
                  className={`flex-shrink-0 cursor-pointer transition-transform hover:scale-105 ${currentArtist === artist.id ? 'ring-2 ring-primary' : ''}`}
                >
                  <div className="h-24 w-24 rounded-full overflow-hidden mb-2">
                    <img 
                      src={artist.image} 
                      alt={artist.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-sm">{artist.name}</div>
                    <div className="text-xs text-gray-400">{formatNumber(artist.followers)} followers</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      
      {/* Music Player */}
      <MusicPlayer 
        currentTrack={currentTrackId && currentTrack ? {
          id: currentTrack.id,
          title: currentTrack.title,
          artist: selectedArtist.name,
          cover: currentTrack.cover,
          audioUrl: '/sample-audio.mp3', // In a real app, this would be the actual URL
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

export default ArtistView;
