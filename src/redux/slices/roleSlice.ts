import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RoleState {
  currentRole: 'lead' | 'member';
  currentUser: string;
  currentUserId: string;
}

const initialState: RoleState = {
  currentRole: 'member',
  currentUser: 'John Doe',
  currentUserId: '',
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    switchRole: (state, action: PayloadAction<'lead' | 'member'>) => {
      state.currentRole = action.payload;
    },
    setUser: (state, action: PayloadAction<{ name: string; id: string }>) => {
      state.currentUser = action.payload.name;
      state.currentUserId = action.payload.id;
    },
  },
});

export const { switchRole, setUser } = roleSlice.actions;
export default roleSlice.reducer;