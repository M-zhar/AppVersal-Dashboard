import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TeamMember, Task } from '../../lib/supabase';

interface MembersState {
  members: TeamMember[];
  tasks: Task[];
  loading: boolean;
}

const initialState: MembersState = {
  members: [],
  tasks: [],
  loading: false,
};

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    setMembers: (state, action: PayloadAction<TeamMember[]>) => {
      state.members = action.payload;
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    updateStatus: (
      state,
      action: PayloadAction<{ memberId: string; status: TeamMember['status'] }>
    ) => {
      const member = state.members.find((m) => m.id === action.payload.memberId);
      if (member) {
        member.status = action.payload.status;
      }
    },
    assignTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTaskProgress: (
      state,
      action: PayloadAction<{ taskId: string; progress: number }>
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.taskId);
      if (task) {
        task.progress = Math.min(100, Math.max(0, action.payload.progress));
        task.completed = task.progress === 100;
      }
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setMembers,
  setTasks,
  updateStatus,
  assignTask,
  updateTaskProgress,
  removeTask,
  setLoading,
} = membersSlice.actions;

export default membersSlice.reducer;