import { TeamMember } from '../lib/supabase';

interface MemberCardProps {
  member: TeamMember;
  taskCount: number;
}

const MemberCard = ({ member, taskCount }: MemberCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Working':
        return 'bg-blue-500';
      case 'Break':
        return 'bg-green-500';
      case 'Meeting':
        return 'bg-amber-500';
      case 'Offline':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <img
            src={member.avatar || `https://ui-avatars.com/api/?name=${member.name}&background=random`}
            alt={member.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="font-semibold text-gray-900">{member.name}</div>
            <div className="text-sm text-gray-500">{member.email}</div>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(
            member.status
          )}`}
        >
          {member.status}
        </span>
      </div>
      <div className="text-sm text-gray-600">
        Active Tasks: <span className="font-semibold">{taskCount}</span>
      </div>
    </div>
  );
};

export default MemberCard;