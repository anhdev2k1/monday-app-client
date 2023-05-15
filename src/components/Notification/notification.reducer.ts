import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface INotification{
    isOpen: boolean,
    message: string,
    type: string,
    autoClose?: number
}
const initialState : INotification = {
    isOpen: false,
    message: '',
    type: '',
    autoClose: 500
}
export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
       isNotification: (state, action: PayloadAction<INotification>) => {
          return state = action.payload
       },
    },
 });

 export const {isNotification} = notificationSlice.actions
 export default notificationSlice.reducer