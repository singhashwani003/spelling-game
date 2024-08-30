import {createReducer} from "@reduxjs/toolkit";

const userReducer = createReducer(
    {
    user : null,
    valid : false,
    },
    (builder) => {
        builder.addCase("login" , (state , action) =>{
            state.user = action.payload;
            state.valid = true;
        });
    }
);
export default userReducer;