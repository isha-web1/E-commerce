import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './api/BaseApi';
import authReducer from './feature/auth/authSlice';
import registerReducer from './feature/RegisterSlice';
import cartReducer from './feature/cartSlice';



export const store = configureStore({
    reducer: {
        // [baseApi.reducerPath] is typically 'api'
        [baseApi.reducerPath]: baseApi.reducer,
        
        // 🔑 Add the new Auth Slice reducer
        auth: authReducer, 
        cart: cartReducer,
        
        // Your existing register slice
        register: registerReducer, 
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;