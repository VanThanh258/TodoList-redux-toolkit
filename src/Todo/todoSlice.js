import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'Todo',
    initialState:{
        task: [],
        taskID: 1,
    },
    reducers:{
        updateTaskID(state,action){
            state.taskID = action.payload;
        },
        saveTask(state,action){
            state.task = action.payload;
        },
        deledeTask(state,action){
            const current = state.task.findIndex(item => item.id = action.payload);
            state.task.splice(current,1);
        },
        toggleStatus(state,action){
            const current = state.task.find(item => item.id === action.payload);
            current.completed = !current.completed;
        }
    }
})

export const todoSliceAction = todoSlice.actions;
export default todoSlice;