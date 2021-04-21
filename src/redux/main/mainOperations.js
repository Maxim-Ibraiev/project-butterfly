import axios from 'axios';
import {
  categoriesRequest,
  categoriesSuccess,
  categoriesError,
} from './mainActions';

export const fetchCategories = () => dispatch => {
  dispatch(categoriesRequest());

  axios('/categories')
    .then(({ data }) => dispatch(categoriesSuccess(data.categories)))
    .catch(error => dispatch(categoriesError(error.message)));
};
