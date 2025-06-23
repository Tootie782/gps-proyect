import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: 'primary' | 'accent' | 'success' | 'warning' | 'danger';
  subtitle?: string;
}

export function StatCard({ title, value, icon: Icon, color = 'primary', subtitle }: StatCardProps) {
  const colorClasses = {
    primary: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    accent: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    success: 'bg-green-50 text-green-700 border-green-200',
    warning: 'bg-orange-50 text-orange-700 border-orange-200',
    danger: 'bg-red-50 text-red-700 border-red-200'
  };

  const iconColorClasses = {
    primary: 'text-emerald-600',
    accent: 'text-yellow-600',
    success: 'text-green-600',
    warning: 'text-orange-600',
    danger: 'text-red-600'
  };  return (
    <div className={`p-3 md:p-4 rounded-lg border-2 ${colorClasses[color]} transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-medium text-gray-600 mb-1 truncate">{title}</h3>
          <p className="text-lg md:text-xl font-bold truncate">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1 truncate">{subtitle}</p>
          )}
        </div>
        <div className={`p-1.5 md:p-2 rounded-lg bg-white/50 ${iconColorClasses[color]} flex-shrink-0 ml-2`}>
          <Icon size={16} className="md:w-5 md:h-5" />
        </div>
      </div>
    </div>
  );
}
