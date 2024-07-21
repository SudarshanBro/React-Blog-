import { createSlice } from "@reduxjs/toolkit";
import STATUSES from "../src/globals/status/statuses";
import axios from "axios";
import API from "../src/http/axiosInstance";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    inputData: null,
    status: null,
    deleteStatus: null,
    editStatus: false,
  },
  reducers: {
    setinputData: (state, action) => {
      state.inputData = action.payload;
      console.log(state.inputData);
    },
    setstatus: (state, action) => {
      state.status = action.payload;
    },
    setDeleteStatus: (state, action) => {
      state.deleteStatus = action.payload;
    },
    setEditStatus: (state, action) => {
      state.editStatus = action.payload;
    },
  },
});
export const { setinputData, setstatus, setDeleteStatus, setEditStatus } =
  blogSlice.actions;
export default blogSlice.reducer;
//add blog
export function addBlog(data) {
  return async function addBlogThunk(dispatch) {
    dispatch(setstatus(STATUSES.LOADING));
    try {
      const response = await API.post("blog", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        dispatch(setstatus(STATUSES.SUCCESS));
      } else {
        dispatch(setstatus(STATUSES.ERROR));
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
      dispatch(setstatus(STATUSES.ERROR));
    }
  };
}
//fetch blog
export function fetchBlog() {
  return async function fetchBlog(dispatch) {
    dispatch(setstatus(STATUSES.LOADING));
    try {
      const res = await API.get("blog");

      if (res.status === 200 && res.data.data.length > 0) {
        dispatch(setinputData(res.data.data));
        dispatch(setstatus(STATUSES.SUCCESS));
      } else {
        dispatch(setstatus(STATUSES.ERROR));
      }
    } catch (error) {
      dispatch(setstatus(STATUSES.ERROR));
    }
  };
}
//delete blog
export function deleteBlog(id) {
  return async function delteBlogThunk(dispatch) {
    dispatch(setstatus(STATUSES.LOADING));
    try {
      const response = await API.delete(`blog/${id}`);
      if (response.status === 200) {
        dispatch(setDeleteStatus(true));
      } else {
        dispatch(setDeleteStatus(null));
      }
    } catch (error) {
      dispatch(setDeleteStatus(null));
    }
  };
}
//edit blog
export function editBlog(data, id) {
  return async function editBlogThunk(dispatch) {
    dispatch(setstatus(STATUSES.LOADING));

    try {
      const response = await API.patch(`blog/${id}`, data);
      if (response.status === 200) {
        dispatch(setEditStatus(true));
      } else {
        dispatch(setEditStatus(null));
      }
    } catch (error) {
      alert(error?.res?.data?.message);
      dispatch(setEditStatus(null));
    }
  };
}
//fetch single blog
export function fetchSingleBlog(id) {
  return async function fetchSingleBlogThunk(dispatch) {
    setstatus(STATUSES.LOADING);
    try {
      const res = await API.get(`blog/${id}`);
      if (res.status === 200) {
        dispatch(setstatus(STATUSES.SUCCESS));
        dispatch(setinputData(res.data.data));
      } else {
        dispatch(setstatus(STATUSES.ERROR));
      }
    } catch (error) {
      console.log(error?.res?.data?.message);
      dispatch(setstatus(STATUSES.ERROR));
    }
  };
}
