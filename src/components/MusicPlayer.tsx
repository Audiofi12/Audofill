
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX, Heart, Repeat, Shuffle, Share2, MoreHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MusicPlayerProps {
  currentTrack?: {
    id: string;
    title: string;
    artist: string;
    cover: string;
    audioUrl: string;
    chain: string;
  };
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ currentTrack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const waveformRef = useRef<HTMLDivElement>(null);

  // This would normally use a real audio URL
  const audioSrc = currentTrack?.audioUrl || '';

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

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
  }, [currentTrack]);

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

  // Create visual waveform animation
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

  // Render audio visualization bars
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

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-secondary border-t border-gray-800 backdrop-blur-md py-3 px-4">
      <audio ref={audioRef} src={audioSrc} preload="metadata" />
      
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Track Info */}
        <div className="flex items-center space-x-3 w-1/4">
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
        
        {/* Player Controls */}
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
        
        {/* Right Controls */}
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
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
