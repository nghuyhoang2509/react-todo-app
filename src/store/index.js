import {
  configureStore,
  createReducer,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

const initialState = {
  loading: false,
  error:"",
  project: [],
  user: "",
  projectSelected: {
    todo: [],
    inprogress: [],
    completed: [],
    name: "",
    id: "",
  },
};

export const addProject = createAsyncThunk("add_project", async (payload) => {
  const response = await addDoc(collection(db, "project"), {
    name: payload.name,
    todo: [],
    inprogress: [],
    completed: [],
    byuser: payload.email,
  });
  return {
    name: payload.name,
    todo: [],
    inprogress: [],
    completed: [],
    id: response.id,
    byuser: payload.email,
  };
});

export const deleteProject = createAsyncThunk("delete_project", async (payload) => {
  await deleteDoc(doc(db, "project",payload))
});

export const loadProject = createAsyncThunk("load_project", async (payload) => {
  const docRef = query(
    collection(db, "project"),
    where("byuser", "==", payload.email)
  );
  const loadSnap = await getDocs(docRef);
  if (!loadSnap.empty) {
    let data = [];
    loadSnap.forEach((snap) => data.push({ ...snap.data(), id: snap.id }));
    return { email: payload.email, state: data };
  } else {
    return { email: payload.email, state: [] };
  }
});

export const saveProject = createAsyncThunk("save_project", async (payload) => {
  await updateDoc(doc(db, "project", payload[0]), {
    [payload[1]]: payload[2],
  });
  return payload;
});

export const deleteError = createAction("delete_error")

export const setProjectSelected = createAction("set_project_selected");

const todos = createReducer(initialState, (builder) => {
  builder.addCase(deleteError, (state, action)=>{
    state.error =""
  })
  builder.addCase(saveProject.rejected,(state,action)=>{
    state.loading = false;
    state.error="Có lỗi xảy ra vui lòng thử lại"
  })
  builder.addCase(addProject.rejected,(state,action)=>{
    state.loading = false;
    state.error="Có lỗi xảy ra vui lòng thử lại"
  })
  builder.addCase(loadProject.rejected,(state,action)=>{
    state.loading = false;
    state.error="Có lỗi xảy ra vui lòng thử lại"
  })
  builder.addCase(saveProject.pending, (state, action) => {
    state.loading = false;
  });
  builder.addCase(addProject.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(deleteProject.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(deleteProject.fulfilled, (state, action) => {
    state.loading = false;
  });
  builder.addCase(deleteProject.rejected, (state, action) => {
    state.loading = false;
    state.error="Có lỗi xảy ra vui lòng thử lại"
  });
  builder.addCase(loadProject.pending, (state, action) => {
    state.loading = true;
  });
  builder.addCase(addProject.fulfilled, (state, action) => {
    state.loading = false;
    state.project = [...state.project, action.payload];
  });
  builder.addCase(saveProject.fulfilled, (state, action) => {
    state.loading = false;
    state.projectSelected[action.payload[1]] = action.payload[2];
  });
  builder.addCase(setProjectSelected, (state, action) => {
    state.projectSelected = action.payload;
  });
  builder.addCase(loadProject.fulfilled, (state, action) => {
    state.user = action.payload.email;
    state.loading = false;
    state.project = action.payload.state;
  });
});
const store = configureStore({
  reducer: todos,
});
export default store;
