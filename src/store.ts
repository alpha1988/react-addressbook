import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./root-reducer";
import { setUsersListMiddleware } from "./features/addons/set-users-list.middleware";

export const store = createStore(rootReducer, applyMiddleware(setUsersListMiddleware));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;