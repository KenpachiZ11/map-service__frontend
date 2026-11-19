import { configureStore, type Middleware } from '@reduxjs/toolkit';
import { counterReducer } from '@/features/counter';
import { loginReducer } from '@/features/login';
import { registerReducer } from '@/features/registration';
import { authReducer, loggedIn, loggedOut } from '@/entities/auth';
import { saveAuthState } from '@/shared/lib/authStorage';
import { modalReducer } from '@/shared/lib/modal';
import { profileReducer } from '@/features/profile';
import { usersIdUpdReducer } from '@/features/users/usersSlice';

// Персист авторизации: при входе/выходе пишем состояние auth в sessionStorage.
const authPersistMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);
    if (loggedIn.match(action) || loggedOut.match(action)) {
      saveAuthState(store.getState().auth);
    }
    return result;
  };

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    modal: modalReducer,
    login: loginReducer,
    registration: registerReducer,
    auth: authReducer,
    profile: profileReducer,
    usersIdUpd: usersIdUpdReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authPersistMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;