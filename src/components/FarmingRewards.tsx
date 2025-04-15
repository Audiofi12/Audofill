import React, { useState } from 'react';
import { 
  Trophy, 
  Clock, 
  BarChart3, 
  Headphones, 
  Heart, 
  Share2, 
  MessageSquare,
  ArrowRight,
  Music,
  PlayCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface FarmingTask {
  id: string;
  title: string;
  description: string;
  reward: number;
  icon: React.ReactNode;
  progress: number;
  isCompleted: boolean;
}

interface FarmingReward {
  id: string;
  title: string;
  description: string;
  amount: number;
  icon: React.ReactNode;
  type: 'token' | 'nft' | 'badge';
  chain: string;
}

interface FarmingActivity {
  id: string;
  user: string;
  action: string;
  reward: number;
  time: string;
}

const FarmingRewards: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tasks' | 'rewards' | 'activity'>('tasks');
  
  // Sample farming tasks
  const tasks: FarmingTask[] = [
    {
      id: '1',
      title: 'Listen for 30 minutes',
      description: 'Stream music for at least 30 minutes today',
      reward: 5,
      icon: <Headphones className="h-5 w-5" />,
      progress: 75,
      isCompleted: false
    },
    {
      id: '2',
      title: 'Discover new artists',
      description: 'Listen to 3 artists you\'ve never heard before',
      reward: 15,
      icon: <Music className="h-5 w-5" />,
      progress: 66,
      isCompleted: false
    },
    {
      id: '3',
      title: 'Like 5 tracks',
      description: 'Show some love to your favorite tracks',
      reward: 10,
      icon: <Heart className="h-5 w-5" />,
      progress: 100,
      isCompleted: true
    },
    {
      id: '4',
      title: 'Share a track',
      description: 'Share a track with friends or on social media',
      reward: 20,
      icon: <Share2 className="h-5 w-5" />,
      progress: 0,
      isCompleted: false
    },
    {
      id: '5',
      title: 'Leave a comment',
      description: 'Comment on a track to support the artist',
      reward: 8,
      icon: <MessageSquare className="h-5 w-5" />,
      progress: 0,
      isCompleted: false
    },
    {
      id: '6',
      title: 'Listen to trending tracks',
      description: 'Listen to 3 trending tracks from different chains',
      reward: 12,
      icon: <BarChart3 className="h-5 w-5" />,
      progress: 33,
      isCompleted: false
    }
  ];
  
  // Sample rewards
  const rewards: FarmingReward[] = [
    {
      id: '1',
      title: 'AudioFi Tokens',
      description: 'Redeemable for premium content and features',
      amount: 500,
      icon: <div className="bg-primary/20 p-2 rounded-full"><Trophy className="h-5 w-5 text-primary" /></div>,
      type: 'token',
      chain: 'Multi-chain'
    },
    {
      id: '2',
      title: 'Exclusive Track NFT',
      description: 'Limited edition track from top artists',
      amount: 1,
      icon: <div className="bg-accent/20 p-2 rounded-full"><PlayCircle className="h-5 w-5 text-accent" /></div>,
      type: 'nft',
      chain: 'Ethereum'
    },
    {
      id: '3',
      title: 'Superfan Badge',
      description: 'Show off your dedication to your favorite artists',
      amount: 1,
      icon: <div className="bg-[#f3ba2f]/20 p-2 rounded-full"><Trophy className="h-5 w-5 text-[#f3ba2f]" /></div>,
      type: 'badge',
      chain: 'Binance'
    }
  ];
  
  // Sample activity feed
  const activities: FarmingActivity[] = [
    {
      id: '1',
      user: 'CryptoBeats',
      action: 'completed a 1-hour listening session',
      reward: 10,
      time: '5 min ago'
    },
    {
      id: '2',
      user: 'NFTunes',
      action: 'discovered 5 new artists',
      reward: 25,
      time: '15 min ago'
    },
    {
      id: '3',
      user: 'BlockchainBard',
      action: 'shared 3 tracks on social media',
      reward: 30,
      time: '32 min ago'
    },
    {
      id: '4',
      user: 'SolanaSound',
      action: 'left comments on 10 tracks',
      reward: 40,
      time: '1 hour ago'
    },
    {
      id: '5',
      user: 'PolyRhythm',
      action: 'redeemed AudioFi tokens for an exclusive NFT',
      reward: -250,
      time: '2 hours ago'
    }
  ];

  const handleTabChange = (tab: 'tasks' | 'rewards' | 'activity') => {
    setActiveTab(tab);
  };

  const handleClaimReward = () => {
    toast.success("Reward claimed! 5 AudioFi tokens added to your wallet");
  };

  const handleCompleteTask = (taskId: string) => {
    toast.success("Task completed! You earned AudioFi tokens");
  };

  const handleRedeemReward = (rewardId: string) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (reward) {
      toast.success(`Redeemed ${reward.title}!`);
    }
  };

  return (
    <div className="bg-secondary rounded-xl border border-gray-800 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-primary" />
            Listener Farming
          </h2>
          
          <div className="flex items-center space-x-1 py-1 px-2 bg-muted rounded-md">
            <Trophy className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">178 AFI</span>
          </div>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Daily Listening Goal</h3>
            <span className="text-sm text-gray-400">45/60 min</span>
          </div>
          <Progress value={75} className="h-2" />
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-400">Earn 30 AFI tokens when completed</span>
            <span className="text-xs text-primary font-medium">75% complete</span>
          </div>
        </div>
        
        <div className="flex border-b border-gray-800 mb-4">
          <button
            className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'tasks' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
            onClick={() => handleTabChange('tasks')}
          >
            Tasks
          </button>
          <button
            className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'rewards' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
            onClick={() => handleTabChange('rewards')}
          >
            Rewards
          </button>
          <button
            className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'activity' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
            onClick={() => handleTabChange('activity')}
          >
            Activity
          </button>
        </div>
      </div>
      
      <ScrollArea className="h-[400px]">
        {activeTab === 'tasks' && (
          <div className="px-6 pb-6 grid gap-4">
            {tasks.map(task => (
              <Card key={task.id} className="bg-muted/30 border-gray-800">
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${task.isCompleted ? 'bg-primary/20' : 'bg-muted'}`}>
                        {task.icon}
                      </div>
                      <CardTitle className="text-base">{task.title}</CardTitle>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Trophy className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">{task.reward}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <CardDescription className="mb-3">{task.description}</CardDescription>
                  <div className="flex items-center justify-between">
                    <Progress value={task.progress} className="h-1.5 flex-1 mr-4" />
                    <Button 
                      variant={task.isCompleted ? "outline" : "default"}
                      size="sm" 
                      className={`text-xs ${task.isCompleted ? 'bg-transparent border-primary text-primary' : 'bg-primary text-white'}`}
                      onClick={() => handleCompleteTask(task.id)}
                      disabled={task.isCompleted}
                    >
                      {task.isCompleted ? 'Claimed' : 'Claim'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {activeTab === 'rewards' && (
          <div className="px-6 pb-6 grid gap-4">
            {rewards.map(reward => (
              <Card key={reward.id} className="bg-muted/30 border-gray-800">
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center space-x-3">
                    {reward.icon}
                    <div>
                      <CardTitle className="text-base">{reward.title}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs px-2 py-0.5 bg-muted rounded-full">{reward.type}</span>
                        <span className="text-xs px-2 py-0.5 bg-muted rounded-full">{reward.chain}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <CardDescription className="mb-3">{reward.description}</CardDescription>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Trophy className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">{reward.amount > 1 ? `${reward.amount} tokens` : '1 item'}</span>
                    </div>
                    <Button 
                      variant="default"
                      size="sm" 
                      className="text-xs bg-primary text-white"
                      onClick={() => handleRedeemReward(reward.id)}
                    >
                      Redeem <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {activeTab === 'activity' && (
          <div className="px-6 pb-6">
            <div className="relative pl-6 border-l border-gray-800">
              {activities.map((activity, index) => (
                <div key={activity.id} className="mb-6 relative">
                  <div className="absolute -left-[29px] w-4 h-4 rounded-full bg-secondary border-4 border-gray-800"></div>
                  
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{activity.user}</span>
                    <div className="flex items-center text-xs text-gray-400">
                      <Clock className="h-3 w-3 mr-1" />
                      {activity.time}
                    </div>
                  </div>
                  
                  <p className="text-sm mb-2">{activity.action}</p>
                  
                  <div className="flex items-center space-x-1 text-xs font-medium">
                    <Trophy className="h-3 w-3 text-primary" />
                    <span className={activity.reward > 0 ? 'text-green-400' : 'text-red-400'}>
                      {activity.reward > 0 ? `+${activity.reward}` : activity.reward} AFI
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default FarmingRewards;
