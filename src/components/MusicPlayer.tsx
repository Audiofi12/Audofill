import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Volume1, 
  VolumeX, 
  Heart, 
  Repeat, 
  Shuffle, 
  Share2, 
  MoreHorizontal, 
  Music,
  Coins,
  BarChart3,
  TrendingUp,
  Users,
  ChevronUp,
  ChevronDown,
  ExternalLink
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface MusicPlayerProps {
  currentTrack?: {
    id: string;
    title: string;
    artist: string;
    cover: string;
    audioUrl: string;
    chain: string;
    genre?: string;
    marketCap?: string;
    stakers?: number;
    roi?: string;
    totalStaked?: string;
  };
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ currentTrack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showFullPlayer, setShowFullPlayer] = useState(false);
  const [stakeAmount, setStakeAmount] = useState("100");
  const [userStake, setUserStake] = useState({
    amount: 0,
    roi: "+0.0%",
    earningsToDate: "0 AFI",
    position: "0 AFI",
    share: "0%"
  });
  const audioRef = useRef<HTMLAudioElement>(null);
  const waveformRef = useRef<HTMLDivElement>(null);

  // Get the actual audio source
  const audioSrc = currentTrack?.audioUrl || '';

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Reset the audio when the track changes
    if (audio.src !== audioSrc && audioSrc) {
      audio.src = audioSrc;
      audio.load();
      if (isPlaying) {
        audio.play().catch(error => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        });
      }
    }

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setCurrentTime(0);
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack, audioSrc, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStakeSubmit = () => {
    const amount = parseInt(stakeAmount);
    const newAmount = userStake.amount + amount;
    setUserStake({
      amount: newAmount,
      roi: "+5.2%",
      earningsToDate: (newAmount * 0.052).toFixed(2) + " AFI",
      position: newAmount + " AFI",
      share: ((newAmount / (parseInt((currentTrack?.totalStaked || "0").replace(/[^0-9]/g, '')) || 1)) * 100).toFixed(4) + "%"
    });
    toast.success(`Staked ${stakeAmount} AFI on ${currentTrack?.title}!`);
    setStakeAmount("100");
  };

  useEffect(() => {
    if (waveformRef.current && isPlaying) {
      const container = waveformRef.current;
      const waveElements = container.querySelectorAll('.wave-bar');
      
      waveElements.forEach((element, index) => {
        const el = element as HTMLElement;
        el.style.animationDelay = `${index * 0.1}s`;
      });
    }
  }, [isPlaying, waveformRef]);

  const renderWaveform = () => {
    return Array.from({ length: 9 }, (_, i) => (
      <div 
        key={i} 
        className={`wave-bar w-1 mx-0.5 bg-primary rounded-full ${isPlaying ? 'animate-wave' : 'h-1'}`}
        style={{ 
          height: isPlaying ? `${Math.random() * 16 + 4}px` : '4px',
          animationDelay: `${i * 0.1}s`
        }}
      ></div>
    ));
  };

  const formatNumber = (num: number | undefined) => {
    if (!num) return 'N/A';
    return num.toLocaleString();
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-secondary border-t border-gray-800 backdrop-blur-md py-3 px-4 z-50">
        <audio ref={audioRef} src={audioSrc} preload="metadata" />
        
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {currentTrack ? (
            <>
              <div className="relative h-12 w-12 rounded-md overflow-hidden">
                <img 
                  src={currentTrack.cover || 'https://github.com/shadcn.png'} 
                  alt={currentTrack.title} 
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute bottom-1 right-1">
                  <span className="chain-pill text-[10px] py-0.5">{currentTrack.chain}</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{currentTrack.title}</p>
                <p className="text-xs text-gray-400 truncate">{currentTrack.artist}</p>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center">
                <Music className="h-6 w-6 text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Select a track</p>
                <p className="text-xs text-gray-400">AudioFi Player</p>
              </div>
            </div>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            className={`text-gray-400 hover:text-white ${isLiked ? 'text-primary' : ''}`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-primary' : ''}`} />
          </Button>
        </div>
        
        <div className="flex flex-col items-center justify-center flex-1 max-w-xl px-4">
          <div className="flex items-center space-x-4 mb-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <Shuffle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Shuffle</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <SkipBack className="h-5 w-5" />
            </Button>
            
            <Button 
              onClick={handlePlayPause}
              variant="outline" 
              size="icon" 
              className="rounded-full h-10 w-10 bg-primary text-white hover:bg-primary/90 border-0"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </Button>
            
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <SkipForward className="h-5 w-5" />
            </Button>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <Repeat className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Repeat</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="w-full flex items-center space-x-2">
            <span className="text-xs text-gray-400 w-10 text-right">{formatTime(currentTime)}</span>
            <div className="flex-1 group relative">
              <Slider
                value={[currentTime]}
                min={0}
                max={duration || 100}
                step={0.1}
                onValueChange={handleSeek}
                className="cursor-pointer"
              />
              <div 
                ref={waveformRef}
                className="absolute left-0 right-0 -top-6 flex justify-center items-end h-6 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              >
                {renderWaveform()}
              </div>
            </div>
            <span className="text-xs text-gray-400 w-10">{formatTime(duration || 0)}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 w-1/4 justify-end">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white" onClick={toggleMute}>
              {isMuted ? (
                <VolumeX className="h-5 w-5" />
              ) : volume > 0.5 ? (
                <Volume2 className="h-5 w-5" />
              ) : (
                <Volume1 className="h-5 w-5" />
              )}
            </Button>
            
            <div className="w-20">
              <Slider
                value={[isMuted ? 0 : volume]}
                min={0}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
              />
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Share2 className="h-5 w-5" />
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-background border-gray-800 w-[400px] sm:max-w-none">
                <SheetHeader>
                  <SheetTitle>Track Details</SheetTitle>
                  <SheetDescription>View and stake on this track</SheetDescription>
                </SheetHeader>
                {currentTrack && (
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center space-x-4">
                      <img src={currentTrack.cover} alt={currentTrack.title} className="h-16 w-16 rounded-md object-cover" />
                      <div>
                        <h3 className="font-medium">{currentTrack.title}</h3>
                        <p className="text-sm text-gray-400">{currentTrack.artist}</p>
                        <div className="flex space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">{currentTrack.chain}</Badge>
                          {currentTrack.genre && <Badge variant="outline" className="text-xs">{currentTrack.genre}</Badge>}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-secondary rounded-lg p-3">
                        <div className="text-xs text-gray-400 mb-1">Market Cap</div>
                        <div className="flex items-center">
                          <BarChart3 className="h-4 w-4 text-primary mr-1" />
                          <span className="font-medium">{currentTrack.marketCap || 'N/A'}</span>
                        </div>
                      </div>
                      
                      <div className="bg-secondary rounded-lg p-3">
                        <div className="text-xs text-gray-400 mb-1">ROI (30d)</div>
                        <div className="flex items-center">
                          <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                          <span className="font-medium text-green-400">{currentTrack.roi || 'N/A'}</span>
                        </div>
                      </div>
                      
                      <div className="bg-secondary rounded-lg p-3">
                        <div className="text-xs text-gray-400 mb-1">Total Stakers</div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-primary mr-1" />
                          <span className="font-medium">{formatNumber(currentTrack.stakers)}</span>
                        </div>
                      </div>
                      
                      <div className="bg-secondary rounded-lg p-3">
                        <div className="text-xs text-gray-400 mb-1">Total Staked</div>
                        <div className="flex items-center">
                          <Coins className="h-4 w-4 text-primary mr-1" />
                          <span className="font-medium">{currentTrack.totalStaked || 'N/A'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-800">
                      <h4 className="font-medium mb-3">Your Position</h4>
                      {userStake.amount > 0 ? (
                        <div className="bg-secondary rounded-lg p-3 mb-4">
                          <div className="grid grid-cols-2 gap-2 mb-2">
                            <div>
                              <div className="text-xs text-gray-400">Your Stake</div>
                              <div className="text-sm font-medium">{userStake.position}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-400">Your ROI</div>
                              <div className="text-sm font-medium text-green-400">{userStake.roi}</div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <div className="text-xs text-gray-400">Earnings</div>
                              <div className="text-sm font-medium">{userStake.earningsToDate}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-400">Share</div>
                              <div className="text-sm font-medium">{userStake.share}</div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-secondary/50 rounded-lg p-3 mb-4 text-center">
                          <p className="text-gray-400 text-sm">No active stake on this track</p>
                        </div>
                      )}

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <div className="text-sm font-medium">Stake Amount (AFI)</div>
                            <div className="text-xs text-gray-400">Balance: 2,500 AFI</div>
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
                        
                        <Button className="w-full" onClick={handleStakeSubmit}>
                          <Coins className="mr-2 h-4 w-4" />
                          Stake Tokens
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowFullPlayer(!showFullPlayer)}
          className="absolute left-1/2 transform -translate-x-1/2 -top-3 h-6 w-6 rounded-full bg-primary text-white p-0 md:hidden"
        >
          {showFullPlayer ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </Button>
      </div>
      
      <Drawer open={showFullPlayer} onOpenChange={setShowFullPlayer}>
        <DrawerContent className="bg-background border-t border-gray-800 max-h-[90vh]">
          <div className="px-4 py-6 max-w-md mx-auto">
            {currentTrack && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="aspect-square w-full max-w-[300px] mx-auto rounded-lg overflow-hidden mb-4">
                    <img 
                      src={currentTrack.cover}
                      alt={currentTrack.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h3 className="text-lg font-medium">{currentTrack.title}</h3>
                  <p className="text-gray-400">{currentTrack.artist}</p>
                  
                  <div className="flex justify-center space-x-2 mt-2">
                    <Badge variant="outline" className="text-xs">{currentTrack.chain}</Badge>
                    {currentTrack.genre && <Badge variant="outline" className="text-xs">{currentTrack.genre}</Badge>}
                  </div>
                </div>
                
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-400">{formatTime(currentTime)}</span>
                  <span className="text-sm text-gray-400">{formatTime(duration || 0)}</span>
                </div>
                
                <Slider
                  value={[currentTime]}
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  onValueChange={handleSeek}
                  className="cursor-pointer"
                />
                
                <div className="flex justify-center items-center space-x-6">
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <Shuffle className="h-5 w-5" />
                  </Button>
                  
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <SkipBack className="h-6 w-6" />
                  </Button>
                  
                  <Button 
                    onClick={handlePlayPause}
                    variant="outline" 
                    size="icon" 
                    className="rounded-full h-14 w-14 bg-primary text-white hover:bg-primary/90 border-0"
                  >
                    {isPlaying ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7 ml-0.5" />}
                  </Button>
                  
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <SkipForward className="h-6 w-6" />
                  </Button>
                  
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <Repeat className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-secondary rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-400 mb-1">Market Cap</div>
                    <div className="flex items-center justify-center">
                      <BarChart3 className="h-4 w-4 text-primary mr-1" />
                      <span className="font-medium">{currentTrack.marketCap || 'N/A'}</span>
                    </div>
                  </div>
                  
                  <div className="bg-secondary rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-400 mb-1">ROI (30d)</div>
                    <div className="flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                      <span className="font-medium text-green-400">{currentTrack.roi || 'N/A'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <Button className="w-full justify-start" asChild>
                    <a href="#" className="flex items-center">
                      <Coins className="mr-2 h-4 w-4" />
                      Stake {currentTrack.stakers?.toLocaleString() || '0'} stakers | {currentTrack.totalStaked || '0 AFI'}
                      <ExternalLink className="ml-auto h-4 w-4" />
                    </a>
                  </Button>
                  
                  <div className="flex space-x-3">
                    <Button 
                      variant="ghost" 
                      className={`flex-1 ${isLiked ? 'text-primary' : ''}`}
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      <Heart className={`mr-2 h-4 w-4 ${isLiked ? 'fill-primary' : ''}`} />
                      Like
                    </Button>
                    
                    <Button variant="ghost" className="flex-1">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MusicPlayer;
