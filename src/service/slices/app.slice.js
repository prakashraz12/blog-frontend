import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
      sessionId: localStorage.getItem("authId") || null
 
    },
    reducers: {
        setSessionId: (state, action) => {
            state.sessionId = action.payload;
            localStorage.setItem("authId", action.payload)
        },
        signOut:(state,action)=>{
            localStorage.removeItem("authId");
            state.sessionId = null
        }
       
    }
})

export const { setSessionId,signOut } = authSlice.actions;

export default authSlice.reducer;
