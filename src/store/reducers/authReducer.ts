import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {authApi} from "../../lib/api/api";
import {loginData, loginResponse} from "../../lib/types/types";
import Cookies from 'universal-cookie';

interface authState {
    isAuthorized: boolean,
    error_message: string
}

const initialState = {
    isAuthorized: false,
    error_message: ''
} satisfies authState as authState


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state){
            const cookies = new Cookies(null, { path: '/' });
            cookies.remove('token');
            state.isAuthorized = false;
        },
        initialize(state){
            const cookies = new Cookies(null, { path: '/' });
            if(cookies.get('token')){
                state.isAuthorized = true;
            }
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(login.fulfilled, (state, action)=>{
            if(action.payload.error_code) {
                // error
                state.error_message = action.payload.error_text || 'Unexpected error'
                return
            }
            const token = action.payload.data.token

            const cookies = new Cookies(null, { path: '/' });
            cookies.set('token', token);
            state.isAuthorized = true;
            state.error_message = ''
        })
    }
})

export const login = createAsyncThunk('login', async (data:loginData):Promise<loginResponse> => {
    return await authApi.login(data);
})

export const { logout, initialize} = authSlice.actions
export default authSlice.reducer