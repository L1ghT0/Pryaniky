import {ActionCreator, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {userdocsApi} from "../../lib/api/api";
import {
    createUserdocsResponse,
    getUserdocsResponse, removeItemResponse, setUserdocsResponse,
    userdocs,
    userdocsData,
    userdocsRowData
} from "../../lib/types/types";


type userdocsState = {
    userdocs: userdocsRowData[],
    cachedUserdocs: userdocsRowData[]
    loading: boolean
}

const initialState = {
    userdocs: [],
    cachedUserdocs: [],
    loading: false
} satisfies userdocsState as userdocsState

const userdocs = createSlice({
    name: 'userdocs',
    initialState,
    reducers: {
        cacheUserdocs(state, action) {
            state.userdocs = state.userdocs.filter((userdoc) => action.payload.id !== userdoc.data.id)
            state.cachedUserdocs.push({
                data: {...action.payload},
                additionalInfo: {
                    touched: false,
                    isNew: false,
                    stored: false
                }
            })
        },
        deleteUserdocsElem(state, action) {
            state.userdocs = state.userdocs.filter((userdoc) => action.payload.id !== userdoc.data.id)
        },
        addNew(state, action) {
            state.userdocs = [...state.userdocs, {...action.payload}]
        },
        setTouched(state, action) {
            state.userdocs = state.userdocs.map(userdoc => {
                if (userdoc.data.id === action.payload.id) {
                    userdoc.additionalInfo.touched = true
                }
                return userdoc
            })
        },
        setIsNew(state, action){
            state.userdocs = state.userdocs.map(userdoc => {
                if (userdoc.data.id === action.payload.id) {
                    userdoc.additionalInfo.isNew = action.payload.value
                }
                return userdoc
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserdocs.fulfilled, (state, action) => {
            if (action.payload.error_code) {
                // error
                return
            }
            const docs: userdocsRowData[] = action.payload.data.filter(a => !state.userdocs.find(b => a.id === b.data.id)).map(doc => {
                return {
                    data: doc,
                    additionalInfo: {
                        touched: false,
                        isNew: false,
                        stored: true
                    }
                }
            })
            state.userdocs = [...state.userdocs, ...docs]
            state.loading = false;
        });
        builder.addCase(getUserdocs.pending, (state, action)=>{
            state.loading = true;
        });
        builder.addCase(getUserdocs.rejected, (state, action)=>{
            state.loading = false;
        });
        builder.addCase(createNewItem.fulfilled, (state, action) => {
            if (action.payload.error_code) {
                // error
                return
            }
            // remove from cache
            state.cachedUserdocs = state.cachedUserdocs.filter((cachedUserdoc) => action.payload.oldId !== cachedUserdoc.data.id)

            state.userdocs = [...state.userdocs, {
                data: action.payload.data,
                additionalInfo: {
                    touched: false,
                    isNew: false,
                    stored: true
                }
            }]
        });
        builder.addCase(createNewItem.rejected, (state, action) => {
            console.log('Something went wrong! Item has NOT been added.')
            console.log(action)
            // clear cache
            // state.cachedUserdocs = state.cachedUserdocs.filter((cachedUserdoc) => cachedUserdoc.data.id !== action.meta.arg.id)
        });
        builder.addCase(setNewItem.fulfilled, (state, action) => {
            if (action.payload.error_code) {
                // error
                return
            }
            // remove from cache
            state.cachedUserdocs = state.cachedUserdocs.filter((cachedUserdoc) => action.payload.data.id !== cachedUserdoc.data.id)

            state.userdocs = [...state.userdocs, {
                data: action.payload.data,
                additionalInfo: {
                    touched: false,
                    isNew: false,
                    stored: true
                }
            }]
        })
        builder.addCase(removeItemFromUserdocs.fulfilled, (state, action)=>{
            // deleted
        })
    }
})

export const getUserdocs = createAsyncThunk<getUserdocsResponse>('getUserdocs', async (): Promise<getUserdocsResponse> => {
    return await userdocsApi.getUserdocs()
})
export const removeItemFromUserdocs = createAsyncThunk('removeItemFromUserdocs', async (data: userdocsRowData, thunkAPI): Promise<removeItemResponse | string> => {
    thunkAPI.dispatch(deleteUserdocsElem(data.data))
    // in case item does not stored on backend we do not need to make an api call
    return data.additionalInfo.stored ? await userdocsApi.removeItemFromUserdocs(data.data) : new Promise((resolve)=>resolve('deleted'))
})
export const createNewItem = createAsyncThunk('createNewItem', async (data: userdocs, thunkAPI): Promise<createUserdocsResponse> => {
    await thunkAPI.dispatch(cacheUserdocs(data))
    return await userdocsApi.createNewItem(data)
})
export const setNewItem = createAsyncThunk('setNewItem', async (data: userdocs, thunkAPI): Promise<setUserdocsResponse> => {
    await thunkAPI.dispatch(cacheUserdocs(data))
    return await userdocsApi.setUserdocs(data)
})

export const {cacheUserdocs, deleteUserdocsElem, addNew, setTouched, setIsNew} = userdocs.actions
export default userdocs.reducer