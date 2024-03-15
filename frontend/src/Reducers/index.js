import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "../Slices/authreducer"

import profileReducer from "../Slices/Profileslice";
import cartReducer from "../Slices/Cartslice"
// import courseReducer from "../slices/courseSlice"
// import viewCourseReducer from "../slices/viewCourseSlice"

const rootReducer  = combineReducers({
    auth: authReducer,
    profile:profileReducer,
    cart:cartReducer,
    // course:courseReducer,
    // viewCourse:viewCourseReducer,
})

export default rootReducer