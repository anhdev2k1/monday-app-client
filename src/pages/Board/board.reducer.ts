/* eslint-disable array-callback-return */
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { ITaskCard } from '~/components/Cards';
import { SERVER_API_URL } from '~/config/constants';
import { IFilter, TypeActions } from '~/shared/model';
import { IBoard, IBoardResponse, IBoardsResponse } from '~/shared/model/board';
import { IColumn } from '~/shared/model/column';
import { IResponseData } from '~/shared/model/global';
import { IItemInListValueSelect, ITask, IValueOfTask } from '~/shared/model/task';
import { serializeAxiosError } from '~/shared/reducers/reducer.utils';

const apiUrl = SERVER_API_URL;
// slice

interface IInitState {
  listBoard: {
    datas?: IBoard[];
    loading: boolean;
    error: boolean;
    status: string | number;
    mess: string;
  };
  currBoard: {
    data?: IBoard;
    filterGroup: IFilter;
    filterTask: IFilter;
    filterValueInColumns: IFilter[];
    loading: boolean;
    error: boolean;
    status: string | number;
    mess: string;
  };
  indexTab: number;
  searchValue: string;
  activeFilterItem: string[];
  taskToDisplay?: ITaskCard;
}

const initialState: IInitState = {
  listBoard: {
    datas: [],
    loading: false,
    error: false,
    status: '',
    mess: '',
  },
  currBoard: {
    data: undefined,
    filterGroup: new Map(),
    filterTask: new Map(),
    filterValueInColumns: [],
    loading: false,
    error: false,
    status: '',
    mess: '',
  },
  indexTab: 0,
  searchValue: '',
  activeFilterItem: [],
  taskToDisplay: undefined,
};

// body request

interface IParamsRequest {
  id: string;
  idWorkspace?: string;
}

interface ICreateBoard {
  idWorkspace: string;
  name: string;
}
interface IEditBoard {
  idBoard: string;
  name: string;
  description?: string;
}

// actions
// Get all board
export const getListBoards = createAsyncThunk(
  'get-list-boards-slice',
  async (params: IParamsRequest) => {
    const requestUrl = `${apiUrl}v1/api/workspace/${params.id}/board`;
    return await axios.get<IResponseData<IBoardsResponse<IBoard[]>>>(requestUrl);
  },
  { serializeError: serializeAxiosError },
);

// Get detail board
export const getBoardDetail = createAsyncThunk(
  'get-board-detail-slice',
  async (params: IParamsRequest) => {
    const requestUrl = `${apiUrl}v1/api/board/${params.id}`;
    return await axios.get<IResponseData<IBoardResponse<IBoard>>>(requestUrl);
  },
  { serializeError: serializeAxiosError },
);

// Create  board

export const createBoard = createAsyncThunk(
  'create-board-slice',
  async (bodyRequest: ICreateBoard) => {
    const requestUrl = `${apiUrl}v1/api/workspace/${bodyRequest.idWorkspace}/board`;
    return await axios.post<IResponseData<IBoard>>(requestUrl, {
      name: bodyRequest.name,
    });
  },
  { serializeError: serializeAxiosError },
);
// Edit board
export const editBoard = createAsyncThunk(
  'edit-board-slice',
  async (bodyRequest: IEditBoard) => {
    const { idBoard, ...rest } = bodyRequest;
    const requestUrl = `${apiUrl}v1/api/board/${idBoard}`;
    return await axios.patch<IResponseData<IBoard>>(requestUrl, rest);
  },
  { serializeError: serializeAxiosError },
);

// Delete board
export const deleteBoard = createAsyncThunk(
  'delete-board-slice',
  async (params: IParamsRequest) => {
    const { id, idWorkspace } = params;
    const requestUrl = `${apiUrl}v1/api/workspace/${idWorkspace}/board/${id}`;
    return await axios.delete<IResponseData<undefined>>(requestUrl);
  },
  { serializeError: serializeAxiosError },
);

const boardSlice = createSlice({
  name: 'BoardSlice',
  initialState,
  extraReducers(builder) {
    builder
      .addMatcher(isFulfilled(getListBoards), (state, action) => {
        state.listBoard.datas = action.payload.data.metadata?.boards;
        state.listBoard.error = false;
        state.listBoard.loading = false;
        state.listBoard.status = action.payload.data.status;
        state.listBoard.mess = action.payload.data.message;
      })
      .addMatcher(isPending(getListBoards), (state, action) => {
        state.listBoard.loading = true;
      })
      .addMatcher(isRejected(getListBoards), (state, action) => {
        state.listBoard.error = true;
        state.listBoard.loading = false;
        if (action?.error) {
          const { response } = action.error as { response: any };
          state.listBoard.status = response.status;
          state.listBoard.mess = response.message;
        }
      })
      .addMatcher(isFulfilled(getBoardDetail), (state, action) => {
        state.currBoard.data = action.payload.data.metadata?.board;
        const filterValueInColumns: IFilter[] = [];
        action.payload.data.metadata?.board.columns.forEach((column) => {
          filterValueInColumns.push(new Map());
        });
        state.currBoard.filterValueInColumns = filterValueInColumns;
        state.currBoard.filterGroup = new Map();
        state.currBoard.filterTask = new Map();
        state.listBoard.error = false;
        state.listBoard.loading = false;
        state.listBoard.status = action.payload.data.status;
        state.listBoard.mess = action.payload.data.message;
      })
      .addMatcher(isPending(getBoardDetail), (state, action) => {
        state.listBoard.loading = true;
      })
      .addMatcher(isRejected(getBoardDetail), (state, action) => {
        state.listBoard.error = true;
        state.listBoard.loading = false;
        if (action?.error) {
          const { response } = action.error as { response: any };
          state.listBoard.status = response.status;
          state.listBoard.mess = response.message;
        }
      })
      .addMatcher(isFulfilled(createBoard), (state, action) => {
        state.currBoard.data = action.payload.data.metadata;
        const newBoard = action.payload.data.metadata;
        if (newBoard && state.listBoard.datas) {
          state.listBoard.datas.push(newBoard);
        }
        state.currBoard.error = false;
        state.currBoard.loading = false;
        state.currBoard.status = action.payload.data.status;
        state.currBoard.mess = action.payload.data.message;
      })
      .addMatcher(isFulfilled(getBoardDetail), (state, action) => {
        state.currBoard.data = action.payload.data.metadata?.board;
      })
      .addMatcher(isPending(getBoardDetail), (state, action) => {
        state.currBoard.loading = true;
      })
      .addMatcher(isRejected(getBoardDetail), (state, action) => {
        state.currBoard.error = true;
        state.currBoard.loading = false;
        if (action?.error) {
          const { response } = action.error as { response: any };
          state.currBoard.status = response.status;
          state.currBoard.mess = response.message;
        }
      });
  },
  reducers: {
    // handle board
    handleEditCurrBoard: (
      state,
      action: PayloadAction<{
        key: 'name' | 'description';
        value: string;
      }>,
    ) => {
      const { value, key } = action.payload;
      if (state.currBoard.data) {
        state.currBoard.data[key] = value;
      }
    },
    handleAddGroup: (state, action) => {
      const newGroup = action.payload; // Thông tin của group mới cần thêm vào
      // const updatedGroups = state.currBoard.data?.groups?.concat(newGroup); // Tạo mảng mới kết hợp groups hiện tại và group mới

      if (state.currBoard.data) {
        const copiedGroups = state.currBoard.data.groups;
        copiedGroups.splice(newGroup.position, 0, newGroup);
        state.currBoard.data.groups = copiedGroups.map((group, index) => {
          if (group.position !== index) {
            group.position = index;
          }
          return group;
        });
      }
    },
    handleDelGroup: (
      state,
      action: PayloadAction<{
        position: number;
      }>,
    ) => {
      const { position } = action.payload; // Id của group cần xóa
      if (state.currBoard.data) {
        const copiedGroups = state.currBoard.data.groups;
        copiedGroups.splice(position, 1);
        state.currBoard.data.groups = copiedGroups.map((group, index) => {
          if (group.position !== index) {
            group.position = index;
          }
          return group;
        });
      }
    },

    handleUpdateAllGroup(
      state,
      action: PayloadAction<{
        startPosition: number;
        endPosition: number;
      }>,
    ) {
      const { startPosition, endPosition } = action.payload;

      if (state.currBoard.data) {
        const updatedGroupsCopy = [...state.currBoard.data.groups];
        const [removed] = updatedGroupsCopy.splice(startPosition, 1);
        updatedGroupsCopy.splice(endPosition, 0, removed);
        updatedGroupsCopy.forEach((group, index) => {
          if (group.position !== index) {
            group.position = index;
          }
        });
        state.currBoard.data.groups = updatedGroupsCopy;
      }
    },

    handleAddTaskToGroup: (
      state,
      action: PayloadAction<{
        groupId: string;
        newTask: ITask;
      }>,
    ) => {
      const { groupId, newTask } = action.payload;
      if (state.currBoard.data) {
        const foundGroup = state.currBoard.data.groups.find((group) => group._id === groupId)!;
        foundGroup.tasks.splice(newTask.position, 0, newTask);
        state.currBoard.data.groups[foundGroup.position] = foundGroup;
      }
    },
    handleDeleteTasksFromGroup: (
      state,
      action: PayloadAction<{ groupId: string; taskIds: string[] }>,
    ) => {
      const { groupId, taskIds } = action.payload;

      if (state.currBoard.data) {
        const group = state.currBoard.data.groups.find((group) => group._id === groupId)!;

        const newTasks: ITask[] = [];

        for (const [index, task] of group.tasks.entries()) {
          if (!taskIds.includes(task._id)) {
            newTasks.push({
              ...task,
              position: index,
            });
          }
        }

        group.tasks = newTasks;

        state.currBoard.data.groups[group.position] = group;
      }
    },
    handleEditTaskFromGroup: (
      state,
      action: PayloadAction<{
        groupId: string;
        taskId: string;
        key: 'name' | 'description';
        value: string;
      }>,
    ) => {
      const { groupId, taskId, key, value } = action.payload;

      const updatedGroups = state.currBoard.data?.groups
        ?.map((group) => {
          if (group._id === groupId) {
            return {
              ...group,
              tasks: group.tasks.map((task) => {
                if (task._id === taskId) {
                  return {
                    ...task,
                    [key]: value, // Update the specified key (name or description) with the new value
                  };
                }
                return task;
              }),
            };
          }
          return group;
        })
        .filter((group) => group !== undefined);

      if (state.currBoard.data && updatedGroups) {
        return {
          ...state,
          currBoard: {
            ...state.currBoard,
            data: {
              ...state.currBoard.data,
              groups: updatedGroups,
            },
          },
        };
      }
    },

    //  handle value

    handleAddValueListStatus: (state, action) => {
      const { columnId, newValueStatus } = action.payload;
      state.currBoard.data?.columns?.forEach((col) => {
        if (col._id === columnId) {
          col.defaultValues = col.defaultValues.concat(newValueStatus);
        }
      });

      return state;
    },

    handleEditValueListStatus: (
      state,
      action: PayloadAction<{
        columnId: string;
        valueSelectId: string;
        key: 'color' | 'value';
        value: string;
      }>,
    ) => {
      const { columnId, valueSelectId, key, value } = action.payload;
      const newDataColumn = state.currBoard.data?.columns?.map((col) => {
        if (col._id === columnId) {
          const newDefaultValues = col.defaultValues.map((val) => {
            if (val._id === valueSelectId) {
              return {
                ...val,
                [key]: value,
              };
            }
            return val;
          });
          return {
            ...col,
            defaultValues: newDefaultValues,
          };
        }
        return col;
      });

      if (newDataColumn && state.currBoard.data && state.currBoard.data.columns) {
        return {
          ...state,
          currBoard: {
            ...state.currBoard,
            data: {
              ...state.currBoard.data,
              columns: newDataColumn,
            },
          },
        };
      }

      return state;
    },

    handleEditValueSelected: (
      state,
      action: PayloadAction<{
        idValue: string | null;
        data: IItemInListValueSelect;
      }>,
    ) => {
      const { idValue, data } = action.payload;
      if (state.currBoard.data) {
        state.currBoard.data.groups = state.currBoard.data.groups.map((group) => {
          group.tasks = group.tasks.map((task) => {
            task.values = task.values.map((value) => {
              if (value._id === idValue) {
                value.valueId = { ...data };
              }
              return value;
            });
            if (state.taskToDisplay && state.taskToDisplay._id === task._id) {
              state.taskToDisplay = {
                ...state.taskToDisplay,
                ...task,
              };
            }
            return task;
          });
          return group;
        });
      }
    },
    handleDeleteValueListStatus: (
      state,
      action: PayloadAction<{
        columnId: string;
        valueSelectId: string;
      }>,
    ) => {
      const { columnId, valueSelectId } = action.payload;
      state.currBoard.data?.columns?.forEach((col) => {
        if (col._id === columnId) {
          col.defaultValues = col.defaultValues.filter((val) => val._id !== valueSelectId);
        }
      });
      return state;
    },
    setSearchValueInput: (state, action) => {
      state.searchValue = action.payload;
    },
    handleAddColumn: (
      state,
      action: PayloadAction<{
        newData: IColumn;
      }>,
    ) => {
      if (state.currBoard.data) {
        const newColumn = action.payload.newData;
        const copiedColumns = state.currBoard.data.columns;
        state.currBoard.filterValueInColumns.push(new Map());
        copiedColumns.splice(newColumn.position, 0, newColumn);
        state.currBoard.data.columns = copiedColumns.map((column, index) => {
          if (column.position !== index) {
            column.position = index;
          }
          return column;
        });
      }
    },
    handleEditColumn: (
      state,
      action: PayloadAction<{
        idColumn: string;
        key: 'name';
        value: string;
      }>,
    ) => {
      const { idColumn, key, value } = action.payload;
      const newColumns = state.currBoard.data?.columns.forEach((col) => {
        if (col._id === idColumn) {
          return (col[key] = value);
        }
        return col;
      });
      if (newColumns && state.currBoard.data) {
        return {
          ...state,
          currBoard: {
            ...state.currBoard,
            data: {
              ...state.currBoard.data,
              columns: newColumns,
            },
          },
        };
      }
    },
    handleDelColumnAndValueTask: (
      state,
      action: PayloadAction<{
        position: number;
      }>,
    ) => {
      const { position } = action.payload;
      state.currBoard.filterValueInColumns.splice(position, 1);
      if (state.currBoard.data) {
        const copiedColumns = state.currBoard.data.columns;
        copiedColumns.splice(position, 1);
        state.currBoard.data.columns = copiedColumns.map((column, index) => {
          if (column.position !== index) {
            column.position = index;
          }
          return column;
        });

        state.currBoard.data.groups = state.currBoard.data.groups.map((group) => {
          group.tasks = group.tasks.map((task) => {
            task.values.splice(position, 1);
            return task;
          });
          return group;
        });
      }
    },

    setIndexTab: (
      state,
      action: PayloadAction<{
        index: 0 | 1;
      }>,
    ) => {
      return {
        ...state,
        indexTab: action.payload.index,
      };
    },
    handleSetValueTask: (
      state,
      action: PayloadAction<{
        taskId: string;
        positionOfTask: number;
        positionOfValueTask: number;
        newValue: string;
      }>,
    ) => {
      const { newValue, positionOfTask, positionOfValueTask, taskId } = action.payload;

      if (state.currBoard.data) {
        state.currBoard.data.groups = state.currBoard.data.groups.map((group) => {
          const foundTask = group.tasks[positionOfTask];
          if (foundTask && foundTask._id === taskId) {
            foundTask.values[positionOfValueTask].value = newValue;
            group.tasks[positionOfTask] = foundTask;
          }
          return group;
        });
      }
    },

    handleEmptyValueTask: (
      state,
      action: PayloadAction<{
        taskId: string;
        positionOfTask: number;
        positionOfValueTask: number;
      }>,
    ) => {
      const { taskId, positionOfTask, positionOfValueTask } = action.payload;

      if (state.currBoard.data) {
        state.currBoard.data.groups = state.currBoard.data.groups.map((group) => {
          const foundTask = group.tasks[positionOfTask];
          if (foundTask._id === taskId) {
            foundTask.values[positionOfValueTask].value = '';
            group.tasks[positionOfTask] = foundTask;
          }
          return group;
        });
      }
    },

    resetCurrBoard(state) {
      state.currBoard = {
        data: undefined,
        filterGroup: new Map(),
        filterTask: new Map(),
        filterValueInColumns: [],
        loading: false,
        error: false,
        status: '',
        mess: '',
      };
    },

    handleAddValueIntoTask(
      state,
      action: PayloadAction<{
        position: number;
        newValuesOfTasks: IValueOfTask[];
      }>,
    ) {
      const { position, newValuesOfTasks } = action.payload;
      const valuesOfTasks = [...newValuesOfTasks];
      if (state.currBoard.data) {
        state.currBoard.data.groups = state.currBoard.data.groups.map((group) => {
          group.tasks = group.tasks.map((task) => {
            const value = valuesOfTasks.shift()!;
            const newValue: IValueOfTask = {
              _id: value._id,
              value: value.value,
              valueId: value.valueId,
              belongColumn: value.belongColumn,
              typeOfValue: value.typeOfValue,
            };
            task.values.splice(position, 0, newValue);
            return task;
          });

          return group;
        });
      }
    },

    updateValueAfterEditing(
      state,
      action: PayloadAction<{
        valueId: string;
        key: 'color' | 'value';
        value: string;
      }>,
    ) {
      const { valueId, key, value: editedValue } = action.payload;
      if (state.currBoard.data) {
        state.currBoard.data.groups = state.currBoard.data.groups.map((group) => {
          group.tasks = group.tasks.map((task) => {
            task.values = task.values.map((value) => {
              if (value.valueId && value.valueId._id === valueId) {
                value.valueId = {
                  ...value.valueId,
                  [key]: editedValue,
                };
              }
              return value;
            });
            if (state.taskToDisplay && state.taskToDisplay._id === task._id) {
              state.taskToDisplay = {
                ...state.taskToDisplay,
                ...task,
              };
            }
            return task;
          });
          return group;
        });
      }
    },

    setTaskToDisplay(
      state,
      action: PayloadAction<{
        task?: ITaskCard;
      }>,
    ) {
      state.taskToDisplay = action.payload.task;
    },

    handleRenameGroup(
      state,
      action: PayloadAction<{
        newName: string;
        position: number;
      }>,
    ) {
      const { newName, position } = action.payload;

      if (state.currBoard.data) {
        state.currBoard.data.groups[position].name = newName;
      }
    },

    // Filter

    handleFilterGroup(
      state,
      action: PayloadAction<{
        type: TypeActions;
        groupId: string;
        belongBoard: string;
      }>,
    ) {
      const { type, groupId, belongBoard } = action.payload;
      state.currBoard.filterGroup = new Map(state.currBoard.filterGroup);
      if (type === TypeActions.ADD) {
        state.currBoard.filterGroup.set(groupId, { parent: belongBoard });
      } else {
        state.currBoard.filterGroup.delete(groupId);
      }
    },

    handleFilterTask(
      state,
      action: PayloadAction<{
        type: TypeActions;
        taskName: string;
        belongGroup: string;
      }>,
    ) {
      const { type, taskName, belongGroup } = action.payload;
      state.currBoard.filterTask = new Map(state.currBoard.filterTask);

      if (type === TypeActions.ADD) {
        state.currBoard.filterTask.set(taskName, { parent: belongGroup });
      } else {
        state.currBoard.filterTask.delete(taskName);
      }
    },

    handleFilterColumn(
      state,
      action: PayloadAction<{
        type: TypeActions;
        position: number;
        valueName: string;
        belongColumn: string;
      }>,
    ) {
      const { type, position, valueName, belongColumn } = action.payload;
      state.currBoard.filterValueInColumns = [...state.currBoard.filterValueInColumns];

      if (type === TypeActions.ADD) {
        state.currBoard.filterValueInColumns[position].set(valueName, { parent: belongColumn });
      } else {
        state.currBoard.filterValueInColumns[position].delete(valueName);
      }
    },

    clearFilters(state) {
      state.currBoard.filterGroup = new Map();
      state.currBoard.filterTask = new Map();
      const newFilterColumns = state.currBoard.filterValueInColumns.map((_) => new Map());
      state.currBoard.filterValueInColumns = newFilterColumns;
    },
  },
});

export const {
  // handle board
  handleEditCurrBoard,
  resetCurrBoard,

  handleAddValueListStatus,
  handleEditValueListStatus,
  handleDeleteValueListStatus,
  //Group
  handleAddGroup,
  handleRenameGroup,
  handleDelGroup,
  handleUpdateAllGroup,
  //Value
  handleSetValueTask,
  handleEditValueSelected,
  setIndexTab,
  setSearchValueInput,
  // handle task
  handleAddTaskToGroup,
  handleDeleteTasksFromGroup,
  handleEditTaskFromGroup,
  setTaskToDisplay,
  // handle column
  handleAddColumn,
  handleEditColumn,
  handleDelColumnAndValueTask,
  // handle value
  handleEmptyValueTask,
  updateValueAfterEditing,

  // Handle value when add a new column
  handleAddValueIntoTask,

  // Filter
  handleFilterGroup,
  handleFilterTask,
  handleFilterColumn,
  clearFilters,
} = boardSlice.actions;

export default boardSlice.reducer;
