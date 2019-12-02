import { ADD_CONTACT, DELETE_CONTACT, FETCH_CONTACTS, EDIT_CONTACT, REQUEST_SUCCESS, REQUEST_STARTED, REQUEST_FAIL, SORT_CONTACTS } from './types';
import axios from 'axios';

const apiUrl = 'https://5de25fdd0929540014dc3518.mockapi.io/api/contacts';

export const addContact = data => {
  console.log(data);
  return (dispatch) => {
    dispatch(requestStarted());
    return axios.post(`${apiUrl}`, data)
      .then(response => {
        console.log(response);
        dispatch(addContactSuccess(response.data))
        dispatch(requestSuccess('ADDED'));
      })
      .catch(error => {
        dispatch(requestFail());
        throw(error);
      });
  };
};

export const addContactSuccess =  data => {
  return {
    type: ADD_CONTACT,
    payload: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      status: data.status
    }
  }
};

export const deleteContactSuccess = id => {
  return {
    type: DELETE_CONTACT,
    payload: {
      id
    }
  }
}

export const requestSuccess = (payload) => {
  return {
    type: REQUEST_SUCCESS,
    payload
  }
}

export const requestFail = () => {
  return {
    type: REQUEST_FAIL,
  }
}

export const requestStarted = () => {
  return {
    type: REQUEST_STARTED,
  }
}

export const deleteContact = index => {
  return (dispatch) => {
    dispatch(requestStarted());
    return axios.delete(`${apiUrl}/${index}`)
      .then(response => {
        dispatch(deleteContactSuccess(response.data));
        dispatch(requestSuccess('DELETED'));
      })
      .catch(error => {
        dispatch(requestFail());
        throw(error);
      });
  };
};

export const fetchContacts = contacts => {
  return {
    type: FETCH_CONTACTS,
    contacts
  }
};

export const fetchAllContacts = () => {
  return (dispatch) => {
    dispatch(requestStarted());
    return axios.get(apiUrl)
      .then(response => {
        dispatch(fetchContacts(response.data));
        dispatch(requestSuccess('FETCHED'));
      })
      .catch(error => {
        dispatch(requestFail());
        throw(error);
      });
  };
};

export const editContactSuccess = (data) => {
    return {
      type: EDIT_CONTACT,
      payload: {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        status: data.status
      }
    }
  };
  
  export const editContact = (data) => {
    return (dispatch) => {
      dispatch(requestStarted());
      return axios.put(`${apiUrl}/${data.id}`, data)
        .then(response => {
          dispatch(editContactSuccess(response.data))
          dispatch(requestSuccess('EDITED'));
        })
        .catch(error => {          
          dispatch(requestFail());
          throw(error);
        });
    };
  };

  export const sortContacts = (contacts) => {
    return {
      type: SORT_CONTACTS,
      contacts
    }
  };
