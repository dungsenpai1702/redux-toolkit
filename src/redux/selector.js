import { createSelector } from "@reduxjs/toolkit";

export const todoSelector = (state) => state.todoList.todos;
export const todoStatusSelector = (state) => state.todoList.status;
export const searchTextSelector = (state) => state.filters.search;

// export const todoFilterSelector = (state) => {
//     const todoFilers = state.todoList.filter(todo => {
//         return todo.title.includes(state.filters.search);
//     })

//     return todoFilers;
// }

export const todoFilterSelector = createSelector(todoSelector, searchTextSelector, (todoList, searchText) => {
    // console.log("Check TodoList", todoList);
    try {
        return todoList.filter(item => item.title.includes(searchText));
    } catch (error) {
        console.log("Lỗi:", error);
    }
})