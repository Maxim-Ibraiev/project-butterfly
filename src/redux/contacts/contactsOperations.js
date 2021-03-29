import axios from 'axios';
import {
  addItemRequest,
  addItemSuccess,
  addItemError,
  deleteRequest,
  deleteSuccess,
  deleteError,
  itemsRequest,
  itemsSuccess,
  itemsError,
} from './contactsActions';

export const getItems = () => dispatch => {
  dispatch(itemsRequest());

  axios('/contacts')
    .then(({ data }) => dispatch(itemsSuccess(data)))
    .catch(error => dispatch(itemsError(error.message)));
};

export const addItem = item => dispatch => {
  dispatch(addItemRequest());

  axios
    .post('/contacts', item)
    .then(({ data }) => dispatch(addItemSuccess(data)))
    .catch(error => dispatch(addItemError(error.message)));
};

export const deleteItem = id => dispatch => {
  dispatch(deleteRequest());

  axios
    .delete(`/contacts/${id}`)
    .then(dispatch(deleteSuccess(id)))
    .catch(error => dispatch(deleteError(error.message)));
};
