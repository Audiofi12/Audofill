import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import MusicPlayer from '@/components/MusicPlayer';
import TrackCard from '@/components/TrackCard';
import ArtistCard from '@/components/ArtistCard';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';
import { 
  Music, 
  Headphones, 
  BarChart3, 
  Globe, 
  ArrowRight,
  ChevronRight,
  Disc,
  Radio
} from 'lucide-react';

const Index = () => {
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  
  const mockTracks = [
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
      totalStaked: '45,000 AFI',
      audioUrl: '/audio/t1.mp3'
    },
    {
      id: '2',
      title: 'NFT Dreams',
      artist: 'Digital Nomad',
      cover: '/nft.jpg',
      plays: 98432,
      duration: '4:15',
      chain: 'Polygon',
      createdAt: '2023-04-12',
      genre: 'Instrumental',
      marketCap: '$850K',
      stakers: 215,
      roi: '+12.3%',
      totalStaked: '28,000 AFI',
      audioUrl: '/audio/t2.mp3'
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
      genre: 'Electronic',
      marketCap: '$620K',
      stakers: 187,
      roi: '+9.7%',
      totalStaked: '23,400 AFI',
      audioUrl: '/audio/t3.mp3'
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
      totalStaked: '19,300 AFI',
      audioUrl: '/audio/t4.mp3'
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
      totalStaked: '15,700 AFI',
      audioUrl: '/audio/tone.mp3'
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
      genre: 'Hip-Hop',
      marketCap: '$380K',
      stakers: 87,
      roi: '+5.4%',
      totalStaked: '12,800 AFI',
      audioUrl: '/audio/t5.mp3'
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
      totalStaked: '11,500 AFI',
      audioUrl: '/audio/t6.mp3'
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
      genre: 'Classical',
      marketCap: '$275K',
      stakers: 58,
      roi: '+3.8%',
      totalStaked: '9,200 AFI',
      audioUrl: '/audio/t7.mp3'
    }
  ];
  
  const mockArtists = [
    {
      id: '1',
      name: 'BlockBeats',
      image: '/nft.jpg',
      followers: 24389,
      tracks: 32,
      verified: true,
      chains: ['Ethereum', 'Polygon', 'Nero'],
      distribution: [
        { name: 'Ethereum', percentage: 45 },
        { name: 'Polygon', percentage: 30 },
        { name: 'Nero', percentage: 25 }
      ]
    },
    {
      id: '2',
      name: 'Digital Nomad',
      image: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=400&h=400&q=80',
      followers: 18756,
      tracks: 24,
      verified: true,
      chains: ['Solana', 'Ethereum'],
      distribution: [
        { name: 'Solana', percentage: 70 },
        { name: 'Ethereum', percentage: 30 }
      ]
    },
    {
      id: '3',
      name: 'Cyber Symphony',
      image: '/cyber.jpg',
      followers: 12543,
      tracks: 18,
      verified: false,
      chains: ['Polygon', 'Binance'],
      distribution: [
        { name: 'Polygon', percentage: 60 },
        { name: 'Binance', percentage: 40 }
      ]
    },
    {
      id: '4',
      name: 'Binance Beats',
      image: 'https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=400&h=400&q=80',
      followers: 9875,
      tracks: 15,
      verified: true,
      chains: ['Binance', 'Ethereum', 'Nero'],
      distribution: [
        { name: 'Binance', percentage: 50 },
        { name: 'Ethereum', percentage: 25 },
        { name: 'Nero', percentage: 25 }
      ]
    }
  ];
  
  const currentTrack = currentTrackId 
    ? mockTracks.find(track => track.id === currentTrackId) 
    : mockTracks[0];

  const handlePlayTrack = (trackId: string) => {
    setCurrentTrackId(trackId);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 mix-blend-overlay"></div>
            <div className="audio-gradient backdrop-blur-sm py-12 md:py-16 px-6 md:px-12">
              <div className="max-w-3xl">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="gradient-text">Cross-Chain Audio</span> for Everyone
                </h1>
                <p className="text-lg md:text-xl mb-6 text-gray-200">
                  Discover, stream, and earn from music across multiple blockchains. 
                  Your new favorite artists are waiting to be discovered.
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <Headphones className="mr-2 h-5 w-5" />
                    Start Listening
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/artist-dashboard">
                      <Music className="mr-2 h-5 w-5" />
                      Upload Music
                    </Link>
                  </Button>
                </div>
                <div className="flex items-center mt-8 space-x-2">
                  <span className="text-sm">Supported chains:</span>
                  <div className="flex space-x-2">
                    <div className="px-2 py-1 bg-[#6c7ae0]/20 rounded-full text-xs">Ethereum</div>
                    <div className="px-2 py-1 bg-[#8247e5]/20 rounded-full text-xs">Polygon</div>
                    <div className="px-2 py-1 bg-[#f3ba2f]/20 rounded-full text-xs">Binance</div>
                    <div className="px-2 py-1 bg-[#ff6b6b]/20 rounded-full text-xs">Nero</div>
                  </div>
                </div>
                <div className="flex items-center mt-4 space-x-2">
                  <span className="text-sm">Music genres:</span>
                  <div className="flex flex-wrap gap-2">
                    <div className="px-2 py-1 bg-primary/20 rounded-full text-xs">Hip-Hop</div>
                    <div className="px-2 py-1 bg-primary/20 rounded-full text-xs">Instrumental</div>
                    <div className="px-2 py-1 bg-primary/20 rounded-full text-xs">Reggae</div>
                    <div className="px-2 py-1 bg-primary/20 rounded-full text-xs">R&B</div>
                    <div className="px-2 py-1 bg-primary/20 rounded-full text-xs">Electronic</div>
                    <div className="px-2 py-1 bg-primary/20 rounded-full text-xs">Classical</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Trending Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">Trending Tracks</h2>
              <p className="text-sm text-gray-400">Top music across all chains</p>
            </div>
            <Button variant="ghost" size="sm" className="text-primary">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="bg-muted/40 p-1">
              <TabsTrigger value="all" className="text-sm">All Chains</TabsTrigger>
              <TabsTrigger value="ethereum" className="text-sm">Ethereum</TabsTrigger>
              <TabsTrigger value="polygon" className="text-sm">Polygon</TabsTrigger>
              <TabsTrigger value="binance" className="text-sm">Binance</TabsTrigger>
              <TabsTrigger value="nero" className="text-sm">Nero</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
            </TabsContent>
            
            <TabsContent value="ethereum" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {mockTracks
                  .filter(track => track.chain === 'Ethereum')
                  .map((track) => (
                    <TrackCard 
                      key={track.id} 
                      track={track}
                      onPlay={handlePlayTrack}
                      isPlaying={currentTrackId === track.id}
                      isCurrentTrack={currentTrackId === track.id}
                    />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="polygon" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {mockTracks
                  .filter(track => track.chain === 'Polygon')
                  .map((track) => (
                    <TrackCard 
                      key={track.id} 
                      track={track}
                      onPlay={handlePlayTrack}
                      isPlaying={currentTrackId === track.id}
                      isCurrentTrack={currentTrackId === track.id}
                    />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="binance" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {mockTracks
                  .filter(track => track.chain === 'Binance')
                  .map((track) => (
                    <TrackCard 
                      key={track.id} 
                      track={track}
                      onPlay={handlePlayTrack}
                      isPlaying={currentTrackId === track.id}
                      isCurrentTrack={currentTrackId === track.id}
                    />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="nero" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {mockTracks
                  .filter(track => track.chain === 'Nero')
                  .map((track) => (
                    <TrackCard 
                      key={track.id} 
                      track={track}
                      onPlay={handlePlayTrack}
                      isPlaying={currentTrackId === track.id}
                      isCurrentTrack={currentTrackId === track.id}
                    />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
        
        {/* Featured Artists */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">Featured Artists</h2>
              <p className="text-sm text-gray-400">Creators distributing across chains</p>
            </div>
            <Button variant="ghost" size="sm" className="text-primary" asChild>
              <Link to="/artist-view">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {mockArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </section>
        
        {/* Platform Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Why AudioFi?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-secondary rounded-xl p-6 border border-gray-800">
              <div className="rounded-full bg-primary/20 w-12 h-12 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Cross-Chain Distribution</h3>
              <p className="text-sm text-gray-400">
                Break free from platform silos. Distribute your music across multiple blockchains with just one upload.
              </p>
              <div className="mt-4">
                <Link to="/artist-dashboard" className="text-primary text-sm flex items-center">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="bg-secondary rounded-xl p-6 border border-gray-800">
              <div className="rounded-full bg-primary/20 w-12 h-12 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Multi-Chain Royalties</h3>
              <p className="text-sm text-gray-400">
                Earn royalties in multiple crypto assets based on where your content is consumed. Maximize your earnings.
              </p>
              <div className="mt-4">
                <Link to="/artist-dashboard" className="text-primary text-sm flex items-center">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="bg-secondary rounded-xl p-6 border border-gray-800">
              <div className="rounded-full bg-primary/20 w-12 h-12 flex items-center justify-center mb-4">
                <Headphones className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Listener Rewards</h3>
              <p className="text-sm text-gray-400">
                Get rewarded for your listening habits. Earn tokens and exclusive content by supporting your favorite artists.
              </p>
              <div className="mt-4">
                <Link to="/listener-farming" className="text-primary text-sm flex items-center">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Discovery Section */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 bg-secondary rounded-xl p-6 border border-gray-800">
              <div className="flex items-center mb-4">
                <Disc className="h-6 w-6 text-primary mr-2" />
                <h3 className="text-lg font-medium">AI Audio Discovery</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Our AI analyzes listening patterns across chains to suggest new music you'll love, surfacing viral content from every blockchain.
              </p>
              <Button asChild>
                <Link to="/ai-discovery">
                  Explore AI Recommendations <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="flex-1 bg-secondary rounded-xl p-6 border border-gray-800">
              <div className="flex items-center mb-4">
                <Radio className="h-6 w-6 text-primary mr-2" />
                <h3 className="text-lg font-medium">Cross-Chain Radio</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Listen to curated streams featuring the best content from every chain. Discover new artists and earn rewards while you listen.
              </p>
              <Button variant="outline" asChild>
                <Link to="/radio">
                  Start Listening <Headphones className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      {/* Music Player */}
      <MusicPlayer 
        currentTrack={currentTrackId ? {
          id: currentTrack?.id || '',
          title: currentTrack?.title || '',
          artist: currentTrack?.artist || '',
          cover: currentTrack?.cover || '',
          audioUrl: currentTrack?.audioUrl || '/audio/hip-hop-beat.mp3',
          chain: currentTrack?.chain || '',
          genre: currentTrack?.genre || '',
          marketCap: currentTrack?.marketCap || '',
          stakers: currentTrack?.stakers || 0,
          roi: currentTrack?.roi || '',
          totalStaked: currentTrack?.totalStaked || ''
        } : undefined}
      />
    </div>
  );
};

export default Index;
