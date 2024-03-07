import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    user: string;
}

const initialState: UserState = {
    user: '' 
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {

            state.user = action.payload; 
            
        },
        signup: (state, action: PayloadAction<string> ) => {
            console.log(state)
            console.log("action.payload",action.payload);
        },
        logout: (state) => {
            localStorage.removeItem('userToken')
            localStorage.removeItem('userData')
            state.user = '';
        }
    }
})

export const {login, signup, logout} = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user.user;


export default userSlice.reducer;