import {configureStore} from "@reduxjs/toolkit"
import applicantSlice from "./applicantSlice"
import updateApplicantSlice from "./updateApplicantSlice"
const store=configureStore({
    reducer:{
        applicantList:applicantSlice,
        singleApplicant:updateApplicantSlice
    }
})
export default store
