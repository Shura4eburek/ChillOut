import React, { useEffect, useState } from 'react';
import { Wifi, WifiOff, Loader2 } from 'lucide-react';

interface ServerStatusProps {
  ip: string;
}

interface ServerData {
  online: boolean;
  players: {
    online: number;
    max: number;
  };
  version?: string;
}

export const ServerStatus: React.FC<ServerStatusProps> = ({ ip }) => {
  const [status, setStatus] = useState<ServerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        // Using mcsrvstat.us public API
        const response = await fetch(`https://api.mcsrvstat.us/2/${ip}`);
        const data = await response.json();
        setStatus(data);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    
    // Refresh every 60 seconds
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, [ip]);

  if (error) return null;

  return (
    <div className="animate-appear delay-200 mt-6 inline-flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded border-2 border-white/10 hover:border-white/30 transition-colors cursor-help group">
      {loading ? (
        <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
      ) : status?.online ? (
        <>
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mc-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-mc-green"></span>
          </span>
          <div className="text-left">
            <p className="text-white text-sm font-bold leading-none tracking-wide">
              ONLINE
            </p>
            <p className="text-gray-300 text-xs mt-1 font-minecraft">
              {status.players.online} / {status.players.max} Players
            </p>
          </div>
          <Wifi className="w-5 h-5 text-mc-green ml-2 opacity-50 group-hover:opacity-100 transition-opacity" />
        </>
      ) : (
        <>
          <span className="h-3 w-3 rounded-full bg-red-500"></span>
          <div className="text-left">
            <p className="text-red-400 text-sm font-bold leading-none">OFFLINE</p>
          </div>
          <WifiOff className="w-5 h-5 text-red-500 ml-2" />
        </>
      )}
    </div>
  );
};
