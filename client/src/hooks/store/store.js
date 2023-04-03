// import rootReducer from "../reducers";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import persistedReducer from "../reducers";

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultmiddleware) =>
    getDefaultmiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false // 이 설정을 넣지 않으면 https://github.com/klis87/redux-requests/issues/388 와 같은 오류로 고생함.
    }),
  devTools: process.env.REACT_APP_NODE_ENV !== 'production'
});

const persistor = persistStore(store);
const stores = { store, persistor}

export default stores;
