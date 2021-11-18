import { configureStore } from "@reduxjs/toolkit";
import listimagesReducer from "./MainSlice";

export default configureStore({
  reducer: {
    listimages: listimagesReducer,
  },
});
