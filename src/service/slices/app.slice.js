import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
      sessionId: sessionStorage.getItem("authId") || null
 
    },
    reducers: {
        setSessionId: (state, action) => {
            state.sessionId = action.payload;
            sessionStorage.setItem("authId", action.payload)
        },
        signOut:(state,action)=>{
            sessionStorage.removeItem("authId");
            state.sessionId = null
        }
       
    }
})

export const { setSessionId,signOut } = authSlice.actions;

export default authSlice.reducer;
