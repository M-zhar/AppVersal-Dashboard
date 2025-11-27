import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number;
  bgColor: string;
}

const StatsCard = ({ title, value, icon, trend, bgColor }: StatsCardProps) => {
  return (
    <div className={`${bgColor} rounded-lg p-6 text-white shadow-sm relative overflow-hidden`}>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            {icon}
          </div>
          {trend !== undefined && (
            <div className="flex items-center gap-1 text-sm">
              {trend > 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
        <div className="text-3xl font-bold mb-1">{value}</div>
        <div className="text-white/80 text-sm">{title}</div>
      </div>
      <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full"></div>
    </div>
  );
};

export default StatsCard;