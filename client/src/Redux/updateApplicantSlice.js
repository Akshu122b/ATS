import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    ApplicantDetails: {}
}
const updateAllicantSlice = createSlice({
    name: "updateApplicantSlice",
    initialState,
    reducers: {
        GetApplicant: (state, action) => {
            state.ApplicantDetails = action.payload
            console.log(action.payload)
        }
    }
})
export default updateAllicantSlice.reducer
export const { GetApplicant } = updateAllicantSlice.actions
