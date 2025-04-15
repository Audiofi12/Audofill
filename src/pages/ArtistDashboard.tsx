
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import MusicPlayer from '@/components/MusicPlayer';
import AudioUploader from '@/components/AudioUploader';
import TrackCard from '@/components/TrackCard';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Music, 
  Users, 
  BarChart3, 
  Disc, 
  ListMusic, 
  Upload, 
  Globe,
  DollarSign,
  Wallet,
  AreaChart
} from 'lucide-react';

const ArtistDashboard = () => {
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  
  // Sample artist data
  const artistData = {
    name: 'Your Artist Name',
    followers: 1245,
    tracks: 12,
    totalPlays: 48562,
    totalRoyalties: 234.56,
    profileImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200'
  };
  
  // Sample tracks data
  const artistTracks = [
    {
      id: '1',
      title: 'Blockchain Beats',
      artist: 'Your Artist Name',
      cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&h=500&q=80',
      plays: 15632,
      duration: '3:42',
      chain: 'Ethereum',
      createdAt: '2023-04-10',
      royalties: {
        total: '45.32 ETH',
        chains: [
          { name: 'Ethereum', amount: '32.15 ETH' },
          { name: 'Polygon', amount: '13.17 MATIC' }
        ]
      }
    },
    {
      id: '2',
      title: 'NFT Groove',
      artist: 'Your Artist Name',
      cover: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=500&h=500&q=80',
      plays: 9845,
      duration: '4:15',
      chain: 'Polygon',
      createdAt: '2023-04-15',
      royalties: {
        total: '28.91 MATIC',
        chains: [
          { name: 'Polygon', amount: '28.91 MATIC' }
        ]
      }
    },
    {
      id: '3',
      title: 'Crypto Riff',
      artist: 'Your Artist Name',
      cover: 'https://images.unsplash.com/photo-1485579149621-3123dd979885?w=500&h=500&q=80',
      plays: 7432,
      duration: '3:21',
      chain: 'Solana',
      createdAt: '2023-04-20',
      royalties: {
        total: '18.45 SOL',
        chains: [
          { name: 'Solana', amount: '18.45 SOL' }
        ]
      }
    },
    {
      id: '4',
      title: 'Web3 Vibes',
      artist: 'Your Artist Name',
      cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&q=80',
      plays: 5897,
      duration: '2:58',
      chain: 'Binance',
      createdAt: '2023-04-25',
      royalties: {
        total: '15.23 BNB',
        chains: [
          { name: 'Binance', amount: '15.23 BNB' }
        ]
      }
    },
    {
      id: '5',
      title: 'Chain Melody',
      artist: 'Your Artist Name',
      cover: 'https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?w=500&h=500&q=80',
      plays: 4269,
      duration: '3:36',
      chain: 'Nero',
      createdAt: '2023-04-30',
      royalties: {
        total: '9.78 NERO',
        chains: [
          { name: 'Nero', amount: '9.78 NERO' }
        ]
      }
    }
  ];
  
  const currentTrack = currentTrackId 
    ? artistTracks.find(track => track.id === currentTrackId) 
    : undefined;

  const handlePlayTrack = (trackId: string) => {
    setCurrentTrackId(trackId);
  };

  // Chart data - in a real app this would be dynamic
  const chartData = [
    { date: 'Jan', plays: 1200, royalties: 18 },
    { date: 'Feb', plays: 1900, royalties: 28 },
    { date: 'Mar', plays: 3000, royalties: 45 },
    { date: 'Apr', plays: 2780, royalties: 42 },
    { date: 'May', plays: 4890, royalties: 73 },
    { date: 'Jun', plays: 3390, royalties: 51 }
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        {/* Artist Header */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 bg-secondary rounded-xl border border-gray-800">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-800">
              <img 
                src={artistData.profileImage} 
                alt={artistData.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold mb-2">{artistData.name}</h1>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                <div className="flex items-center space-x-1 text-gray-400">
                  <Music className="h-4 w-4" />
                  <span>{artistData.tracks} tracks</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-400">
                  <Users className="h-4 w-4" />
                  <span>{artistData.followers.toLocaleString()} followers</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-400">
                  <BarChart3 className="h-4 w-4" />
                  <span>{artistData.totalPlays.toLocaleString()} plays</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-400">
                  <DollarSign className="h-4 w-4" />
                  <span>${artistData.totalRoyalties.toLocaleString()} earned</span>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <div className="px-3 py-1 bg-[#6c7ae0]/20 rounded-full text-xs flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[#6c7ae0] mr-1"></span>
                  Ethereum
                </div>
                <div className="px-3 py-1 bg-[#14f195]/20 rounded-full text-xs flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[#14f195] mr-1"></span>
                  Solana
                </div>
                <div className="px-3 py-1 bg-[#8247e5]/20 rounded-full text-xs flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[#8247e5] mr-1"></span>
                  Polygon
                </div>
                <div className="px-3 py-1 bg-[#f3ba2f]/20 rounded-full text-xs flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[#f3ba2f] mr-1"></span>
                  Binance
                </div>
                <div className="px-3 py-1 bg-[#ff6b6b]/20 rounded-full text-xs flex items-center">
                  <span className="w-2 h-2 rounded-full bg-[#ff6b6b] mr-1"></span>
                  Nero
                </div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <Button className="bg-primary hover:bg-primary/90">
                <Upload className="h-4 w-4 mr-2" />
                Upload Track
              </Button>
              <Button variant="outline">
                <Globe className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </section>
        
        {/* Dashboard Stats */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-secondary border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Plays</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-2 bg-primary/20 p-2 rounded-full">
                    <BarChart3 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{artistData.totalPlays.toLocaleString()}</div>
                    <div className="text-xs text-green-400">+12% from last month</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Royalties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-2 bg-primary/20 p-2 rounded-full">
                    <DollarSign className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">${artistData.totalRoyalties.toLocaleString()}</div>
                    <div className="text-xs text-green-400">+8% from last month</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">NFTs Minted</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-2 bg-primary/20 p-2 rounded-full">
                    <Disc className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{artistData.tracks}</div>
                    <div className="text-xs text-gray-400">Across {5} chains</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Wallet Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-2 bg-primary/20 p-2 rounded-full">
                    <Wallet className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">$142.58</div>
                    <div className="text-xs text-gray-400">Connect more wallets</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Performance Chart */}
        <section className="mb-8">
          <Card className="bg-secondary border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Performance Overview</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="text-xs">Plays</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-accent"></div>
                    <span className="text-xs">Royalties ($)</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-72 flex items-center justify-center text-gray-500">
                <AreaChart className="h-12 w-12" />
                <span className="ml-2">Chart visualization would appear here</span>
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* Dashboard Tabs */}
        <section className="mb-8">
          <Tabs defaultValue="tracks">
            <TabsList className="bg-muted/40 p-1 mb-6">
              <TabsTrigger value="tracks" className="text-sm">
                <Music className="h-4 w-4 mr-2" />
                My Tracks
              </TabsTrigger>
              <TabsTrigger value="upload" className="text-sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload New
              </TabsTrigger>
              <TabsTrigger value="playlists" className="text-sm">
                <ListMusic className="h-4 w-4 mr-2" />
                Playlists
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="tracks">
              <div className="bg-secondary rounded-xl border border-gray-800 p-6">
                <h3 className="text-lg font-medium mb-4">Your Tracks</h3>
                
                <div className="space-y-2">
                  {artistTracks.map((track, index) => (
                    <TrackCard 
                      key={track.id} 
                      track={track}
                      index={index}
                      compact={true}
                      onPlay={handlePlayTrack}
                      isPlaying={currentTrackId === track.id}
                      isCurrentTrack={currentTrackId === track.id}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="upload">
              <AudioUploader />
            </TabsContent>
            
            <TabsContent value="playlists">
              <div className="bg-secondary rounded-xl border border-gray-800 p-6 text-center">
                <ListMusic className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                <h3 className="text-lg font-medium mb-2">No Playlists Yet</h3>
                <p className="text-sm text-gray-400 mb-4">Create playlists to organize your tracks and share with your fans</p>
                <Button>
                  <ListMusic className="h-4 w-4 mr-2" />
                  Create Playlist
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </section>
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

export default ArtistDashboard;
