import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { updateStatus } from '../redux/slices/membersSlice';
import { supabase } from '../lib/supabase';

const StatusSelector = () => {
  const dispatch = useDispatch();
  const { currentUserId } = useSelector((state: RootState) => state.role);
  const { members } = useSelector((state: RootState) => state.members);

  const currentMember = members.find((m) => m.id === currentUserId);

  const statuses: Array<'Working' | 'Break' | 'Meeting' | 'Offline'> = [
    'Working',
    'Break',
    'Meeting',
    'Offline',
  ];

  const handleStatusChange = async (status: typeof statuses[number]) => {
    if (!currentUserId) return;

    try {
      const { error } = await supabase
        .from('team_members')
        .update({ status })
        .eq('id', currentUserId);

      if (error) throw error;

      dispatch(updateStatus({ memberId: currentUserId, status }));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getButtonClass = (status: string) => {
    const isActive = currentMember?.status === status;
    const baseClass = 'px-6 py-3 rounded-lg font-medium transition-all';

    if (isActive) {
      switch (status) {
        case 'Working':
          return `${baseClass} bg-blue-500 text-white shadow-lg`;
        case 'Break':
          return `${baseClass} bg-green-500 text-white shadow-lg`;
        case 'Meeting':
          return `${baseClass} bg-amber-500 text-white shadow-lg`;
        case 'Offline':
          return `${baseClass} bg-gray-500 text-white shadow-lg`;
        default:
          return `${baseClass} bg-gray-200 text-gray-700`;
      }
    }

    return `${baseClass} bg-gray-100 text-gray-700 hover:bg-gray-200`;
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Your Status</h3>
      <div className="grid grid-cols-2 gap-4">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => handleStatusChange(status)}
            className={getButtonClass(status)}
          >
            {status}
          </button>
        ))}
      </div>
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-600">
          Current Status:{' '}
          <span className="font-semibold text-gray-900">
            {currentMember?.status || 'Not Set'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatusSelector;