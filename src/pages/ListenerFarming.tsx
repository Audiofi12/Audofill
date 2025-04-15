
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import MusicPlayer from '@/components/MusicPlayer';
import FarmingRewards from '@/components/FarmingRewards';
import TrackCard from '@/components/TrackCard';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Trophy, 
  Clock, 
  Headphones, 
  Calendar, 
  BarChart3, 
  ArrowRight, 
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  Bell
} from 'lucide-react';
import { toast } from "sonner";

const ListenerFarming = () => {
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  
  // Sample farming data
  const farmingData = {
    totalPoints: 345,
    audiofiTokens: 178,
    listeningStreak: 7,
    dailyGoal: 75, // percentage
    weeklyReward: 150,
    earnedThisMonth: 423,
    level: 4,
    badges: ['Early Supporter', 'Hip-Hop Fan', 'Audiophile'],
    nextLevelPoints: 500
  };
  
  // Sample featured farming tracks
  const farmingTracks = [
    {
      id: '1',
      title: 'Farm Together',
      artist: 'Yield Guild',
      cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&h=500&q=80',
      plays: 12450,
      duration: '4:12',
      chain: 'Nero',
      createdAt: '2023-06-01',
      farmingReward: 5
    },
    {
      id: '2',
      title: 'Staking Beats',
      artist: 'Liquidity Providers',
      cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&q=80',
      plays: 8920,
      duration: '3:45',
      chain: 'Ethereum',
      createdAt: '2023-06-03',
      farmingReward: 4
    },
    {
      id: '3',
      title: 'Reward Pool',
      artist: 'Token Farmers',
      cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&q=80',
      plays: 7650,
      duration: '3:18',
      chain: 'Polygon',
      createdAt: '2023-06-05',
      farmingReward: 3
    },
    {
      id: '4',
      title: 'Yield Anthem',
      artist: 'Staking Collective',
      cover: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=500&h=500&q=80',
      plays: 6890,
      duration: '4:32',
      chain: 'Binance',
      createdAt: '2023-06-07',
      farmingReward: 5
    }
  ];
  
  const currentTrack = currentTrackId 
    ? farmingTracks.find(track => track.id === currentTrackId) 
    : undefined;

  const handlePlayTrack = (trackId: string) => {
    setCurrentTrackId(trackId);
    
    // Simulate earning points for playing a farming track
    const track = farmingTracks.find(t => t.id === trackId);
    if (track) {
      toast.success(`Started farming! Earn ${track.farmingReward} AFI tokens per minute`);
    }
  };

  const handleClaimReward = () => {
    toast.success("Weekly reward of 150 AFI tokens claimed!");
  };

  const handleBoostFarming = () => {
    toast.success("Farming rate boosted by 2x for 1 hour!");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        {/* Farming Hero */}
        <section className="mb-8">
          <div className="rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 mix-blend-overlay"></div>
            <div className="audio-gradient backdrop-blur-sm py-10 px-6 md:px-12">
              <div className="max-w-3xl">
                <div className="flex items-center mb-2">
                  <Trophy className="h-6 w-6 mr-2 text-primary" />
                  <h1 className="text-3xl font-bold">
                    <span className="gradient-text">Listener Farming</span>
                  </h1>
                </div>
                <p className="text-lg mb-6 text-gray-200">
                  Earn rewards while enjoying your favorite music. Listen, engage, and farm AudioFi tokens across all blockchain networks.
                </p>
                
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <Headphones className="mr-2 h-5 w-5" />
                    Start Farming
                  </Button>
                  <Button size="lg" variant="outline" onClick={handleClaimReward}>
                    <Trophy className="mr-2 h-5 w-5" />
                    Claim Weekly Reward
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Farming Stats */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-secondary border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Farming Points</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-2 bg-primary/20 p-2 rounded-full">
                      <Trophy className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{farmingData.totalPoints}</div>
                      <div className="text-xs text-gray-400">Level {farmingData.level} Farmer</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs text-gray-400 mb-1">Next level: {farmingData.nextLevelPoints}</div>
                    <Progress value={farmingData.totalPoints / farmingData.nextLevelPoints * 100} className="h-1.5 w-24" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Listening Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-2 bg-primary/20 p-2 rounded-full">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{farmingData.listeningStreak} days</div>
                      <div className="text-xs text-green-400">+25% bonus active</div>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="text-xs" onClick={handleBoostFarming}>
                    <Sparkles className="h-3.5 w-3.5 mr-1" />
                    Boost
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary border-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">AudioFi Tokens</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-2 bg-primary/20 p-2 rounded-full">
                      <Headphones className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{farmingData.audiofiTokens} AFI</div>
                      <div className="text-xs text-gray-400">${(farmingData.audiofiTokens * 0.12).toFixed(2)} estimated value</div>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="text-xs">
                    <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
                    Swap
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Weekly Challenge and Daily Goals */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-secondary border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-primary" />
                    Weekly Challenge
                  </CardTitle>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    2 days left
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Listen to music from at least 5 different blockchain networks and earn bonus rewards!
                </p>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Ethereum</span>
                      <span className="text-green-400">Completed</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Solana</span>
                      <span className="text-green-400">Completed</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Polygon</span>
                      <span>45/60 min</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Binance</span>
                      <span>12/60 min</span>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Nero</span>
                      <span>0/60 min</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium">Challenge reward:</span>
                    <span className="ml-1 font-bold text-primary">{farmingData.weeklyReward} AFI</span>
                  </div>
                  <Button variant="default" className="text-sm bg-primary hover:bg-primary/90">
                    <Headphones className="h-4 w-4 mr-1" />
                    Continue Listening
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-primary" />
                    Daily Goals
                  </CardTitle>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    8 hours left
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Complete daily tasks to earn farming points and boost your rewards.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-muted/40 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Headphones className="h-4 w-4 mr-2 text-primary" />
                        <span className="text-sm font-medium">Listen for 60 minutes</span>
                      </div>
                      <Badge variant={farmingData.dailyGoal >= 100 ? "default" : "outline"} className={farmingData.dailyGoal >= 100 ? "bg-green-500/20 text-green-400 hover:bg-green-500/20" : ""}>
                        {farmingData.dailyGoal >= 100 ? "Completed" : "In Progress"}
                      </Badge>
                    </div>
                    <Progress value={farmingData.dailyGoal} className="h-2" />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-400">45/60 minutes</span>
                      <span className="text-xs font-medium">+15 AFI</span>
                    </div>
                  </div>
                  
                  <div className="bg-muted/40 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <BarChart3 className="h-4 w-4 mr-2 text-primary" />
                        <span className="text-sm font-medium">Discover 3 new artists</span>
                      </div>
                      <Badge variant="outline">1/3 Completed</Badge>
                    </div>
                    <Progress value={33} className="h-2" />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-400">Listen to 2 more new artists</span>
                      <span className="text-xs font-medium">+10 AFI</span>
                    </div>
                  </div>
                  
                  <div className="bg-muted/40 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <Bell className="h-4 w-4 mr-2 text-primary" />
                        <span className="text-sm font-medium">Share a track with friends</span>
                      </div>
                      <Badge variant="outline">Not Started</Badge>
                    </div>
                    <Progress value={0} className="h-2" />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-400">Share any track to complete</span>
                      <span className="text-xs font-medium">+5 AFI</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Featured Farming Tracks */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1 flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-primary" />
                Featured Farming Tracks
              </h2>
              <p className="text-sm text-gray-400">Higher rewards for listening to these tracks</p>
            </div>
            <Button variant="ghost" size="sm" className="text-primary">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {farmingTracks.map((track) => (
              <div key={track.id} className="relative">
                <TrackCard 
                  track={track}
                  onPlay={handlePlayTrack}
                  isPlaying={currentTrackId === track.id}
                  isCurrentTrack={currentTrackId === track.id}
                />
                <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-primary/90 text-xs font-medium flex items-center">
                  <Trophy className="h-3 w-3 mr-1" />
                  {track.farmingReward}x Rewards
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Farming Tasks and Rewards */}
        <section className="mb-8">
          <FarmingRewards />
        </section>
        
        {/* Your Badges */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-primary" />
              Your Badges
            </h2>
            <Button variant="ghost" size="sm" className="text-primary">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {farmingData.badges.map((badge, index) => (
              <Card key={index} className="bg-secondary border-gray-800 text-center p-4">
                <div className="h-16 w-16 rounded-full mx-auto mb-3 bg-primary/20 flex items-center justify-center">
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-medium text-sm">{badge}</h3>
                <p className="text-xs text-gray-400 mt-1">Earned May 2023</p>
              </Card>
            ))}
            
            <Card className="bg-secondary border-gray-800 text-center p-4 border-dashed">
              <div className="h-16 w-16 rounded-full mx-auto mb-3 bg-muted flex items-center justify-center">
                <Trophy className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="font-medium text-sm">Next Badge</h3>
              <p className="text-xs text-gray-400 mt-1">Listen 5 more hours</p>
            </Card>
          </div>
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

export default ListenerFarming;
