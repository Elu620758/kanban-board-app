// src/redux/boardSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;
  name: string;
  description: string;
  assignee: string;
  priority: string; // 'High', 'Medium', 'Low'
  dueDate: string;
}

interface Column {
  id: string;
  name: string;
  tasks: Task[];
}

interface Board {
  id: string;
  name: string;
  columns: Column[];
}

interface BoardState {
  boards: Board[];
}

const initialState: BoardState = {
  boards: [],
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addBoard: (state, action: PayloadAction<Board>) => {
      state.boards.push(action.payload);
    },
    deleteBoard: (state, action: PayloadAction<string>) => {
      state.boards = state.boards.filter(board => board.id !== action.payload);
    },
    addTask: (
      state,
      action: PayloadAction<{ boardId: string; columnId: string; task: Task }>
    ) => {
      const { boardId, columnId, task } = action.payload;
      const board = state.boards.find(b => b.id === boardId);
      const column = board?.columns.find(c => c.id === columnId);
      column?.tasks.push(task);
    },
    deleteTask: (
      state,
      action: PayloadAction<{ boardId: string; columnId: string; taskId: string }>
    ) => {
      const { boardId, columnId, taskId } = action.payload;
      const board = state.boards.find(b => b.id === boardId);
      const column = board?.columns.find(c => c.id === columnId);
      column!.tasks = column!.tasks.filter(task => task.id !== taskId);
    },
    updateTask: (
      state,
      action: PayloadAction<{ boardId: string; columnId: string; task: Task }>
    ) => {
      const { boardId, columnId, task } = action.payload;
      const board = state.boards.find(b => b.id === boardId);
      const column = board?.columns.find(c => c.id === columnId);
      const taskIndex = column?.tasks.findIndex(t => t.id === task.id);
      if (taskIndex !== undefined && taskIndex !== -1) {
        column!.tasks[taskIndex!] = task; // Update task details
      }
    },
    moveTask: (
      state,
      action: PayloadAction<{
        boardId: string;
        fromColumnId: string;
        toColumnId: string;
        taskId: string;
      }>
    ) => {
      const { boardId, fromColumnId, toColumnId, taskId } = action.payload;
      const board = state.boards.find(b => b.id === boardId);
      if (board) {
        const fromColumn = board.columns.find(c => c.id === fromColumnId);
        const toColumn = board.columns.find(c => c.id === toColumnId);
        if (fromColumn && toColumn) {
          const taskIndex = fromColumn.tasks.findIndex(t => t.id === taskId);
          if (taskIndex !== -1) {
            const [task] = fromColumn.tasks.splice(taskIndex, 1);
            toColumn.tasks.push(task); // Move task to the new column
          }
        }
      }
    },
  },
});

export const { addBoard, deleteBoard, addTask, deleteTask, updateTask, moveTask } = boardSlice.actions;
export default boardSlice.reducer;
