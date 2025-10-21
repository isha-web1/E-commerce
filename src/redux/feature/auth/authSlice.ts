import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the user object you expect from your backend
export interface User {
    email: string;
    name: string;
    // Add other user properties like role, id, etc.
}

interface AuthState {
    user: User | null;
    token: string | null; // JWT token, if your API uses one
}

const initialState: AuthState = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // 🔑 Action to set the user after successful login/signup
        setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            // You might also want to store the token in localStorage here
            // localStorage.setItem('token', action.payload.token);
        },
        // Action to clear the user upon logout
        logout: (state) => {
            state.user = null;
            state.token = null;
            // localStorage.removeItem('token');
        },
    },
});

export const { setUser, logout } = authSlice.actions;

// 🔑 Selector to easily access the user from any component
// You will use this selector inside your component with useSelector()
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;

export default authSlice.reducer;