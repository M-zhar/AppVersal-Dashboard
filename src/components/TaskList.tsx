import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { updateTaskProgress, removeTask } from '../redux/slices/membersSlice';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';

const TaskList = () => {
  const dispatch = useDispatch();
  const { currentUserId } = useSelector((state: RootState) => state.role);
  const { tasks } = useSelector((state: RootState) => state.members);

  const myTasks = tasks.filter((task) => task.member_id === currentUserId && !task.completed);

  const handleProgressChange = async (taskId: string, currentProgress: number, delta: number) => {
    const newProgress = Math.min(100, Math.max(0, currentProgress + delta));

    try {
      const { error } = await supabase
        .from('tasks')
        .update({ progress: newProgress, completed: newProgress === 100 })
        .eq('id', taskId);

      if (error) throw error;

      dispatch(updateTaskProgress({ taskId, progress: newProgress }));

      if (newProgress === 100) {
        setTimeout(() => {
          handleComplete(taskId);
        }, 500);
      }
    } catch (error) {
      console.error('Error updating task progress:', error);
    }
  };

  const handleComplete = async (taskId: string) => {
    try {
      const { error } = await supabase.from('tasks').delete().eq('id', taskId);

      if (error) throw error;

      dispatch(removeTask(taskId));
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  if (myTasks.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">My Tasks</h3>
        <div className="text-center py-8 text-gray-500">
          No tasks assigned yet.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        My Tasks ({myTasks.length})
      </h3>
      <div className="space-y-4">
        {myTasks.map((task) => (
          <div key={task.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{task.title}</h4>
                <p className="text-sm text-gray-500">
                  Due: {format(new Date(task.due_date), 'MMM dd, yyyy')}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#5b5f97]">{task.progress}%</div>
              </div>
            </div>

            <div className="mb-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#5b5f97] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleProgressChange(task.id, task.progress, -10)}
                disabled={task.progress === 0}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                -10%
              </button>
              <button
                onClick={() => handleProgressChange(task.id, task.progress, 10)}
                disabled={task.progress === 100}
                className="flex-1 px-4 py-2 bg-[#5b5f97] text-white rounded-lg hover:bg-[#4a4d7f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                +10%
              </button>
            </div>

            {task.progress === 100 && (
              <div className="mt-3 text-center text-sm text-green-600 font-medium">
                Task Completed!
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;