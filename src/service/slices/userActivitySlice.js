// appSlice.js

import { createSlice } from '@reduxjs/toolkit';

const MAX_RECENT_ACTIVITIES = 15;

const UserActivitySlice = createSlice({
  name: 'app',
  initialState: {
    userData: {
      recentActivities: JSON.parse(localStorage.getItem("user_activity__")) || [],
    },
  },
  reducers: {
    updateRecentActivity: (state, action) => {
      const { activity } = action.payload;

      // Check if the activity is not already in the recentActivities
      if (!state.userData.recentActivities.includes(activity)) {
        // Add the new activity to the beginning
        state.userData.recentActivities.unshift(activity);

        // Limit the array to a maximum length
        state.userData.recentActivities = state.userData.recentActivities.slice(0, MAX_RECENT_ACTIVITIES);

        // Update local storage with the new user data
        localStorage.setItem('user_activity__', JSON.stringify(state.userData.recentActivities));
      }
    },
  },
});

export const { updateRecentActivity } = UserActivitySlice.actions;
export const selectUserData = (state) => state.app.userData;

export default UserActivitySlice.reducer;
