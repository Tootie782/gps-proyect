import { Activity } from "lucide-react";
import { ActivityCard } from "../ActivityCard";
import type { Activity as ActivityType } from "../../types/student";

interface RecentActivity extends ActivityType {
  subject: string;
}

interface StudentRecentActivitiesProps {
  activities: RecentActivity[];
  onActivityClick?: (activity: ActivityType, subject: string) => void;
}

export function StudentRecentActivities({
  activities,
  onActivityClick,
}: StudentRecentActivitiesProps) {  return (
    <div className="bg-white rounded-lg border border-gray-200 h-full flex flex-col">
      {/* Título compacto */}
      <div className="p-3 md:p-4 border-b border-gray-200 flex-shrink-0">
        <h2 className="text-sm md:text-base font-semibold text-gray-800 flex items-center">
          <Activity className="mr-2 w-4 h-4 md:w-5 md:h-5" />
          Actividades Recientes
        </h2>
      </div>

      {/* Lista de actividades con scroll */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 md:p-4">
        {activities.length > 0 ? (
          <div className="space-y-2 md:space-y-3">
            {activities.map((activity, index) => (
              <ActivityCard
                key={index}
                activity={activity}
                subject={activity.subject}
                onClick={onActivityClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Activity className="w-8 h-8 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-500">No hay actividades recientes</p>
          </div>
        )}
      </div>
    </div>
  );
}
