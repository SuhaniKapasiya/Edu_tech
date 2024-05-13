import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "../Slices/authreducer"

import profileReducer from "../Slices/Profileslice";
import cartReducer from "../Slices/Cartslice"
import courseReducer from "../Slices/courseSlice"
import viewCourseReducer from "../Slices/viewCourseSlice"

const rootReducer  = combineReducers({
    auth: authReducer,
    profile:profileReducer,
    cart:cartReducer,
    course:courseReducer,
    viewCourse:viewCourseReducer,
})

export default rootReducer