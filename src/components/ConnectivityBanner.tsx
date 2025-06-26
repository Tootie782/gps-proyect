import { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

interface ConnectivityBannerProps {
  className?: string;
}

export function ConnectivityBanner({ className = '' }: ConnectivityBannerProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastSync, setLastSync] = useState<Date>(new Date());
  const [pendingChanges, setPendingChanges] = useState(0);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setLastSync(new Date());
      // Simular sincronización de cambios pendientes
      if (pendingChanges > 0) {
        setTimeout(() => setPendingChanges(0), 2000);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Simular cambios pendientes cuando está offline
    const interval = setInterval(() => {
      if (!isOnline) {
        setPendingChanges(prev => prev + Math.floor(Math.random() * 2));
      }
    }, 30000); // Cada 30 segundos

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, [isOnline, pendingChanges]);

  const formatLastSync = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'hace un momento';
    if (diffInMinutes < 60) return `hace ${diffInMinutes} minuto${diffInMinutes > 1 ? 's' : ''}`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    return `hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
  };

  if (isOnline && pendingChanges === 0) {
    return (
      <div className={`flex items-center space-x-2 text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg ${className}`}>
        <Wifi size={16} />
        <span>Sincronizado - {formatLastSync(lastSync)}</span>
      </div>
    );
  }

  if (isOnline && pendingChanges > 0) {
    return (
      <div className={`flex items-center space-x-2 text-sm text-blue-700 bg-blue-50 px-3 py-2 rounded-lg ${className}`}>
        <RefreshCw size={16} className="animate-spin" />
        <span>Sincronizando {pendingChanges} cambio{pendingChanges > 1 ? 's' : ''}...</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 text-sm text-orange-700 bg-orange-50 px-3 py-2 rounded-lg ${className}`}>
      <WifiOff size={16} />
      <span>
        Sin conexión - {pendingChanges > 0 && `${pendingChanges} cambio${pendingChanges > 1 ? 's' : ''} pendiente${pendingChanges > 1 ? 's' : ''}`}
      </span>
    </div>
  );
}
