import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session"

import mainReducer from "./mainReducer";

const persistConfig = {
    key: "root",
    storage: storageSession, // 어디에 저장할 것인지
    // whitelist: ["mainReducer"] // 무엇을 저장할 것인지 (blacklist로 하면 그것만 제외하고 나머지를 저장)
    blacklist: []
}
const rootReducer = combineReducers({ // 여기에 reducer를 나열한다.
    mainReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer