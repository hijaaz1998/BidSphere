import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState{
    admin: string;
}

const initialState: AdminState = {
    admin: ''
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        adminLogin: (state, action: PayloadAction<string>) => {
            state.admin = action.payload
        },
        adminLogout: (state, action : PayloadAction<string>) => {
            state.admin = action.payload
        }
    }
})

export const {adminLogin, adminLogout} = adminSlice.actions;
export const selectAdmin = (state: {admin: AdminState}) => state.admin.admin;

export default adminSlice.reducer;