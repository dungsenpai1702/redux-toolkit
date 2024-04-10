
// const initState = [
//     {
//         id: 1,
//         title: 'Làm tiếng anh',
//         completed: false,
//     },
//     {
//         id: 2,
//         title: 'Code ASM AND Rest API',
//         completed: false,
//     },
//     {
//         id: 3,
//         title: 'Code ASM React native',
//         completed: false,
//     },
//     {
//         id: 4,
//         title: 'Làm lab AND Rest API',
//         completed: false,
//     },


// ]

// const todoReducer = (state = initState, action) => {
//     // console.log("state: ", state);
//     // console.log("action", action);
//     // console.log(action.payload);
//     switch (action.type) {
//         case "todoList/addTodo":
//             return [
//                 ...state,
//                 action.payload
//             ]

//         case "todoLists/updateTodo":
//             return state.map(item => item.id == action.payload.id ? { ...item, completed: !item.completed } : item)


//         default:
//             return state;
//     }
// }


// export default todoReducer;


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APP_URL, apiAddNewTodo, apiUpdateTodo, getListTodo } from "../../JsonServer/API";

export const todoSlice = createSlice({
    name: 'todoList',
    initialState: {
        status: 'idle',
        todos: [
            
        ]
    },
    reducers: {
        addTodo: (state, action) => {
            state.push(action.payload);
        },
        updateTodo: (state, action) => {
            const currentTodo = state.find(todo => todo.id == action.payload);
            currentTodo.completed = !currentTodo.completed;

        }
    },
    extraReducers: builder => {
        builder.addCase(fetchTodos.pending, (state, action) => {
            state.status = 'loading'
            // console.log(state);
        }).addCase(fetchTodos.fulfilled, (state, action) => {
            state.todos = action.payload;
            state.status = 'idle'
            // console.log(state);
        }).addCase(addNewTodo.fulfilled, (state, action) => {
            state.status = 'idle';
            state.todos.push(action.payload);
        }).addCase(updateTodoNew.fulfilled, (state, action) => {
            let currentTodo = state.todos.find(todo => todo.id == action.payload.id);
            currentTodo.completed = !currentTodo.completed;
            console.log("currentTodo:", currentTodo);
        })
    }
})


export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const res = await getListTodo();
    return res
})

export const addNewTodo = createAsyncThunk('todos/addNewTodo', async (newTodo) => {
    try {
        const data = await apiAddNewTodo(newTodo)
        console.log(data);
        return data;
    } catch (error) {
        console.log("Lỗi", error);
    }
})

export const updateTodoNew = createAsyncThunk('todos/updateTodo', async (item) => {
    const data = await apiUpdateTodo(item);
    // console.log("data: ", data);
    return data;

})
/*
    => todos/fetchTodos/pending
    => todos/fetchTodos/fullfilled
    => todos/fetchTodos/rejected
*/


// action (object) action creators ()=>{return action}
// thunk action (function) và thunk action creator ()=>{return thunk action} 

export function addTodos(todo) { //thunk function
    return function addTodosThunk(dispatch, getState) {
        console.log('[addTodosThunk]', getState());
        console.log({ todo });
        todo.title = "Don nha"
        dispatch(todoSlice.actions.addTodo(todo))
    }
}