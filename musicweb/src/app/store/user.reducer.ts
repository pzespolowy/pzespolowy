import { createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { AppState } from './app-state.interface';
export const initialState: AppState = {};

export const userReducer = createReducer(
	initialState,
	on(UserActions.addUser, (_state, { user }): AppState => {
		_state = { ..._state, user: { ...user } };
		return _state;
	}),
	on(UserActions.removeUser, (_state): AppState => initialState)
);
