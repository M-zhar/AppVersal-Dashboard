import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { assignTask } from '../redux/slices/membersSlice';
import { supabase } from '../lib/supabase';

const TaskForm = () => {
  const dispatch = useDispatch();
  const { members } = useSelector((state: RootState) => state.members);

  const [selectedMember, setSelectedMember] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember || !taskTitle || !dueDate) return;

    setSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert({
          member_id: selectedMember,
          title: taskTitle,
          due_date: dueDate,
          progress: 0,
          completed: false,
        })
        .select()
        .single();

      if (error) throw error;

      if (data) {
        dispatch(assignTask(data));
        setTaskTitle('');
        setDueDate('');
        setSelectedMember('');
      }
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Assign Task</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Member
          </label>
          <select
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b5f97] focus:border-transparent"
            required
          >
            <option value="">Choose a member...</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Task Title
          </label>
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b5f97] focus:border-transparent"
            placeholder="Enter task title..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b5f97] focus:border-transparent"
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-[#5b5f97] text-white py-2 px-4 rounded-lg hover:bg-[#4a4d7f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Assigning...' : 'Assign Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;