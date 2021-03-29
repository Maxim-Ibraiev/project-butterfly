import { combineReducers } from '@reduxjs/toolkit';
import main from './main/mainReducer';
import user from './user/userReducers';

export default combineReducers({ main, user });
