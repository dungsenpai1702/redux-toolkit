// import { createStore } from "redux";
// import rootReducer from "./reducer";
// import { composeWithDevTools } from 'redux-devtools-extension'

// const composeEnhancers = composeWithDevTools();



// const store = createStore(rootReducer, composeEnhancers);
// // 3 tham số
// // rootReducer là 1 function dùng để cập nhật lại state trong store dựa trên action
// // initValue tạo tham số mặc định
// // enhancers dùng để cấu hình các middleware




// export default store

import { configureStore } from '@reduxjs/toolkit';
import { filterSlice } from './Filters/FilterSlice';
import { todoSlice } from './Todo/TodoSlice';

const store = configureStore({
    reducer: {
        filters: filterSlice.reducer,
        todoList: todoSlice.reducer
    }
})

export default store;