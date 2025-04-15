
import React, { useState, useRef } from 'react';
import { Upload, Music, X, Image, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const supportedChains = [
  { id: 'ethereum', name: 'Ethereum' },
  { id: 'solana', name: 'Solana' },
  { id: 'polygon', name: 'Polygon' },
  { id: 'binance', name: 'Binance' },
  { id: 'nero', name: 'Nero' }
];

const AudioUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedChains, setSelectedChains] = useState<string[]>(['ethereum']);
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [royaltyPercentage, setRoyaltyPercentage] = useState([10]);
  const [makePublic, setMakePublic] = useState(true);
  
  const audioInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleAudioSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setSelectedFile(file);
    } else {
      toast.error("Please select a valid audio file");
    }
  };

  const handleCoverSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setCoverFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select a valid image file");
    }
  };

  const handleChainToggle = (chainId: string) => {
    setSelectedChains((prev) => {
      if (prev.includes(chainId)) {
        return prev.filter(id => id !== chainId);
      } else {
        return [...prev, chainId];
      }
    });
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an audio file");
      return;
    }
    
    if (!title) {
      toast.error("Please enter a title");
      return;
    }
    
    if (selectedChains.length === 0) {
      toast.error("Please select at least one blockchain");
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 300);
    
    // Simulate API call
    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
        toast.success("Track uploaded successfully and minted as NFT!");
        
        // Reset form
        setSelectedFile(null);
        setCoverFile(null);
        setCoverPreview(null);
        setTitle('');
        setDescription('');
        setGenre('');
      }, 1000);
    }, 6000);
  };

  const triggerAudioInput = () => {
    audioInputRef.current?.click();
  };

  const triggerCoverInput = () => {
    coverInputRef.current?.click();
  };
  
  return (
    <div className="bg-secondary rounded-xl p-6 border border-gray-800">
      <h2 className="text-xl font-bold mb-6">Upload New Track</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {/* Audio File Upload */}
          <div className="mb-6">
            <Label htmlFor="audioFile" className="mb-2 block">Audio File</Label>
            <input
              type="file"
              id="audioFile"
              ref={audioInputRef}
              onChange={handleAudioSelect}
              accept="audio/*"
              className="hidden"
            />
            
            {!selectedFile ? (
              <div 
                onClick={triggerAudioInput}
                className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
              >
                <Music className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-400 mb-1">Drag and drop or click to upload</p>
                <p className="text-xs text-gray-500">MP3, WAV, FLAC (Max 50MB)</p>
              </div>
            ) : (
              <div className="border border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Music className="h-8 w-8 text-primary" />
                    <div className="truncate">
                      <p className="text-sm font-medium truncate">{selectedFile.name}</p>
                      <p className="text-xs text-gray-400">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setSelectedFile(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Title and Genre */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="mb-2 block">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter track title"
                className="bg-muted/50 border-gray-700"
              />
            </div>
            
            <div>
              <Label htmlFor="genre" className="mb-2 block">Genre</Label>
              <Select value={genre} onValueChange={setGenre}>
                <SelectTrigger className="bg-muted/50 border-gray-700">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent className="bg-secondary border border-gray-800">
                  <SelectItem value="electronic">Electronic</SelectItem>
                  <SelectItem value="hip-hop">Hip-Hop</SelectItem>
                  <SelectItem value="reggae">Reggae</SelectItem>
                  <SelectItem value="rock">Rock</SelectItem>
                  <SelectItem value="pop">Pop</SelectItem>
                  <SelectItem value="jazz">Jazz</SelectItem>
                  <SelectItem value="classical">Classical</SelectItem>
                  <SelectItem value="ambient">Ambient</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="description" className="mb-2 block">Description</Label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a description for your track"
                rows={3}
                className="w-full px-3 py-2 bg-muted/50 border border-gray-700 rounded-md resize-none text-sm"
              />
            </div>
          </div>
        </div>
        
        <div>
          {/* Cover Art Upload */}
          <div className="mb-6">
            <Label htmlFor="coverFile" className="mb-2 block">Cover Art</Label>
            <input
              type="file"
              id="coverFile"
              ref={coverInputRef}
              onChange={handleCoverSelect}
              accept="image/*"
              className="hidden"
            />
            
            {!coverPreview ? (
              <div 
                onClick={triggerCoverInput}
                className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors aspect-square flex flex-col items-center justify-center"
              >
                <Image className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-400 mb-1">Upload cover art</p>
                <p className="text-xs text-gray-500">JPG, PNG (Square image recommended)</p>
              </div>
            ) : (
              <div className="relative rounded-lg overflow-hidden aspect-square">
                <img 
                  src={coverPreview} 
                  alt="Cover preview" 
                  className="w-full h-full object-cover" 
                />
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => {
                    setCoverFile(null);
                    setCoverPreview(null);
                  }}
                  className="absolute top-2 right-2 h-8 w-8 bg-black/50 backdrop-blur-sm border-0 text-white hover:bg-black/70"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          
          {/* Blockchain Settings */}
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">Target Blockchains</Label>
              <div className="grid grid-cols-2 gap-2">
                {supportedChains.map((chain) => (
                  <div 
                    key={chain.id} 
                    className={`px-4 py-3 rounded-lg cursor-pointer flex items-center space-x-2 transition-colors ${
                      selectedChains.includes(chain.id) 
                        ? 'bg-primary/20 border border-primary/30' 
                        : 'bg-muted border border-gray-700 hover:border-gray-600'
                    }`}
                    onClick={() => handleChainToggle(chain.id)}
                  >
                    <div className={`w-4 h-4 rounded-full ${getChainColor(chain.name)}`}></div>
                    <span>{chain.name}</span>
                    {selectedChains.includes(chain.id) && (
                      <Check className="h-4 w-4 ml-auto text-primary" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label className="mb-2 block">Royalty Percentage: {royaltyPercentage}%</Label>
              <Slider
                value={royaltyPercentage}
                onValueChange={setRoyaltyPercentage}
                min={1}
                max={25}
                step={1}
                className="py-4"
              />
              <p className="text-xs text-gray-400 mt-1">
                Set the percentage of royalties you'll receive from secondary sales.
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="makePublic"
                checked={makePublic}
                onCheckedChange={(checked) => setMakePublic(checked as boolean)}
              />
              <Label htmlFor="makePublic">Make this track publicly available</Label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Upload Button */}
      <div className="mt-8">
        {isUploading ? (
          <div className="space-y-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Uploading and minting NFT...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="music-progress">
              <div 
                className="music-progress-filled" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {uploadProgress < 30 ? 'Uploading track...' : 
               uploadProgress < 60 ? 'Processing audio...' :
               uploadProgress < 90 ? 'Minting NFT...' : 'Finalizing...'}
            </p>
          </div>
        ) : (
          <Button 
            onClick={handleUpload}
            className="w-full bg-primary hover:bg-primary/90 text-white"
            size="lg"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload & Mint NFT
          </Button>
        )}
        
        <p className="text-xs text-gray-400 text-center mt-4">
          By uploading, you confirm you have the rights to distribute this content across all selected blockchains.
        </p>
      </div>
    </div>
  );
};

const getChainColor = (chainName: string): string => {
  if (chainName === 'Ethereum') return 'bg-[#6c7ae0]';
  if (chainName === 'Solana') return 'bg-[#14f195]';
  if (chainName === 'Polygon') return 'bg-[#8247e5]';
  if (chainName === 'Binance') return 'bg-[#f3ba2f]';
  if (chainName === 'Nero') return 'bg-[#ff6b6b]';
  return 'bg-gray-400';
};

export default AudioUploader;
