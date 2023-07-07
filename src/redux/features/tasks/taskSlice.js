import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TaskAPIs } from "../../../apis/taskApis";
import { message } from "antd";

const initialState = {
  isLoading: false,
  tasks: [],
  currentTask: {},
  errors: {},
};

export const actFetchTaskById = createAsyncThunk(
  "tasks/fetchTaskById",
  async (taskId) => {
    const task = await TaskAPIs.getTaskById(taskId);
    return task;
  }
);

export const actFetchAllTask = createAsyncThunk(
  "tasks/fetchAllTask",
  async (params = {}) => {
    const response = await TaskAPIs.getAllTasks(params);
    return {
      data: response.data,
    };
  }
);

export const actDeleteTaskById = createAsyncThunk(
  "tasks/deleteTaskById",
  async (id) => {
    await TaskAPIs.deleteTaskById(id);

    return null;
    //phần này mình không xử lí kết quả trả về nên có thể để return null
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    actSetTasks: (state, action) => {},
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    actCreateNewTaskSuccess: (state, action) => {
      message.success("Thêm task thành công!!");
    },
    resetCurrentTask: (state, action) => {
      state.currentTask = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actFetchAllTask.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(actFetchAllTask.rejected, (state, action) => {
      state.errors = {};
      state.isLoading = false;
    });
    builder.addCase(actFetchAllTask.fulfilled, (state, action) => {
      state.tasks = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(actFetchTaskById.fulfilled, (state, action) => {
      state.currentTask = action.payload;
    });
    builder.addCase(actDeleteTaskById.fulfilled, (state, action) => {
      message.success("Đã xóa Task!!");
    });
  },
});

export const actCreateNewTask = (task) => {
  return async (dispatch) => {
    try {
      await TaskAPIs.createTask(task);
      dispatch(actCreateNewTaskSuccess());
      dispatch(actFetchAllTask());
    } catch (error) {}
  };
};

export const { actSetTasks, setLoading, actCreateNewTaskSuccess } =
  taskSlice.actions;
export const tasksReducer = taskSlice.reducer;
