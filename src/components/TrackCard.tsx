
import React, { useState, useEffect } from 'react';
import { Play, Pause, MoreHorizontal, GripVertical, BarChart3, Coins, TrendingUp, Users, CoinsIcon, AwardIcon } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import { getSigner, getAAWalletAddress, stake, unstake } from '@/utils/aaUtils';
import stakingABI from "@/abi/MusicStaking.json";
import erc20ABI from "@/abi/ERC20.json"; // Standard ERC20 ABI with approve()
import { CONTRACT_ADDRESSES } from '@/config';

const AUDIOFI_TOKEN_ADDRESS = CONTRACT_ADDRESSES.AUDIOFI_TOKEN_ADDRESS;
const STAKING_CONTRACT_ADDRESS = CONTRACT_ADDRESSES.STAKING_CONTRACT_ADDRESS;
import StakeAudioFi from './StakeAudioFi';

interface TrackCardProps {
  track: {
    id: string;
    title: string;
    artist: string;
    artistId?: string;
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
    royalties?: {
      total: string;
      chains: { name: string; amount: string }[];
    };
    audioUrl?: string;
  };
  index?: number;
  compact?: boolean;
  showChain?: boolean;
  onPlay?: (trackId: string) => void;
  isPlaying?: boolean;
  isCurrentTrack?: boolean;
}

const TrackCard: React.FC<TrackCardProps> = ({
  track,
  index,
  compact = false,
  showChain = true,
  onPlay,
  isPlaying = false,
  isCurrentTrack = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTrackDetails, setShowTrackDetails] = useState(false);
  const [stakeAmount, setStakeAmount] = useState("100");
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0");
  const [trigger, setTrigger] = useState(0);
  const [stakeTab, setStakeTab] = useState<string>("stake");
  const [totalStaked, setTotalStaked] = useState<string>("0");
  const [totalStaker, setTotalStaker] = useState<string>("0");

  const [userStake, setUserStake] = useState({
    amount: "0",
    roi: "+0.0%",
    earningsToDate: "0",
    position: "0",
    share: "0%"
  });
  const isMobile = useIsMobile();

  const handlePlay = () => {
    if (onPlay) {
      onPlay(track.id);
    }
  };

  const handleOpenDetails = () => {
    setShowTrackDetails(true);
  };

  const handleShare = () => {
    toast.success("Track link copied to clipboard!");
  };

  const handleAddToPlaylist = () => {
    toast.success("Track added to playlist!");
  };

  useEffect(() => {
    const fetchTotalStaker = async () => {
      if (!window.ethereum) {
        console.log("MetaMask not found");
        return;
      }

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();

        if (accounts.length === 0) {
          setAddress(null);
          return;
        }

        const userAddress = accounts[0];
        setAddress(userAddress);

        const stakingContract = new ethers.Contract(
          STAKING_CONTRACT_ADDRESS,
          stakingABI,
          provider
        )

        const rawTotalStaked = await stakingContract.totalStaked(track.id);
        setTotalStaked(ethers.utils.formatEther(rawTotalStaked));

        const rawTotalStaker = await stakingContract.stakersPerContent(track.id).length;
        setTotalStaker(rawTotalStaker)
      } catch (err) {
        console.error("Failed to fetch totalStaked and staker", err);
      }
    };

    const interval = setInterval(() => {
      console.log('This runs every 1 minutes');
      fetchTotalStaker();
    }, 60000); // 1 minutes = 60000 milliseconds

    return () => clearInterval(interval); // clean up on unmount
  }, []); // empty dependency array = run once on mount

  useEffect(() => {
    const fetchWalletAndBalance = async () => {
      if (!window.ethereum) {
        console.log("MetaMask not found");
        return;
      }

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();

        if (accounts.length === 0) {
          setAddress(null);
          setBalance("0");
          return;
        }

        const userAddress = accounts[0];
        setAddress(userAddress);

        const tokenContract = new ethers.Contract(
          AUDIOFI_TOKEN_ADDRESS,
          erc20ABI,
          provider
        );

        const stakingContract = new ethers.Contract(
          STAKING_CONTRACT_ADDRESS,
          stakingABI,
          provider
        )

        const rawBalance = await tokenContract.balanceOf(userAddress);
        const formatted = ethers.utils.formatEther(rawBalance);
        setBalance(formatted);

        const rawTotalStaked = await stakingContract.totalStaked(track.id);
        setTotalStaked(ethers.utils.formatEther(rawTotalStaked));

        const rawTotalStaker = await stakingContract.stakersPerContent(track.id).length;
        setTotalStaker(rawTotalStaker)
      } catch (err) {
        console.error("Failed to fetch balance", err);
      }
    };

    fetchWalletAndBalance();
  }, [trigger]); // Only runs once on mount

  useEffect(() => {
    const fetchStakeInfo = async () => {
      if (!address || !window.ethereum) return;

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(STAKING_CONTRACT_ADDRESS, stakingABI, provider);

        // Fetch the staked amount and reward debt for the user on this contentId
        const stakeInfo = await contract.stakes(track.id, address);
        const stakedFormatted = ethers.utils.formatEther(stakeInfo.amount); // Format the amount

        // Fetch the reward based on the performance score
        const calculatedReward = await contract.calculateReward(track.id, address);
        const rewardFormatted = ethers.utils.formatEther(calculatedReward); // Format reward
        console.log("sfdf" + stakedFormatted);
        setUserStake({
          amount: parseFloat(stakedFormatted).toFixed(2),
          roi: "+5.2%",
          earningsToDate: parseFloat(rewardFormatted).toFixed(2) + " AFI",
          position: parseFloat(stakedFormatted).toFixed(2) + " AFI",
          share: ((parseFloat(stakedFormatted) / parseInt((totalStaked || "0").replace(/[^0-9]/g, ''))) * 100).toFixed(4) + "%"
        });

      } catch (err) {
        console.error("Error fetching stake or reward:", err);
      }
    };
    console.log(userStake.amount);
    fetchStakeInfo();
  }, [track.id, address, trigger]);


  const handleStakeSubmit = async () => {
    const signer = await getSigner();
    const tokenContract = new ethers.Contract(AUDIOFI_TOKEN_ADDRESS, erc20ABI, signer);
    const stakingContract = new ethers.Contract(STAKING_CONTRACT_ADDRESS, stakingABI, signer);
    if (stakeTab === "stake") {

      try {
        setIsLoading(true);
        // Get signer from browser wallet
        const signer = await getSigner();

        // Define NFT metadata (can be fetched from form)
        const connectId = parseInt(track.id);
        const amount = ethers.utils.parseEther(stakeAmount);

        // Execute the mint operation with sponsored gas
        const result = await stake(
          signer,
          await signer.getAddress(),
          connectId,
          amount, // Mint to the connected wallet
          { apiKey: '8acb55985863495f8b4648a22684a191' }
        );

        // setTxHash(result.transactionHash);
        toast.success("Staked successfully!");
      } catch (error) {
        console.error("Stake error:", error);
        toast.error("Staking failed. See console for details.");
      } finally {
        setIsLoading(false);
        setTrigger(trigger + 1);
      }
    } else {
      // Unstake
      if (parseInt(stakeAmount) > parseFloat(userStake.amount)) {
        toast.error("You don't have enough staked tokens");
        return;
      }

      try {
        // setIsLoading(true);
        // Get signer from browser wallet
        const signer = await getSigner();

        // Define NFT metadata (can be fetched from form)
        const connectId = parseInt(track.id);

        // Execute the mint operation with sponsored gas
        const result = await unstake(
          signer,
          await signer.getAddress(),
          connectId,
          { apiKey: '8acb55985863495f8b4648a22684a191' }
        );

        // setTxHash(result.transactionHash);
        toast.success("Unstaked successfully!");
      } catch (error) {
        console.error("Unstaked error:", error);
        toast.error("Unstaked failed. See console for details.");
      } finally {
        setIsLoading(false);
        setTrigger(trigger + 1);
      }
    };
  }

  if (compact) {
    return (
      <div
        className={`flex items-center p-2 rounded-md transition-colors hover:bg-secondary group ${isCurrentTrack ? 'bg-secondary' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center flex-1">
          <div className="flex-shrink-0 mr-3">
            {index !== undefined && (
              <span className={`w-6 text-center text-sm ${isHovered || isCurrentTrack ? 'hidden' : 'block'} text-gray-400`}>
                {index + 1}
              </span>
            )}
            {(isHovered || isCurrentTrack) && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 p-0"
                onClick={handlePlay}
              >
                {isPlaying && isCurrentTrack ? (
                  <Pause className="h-4 w-4 text-primary" />
                ) : (
                  <Play className="h-4 w-4 text-primary ml-0.5" />
                )}
              </Button>
            )}
          </div>

          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="relative h-10 w-10 rounded overflow-hidden">
              <img src={track.cover} alt={track.title} className="h-full w-full object-cover" />
              {showChain && (
                <div className="absolute bottom-0 right-0">
                  <span className="chain-pill text-[8px] py-0.5">{track.chain}</span>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{track.title}</p>
              <p className="text-xs text-gray-400 truncate">
                {track.artistId ? (
                  <Link to={`/artist-view?id=${track.artistId}`} className="hover:text-primary">
                    {track.artist}
                  </Link>
                ) : (
                  track.artist
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          {track.genre && (
            <Badge variant="outline" className="mr-2 text-xs hidden md:inline-flex">
              {track.genre}
            </Badge>
          )}

          <span className="text-xs text-gray-400 mr-4">{track.duration}</span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-secondary border border-gray-800">
              <DropdownMenuItem onClick={handleAddToPlaylist}>Add to Playlist</DropdownMenuItem>
              <DropdownMenuItem onClick={handleOpenDetails}>View Details</DropdownMenuItem>
              <DropdownMenuItem onClick={handleShare}>Share</DropdownMenuItem>
              {track.artistId && (
                <DropdownMenuItem asChild>
                  <Link to={`/artist-view?id=${track.artistId}`}>View Artist</Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>View NFT Details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 cursor-grab">
            <GripVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="audio-card group">
        <div className="relative aspect-square mb-3 rounded-lg overflow-hidden bg-muted">
          <img
            src={track.cover}
            alt={track.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              onClick={handlePlay}
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 bg-primary/90 text-white hover:bg-primary border-0"
            >
              {isPlaying && isCurrentTrack ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-0.5" />
              )}
            </Button>
          </div>

          {showChain && (
            <div className="absolute top-2 right-2">
              <span className="chain-pill">{track.chain}</span>
            </div>
          )}

          {track.genre && (
            <div className="absolute top-2 left-2">
              <Badge variant="outline" className="bg-primary/20 text-white border-0 text-xs">
                {track.genre}
              </Badge>
            </div>
          )}

          {track.marketCap && (
            <div className="absolute bottom-2 left-2">
              <Badge className="bg-accent/30 text-white border-0 text-xs">
                MC: {track.marketCap}
              </Badge>
            </div>
          )}
        </div>

        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-sm truncate">{track.title}</h3>
            <p className="text-xs text-gray-400">
              {track.artistId ? (
                <Link to={`/artist-view?id=${track.artistId}`} className="hover:text-primary">
                  {track.artist}
                </Link>
              ) : (
                track.artist
              )}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-secondary border border-gray-800">
              <DropdownMenuItem onClick={handlePlay}>
                {isPlaying && isCurrentTrack ? "Pause" : "Play"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleAddToPlaylist}>Add to Playlist</DropdownMenuItem>
              <DropdownMenuItem onClick={handleOpenDetails}>View Details</DropdownMenuItem>
              <DropdownMenuItem onClick={handleShare}>Share</DropdownMenuItem>
              {track.artistId && (
                <DropdownMenuItem asChild>
                  <Link to={`/artist-view?id=${track.artistId}`}>View Artist</Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>View NFT Details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
          <span>{track.plays.toLocaleString()} plays</span>
          <span>{track.duration}</span>
        </div>

        {track.roi && (
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-3 text-xs bg-primary/10 border-primary/20 text-primary hover:bg-primary/20"
            onClick={handleOpenDetails}
          >
            <Coins className="h-3.5 w-3.5 mr-1.5" />
            Stake • ROI {track.roi}
          </Button>
        )}
      </div>

      {/* Track details dialog with staking */}
      <Dialog open={showTrackDetails} onOpenChange={setShowTrackDetails}>
        <DialogContent className={`sm:max-w-2xl bg-background border-gray-800 ${isMobile ? 'h-[90vh] overflow-y-auto' : ''}`}>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <div className="h-8 w-8 rounded overflow-hidden mr-2">
                <img src={track.cover} alt={track.title} className="h-full w-full object-cover" />
              </div>
              {track.title}
            </DialogTitle>
            <DialogDescription>by {track.artist}</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <div className="aspect-square rounded-lg overflow-hidden mb-4">
                <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="bg-secondary">Chain: {track.chain}</Badge>
                {track.genre && (
                  <Badge variant="outline" className="bg-secondary">Genre: {track.genre}</Badge>
                )}
                <Badge variant="outline" className="bg-secondary">Plays: {track.plays.toLocaleString()}</Badge>
                <Badge variant="outline" className="bg-secondary">Duration: {track.duration}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary p-3 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Market Cap</div>
                  <div className="flex items-center">
                    <BarChart3 className="h-4 w-4 text-primary mr-1" />
                    <span className="font-medium">{track.marketCap || 'N/A'}</span>
                  </div>
                </div>

                <div className="bg-secondary p-3 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">ROI (30d)</div>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                    <span className="font-medium text-green-400">{track.roi || 'N/A'}</span>
                  </div>
                </div>

                <div className="bg-secondary p-3 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Total Stakers</div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-primary mr-1" />
                    <span className="font-medium">{totalStaker || 'N/A'}</span>
                  </div>
                </div>

                <div className="bg-secondary p-3 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Total Staked</div>
                  <div className="flex items-center">
                    <Coins className="h-4 w-4 text-primary mr-1" />
                    <span className="font-medium">{totalStaked || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="text-lg font-medium mb-4">Your Position</h3>

              {parseFloat(userStake.amount) > 0 ? (
                <div className="bg-secondary rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Your Stake</div>
                      <div className="font-medium">{userStake.amount}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Your ROI</div>
                      <div className="font-medium text-green-400">{userStake.roi}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Earnings to Date</div>
                      <div className="font-medium">{userStake.earningsToDate}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Share of Pool</div>
                      <div className="font-medium">{userStake.share}</div>
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Your stake</span>
                      <span>{userStake.amount} AFI</span>
                    </div>
                    <Progress
                      value={(parseFloat(userStake.amount) / parseInt((track.totalStaked || "1").replace(/[^0-9]/g, ''))) * 100}
                      className="h-2"
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-secondary/50 rounded-lg p-4 mb-4 text-center">
                  <p className="text-gray-400 mb-2">You haven't staked on this track yet</p>
                  <p className="text-sm">Stake AudioFi tokens to earn passive income based on track performance</p>
                </div>
              )}

              <Tabs defaultValue="stake" className="flex-1" onValueChange={setStakeTab}>
                <TabsList className="bg-muted/40 grid w-full grid-cols-2">
                  <TabsTrigger value="stake">Stake</TabsTrigger>
                  <TabsTrigger value="unstake" disabled={parseInt(userStake.amount) === 0}>Unstake</TabsTrigger>
                </TabsList>

                <TabsContent value="stake" className="mt-4 space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <div className="text-sm font-medium">Stake Amount (AFI)</div>
                      <div className="text-sm text-gray-400">Balance: {parseFloat(balance).toFixed(2)} AFI</div>
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

                  <div>
                    <div className="text-sm font-medium mb-2">Estimated APR</div>
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                      <span className="font-medium text-green-400">+16.8% APR</span>
                    </div>
                  </div>

                  <Button className="w-full" disabled={isLoading} onClick={handleStakeSubmit}>
                    <Coins className="mr-2 h-4 w-4" />
                    Stake Tokens
                  </Button>
                </TabsContent>

                <TabsContent value="unstake" className="mt-4 space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <div className="text-sm font-medium">Unstake Amount (AFI)</div>
                      <div className="text-sm text-gray-400">Staked: {userStake.amount} AFI</div>
                    </div>

                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                        className="bg-muted"
                        max={userStake.amount}
                      />
                      <Button variant="outline" size="sm" className="whitespace-nowrap" onClick={() => setStakeAmount("10")}>
                        Min
                      </Button>
                      <Button variant="outline" size="sm" className="whitespace-nowrap" onClick={() => setStakeAmount(userStake.amount.toString())}>
                        Max
                      </Button>
                    </div>
                  </div>

                  <div className="bg-secondary/50 p-3 rounded-lg">
                    <div className="text-sm font-medium mb-1">Staking Benefits</div>
                    <p className="text-xs text-gray-400">
                      Unstaking may reduce your earnings and voting rights on this track.
                    </p>
                  </div>

                  <Button variant="destructive" disabled={isLoading} className="w-full" onClick={handleStakeSubmit}>
                    Unstake Tokens
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TrackCard;
