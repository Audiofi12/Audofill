
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Music, Radio, Headphones, ChevronDown, Search, Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    { name: 'Home', path: '/', icon: <Music className="h-4 w-4" /> },
    { name: 'Artist Dashboard', path: '/artist-dashboard', icon: <Radio className="h-4 w-4" /> },
    { name: 'AI Discovery', path: '/ai-discovery', icon: <Search className="h-4 w-4" /> },
    { name: 'Listener Farming', path: '/listener-farming', icon: <Headphones className="h-4 w-4" /> },
  ];

  const blockchains = ['Ethereum', 'Solana', 'Polygon', 'Binance', 'Nero'];

  return (
    <nav className="py-4 border-b border-gray-800 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative h-8 w-8">
                <div className="absolute inset-0 rounded-full bg-primary animate-pulse-glow"></div>
                <div className="absolute inset-0.5 bg-background rounded-full flex items-center justify-center">
                  <Music className="h-5 w-5 text-primary" />
                </div>
              </div>
              <span className="font-bold text-xl gradient-text">AudioFi</span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-sm flex items-center space-x-1">
                    <span>Chains</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-secondary border border-gray-800">
                  {blockchains.map((chain) => (
                    <DropdownMenuItem key={chain} className="text-sm cursor-pointer">
                      {chain}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'bg-secondary text-primary'
                    : 'text-gray-400 hover:text-white hover:bg-secondary/60'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-primary"></span>
            </Button>
            
            <Avatar className="h-8 w-8 border border-gray-800">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AF</AvatarFallback>
            </Avatar>
            <Button className="bg-blue-600 text-[13px]">
              Connect Wallet
            </Button>
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 py-2 space-y-1 animate-fade-in">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium rounded-md ${
                  isActive(item.path)
                    ? 'bg-secondary text-primary'
                    : 'text-gray-400 hover:text-white hover:bg-secondary/60'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
            
            <div className="pt-2 mt-2 border-t border-gray-800">
              <p className="px-4 py-2 text-xs font-medium text-gray-400">Connected Chains</p>
              <div className="px-4 py-2 flex flex-wrap gap-2">
                {blockchains.map((chain) => (
                  <span key={chain} className="chain-pill">{chain}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
