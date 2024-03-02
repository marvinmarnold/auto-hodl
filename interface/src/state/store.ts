import { combineReducers, configureStore } from "@reduxjs/toolkit";

import walletReducer from "./walletReducer";

const rootReducer = combineReducers({
	wallet: walletReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type RootAction = ReturnType<typeof rootReducer>;

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export default store;
