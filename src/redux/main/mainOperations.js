import axios from 'axios';
import {
  CategoriesRequest,
  CategoriesSuccess,
  CategoriesError,
} from './mainActions';

export const getCategories = () => dispatch => {
  dispatch(CategoriesRequest());

  axios('/сategories')
    .then(({ data }) => dispatch(CategoriesSuccess(data)))
    .catch(error => dispatch(CategoriesError(error.message)));
};
