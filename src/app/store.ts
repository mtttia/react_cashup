import { configureStore } from '@reduxjs/toolkit'
import user from '../features/user'
import loading from '../features/loading'
import error from '../features/error'
import setting from '../features/setting'

const store = configureStore({
  reducer: {
    user,
    loading,
    error,
    setting,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


export default store