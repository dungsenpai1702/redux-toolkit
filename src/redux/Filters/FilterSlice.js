

// const initState = {
//     search: '',
// }

// const filterReducer = (state = initState, action) => {
//     // console.log("state: ", state);
//     // console.log("action", action);
//     // console.log(action.payload);
//     switch (action.type) {
//         case "filters/searchFilterChange":
//             return {
//                 search: action.payload,
//             }


//         default:
//             return state;
//     }
// }


// export default filterReducer;

import { createSlice } from '@reduxjs/toolkit'


export const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        search: ''
    },
    reducers: {
        searchFilterChange: (state, action) => {
            state.search = action.payload
        }
    }
})