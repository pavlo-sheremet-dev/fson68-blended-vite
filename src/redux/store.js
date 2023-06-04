import { configureStore, isRejected, isFulfilled } from "@reduxjs/toolkit";
import filterSlice from "./filterSlice";
import { commentApi } from "./commentApi";

import toast from "react-hot-toast";

export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  if (isRejected(action)) {
    toast.error(action.payload.data);
  }

  if (isFulfilled(action)) {
    if (action.meta.arg.endpointName === "addNewComment") {
      toast.success("comment was added");
    }
  }

  return next(action);
};

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    [commentApi.reducerPath]: commentApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    commentApi.middleware,
    rtkQueryErrorLogger,
  ],
});
