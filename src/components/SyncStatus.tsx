import { Wifi, WifiOff, AlertCircle } from 'lucide-react';

interface SyncStatusProps {
  status: 'sincronizado' | 'pendiente' | 'error';
  lastSync?: string;
}

export function SyncStatus({ status, lastSync = 'hace 2 minutos' }: SyncStatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'sincronizado':
        return {
          icon: Wifi,
          text: `Sincronizado - ${lastSync}`,
          color: 'text-green-600',
          bgColor: 'bg-green-50'
        };
      case 'pendiente':
        return {
          icon: WifiOff,
          text: 'Sincronización pendiente',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50'
        };
      case 'error':
        return {
          icon: AlertCircle,
          text: 'Error de sincronización',
          color: 'text-red-600',
          bgColor: 'bg-red-50'
        };
      default:
        return {
          icon: WifiOff,
          text: 'Estado desconocido',
          color: 'text-gray-600',
          bgColor: 'bg-gray-50'
        };
    }
  };

  const config = getStatusConfig();
  const StatusIcon = config.icon;

  return (
    <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${config.bgColor}`}>
      <StatusIcon size={16} className={config.color} />
      <span className={`text-sm font-medium ${config.color}`}>
        {config.text}
      </span>
    </div>
  );
}
