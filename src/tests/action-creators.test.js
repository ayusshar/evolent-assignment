import * as actions from '../actions'
import * as types from '../actions/types';
import {SAMPLE_PAYLOAD as payload} from '../constants';

describe('actions', () => {

    it('should create an action to add contact', () => {
        const expectedAction = {
            type: types.ADD_CONTACT,
            payload

        }
        expect(actions.addContactSuccess(payload)).toEqual(expectedAction)
    });

    it('should create an action to edit contact', () => {
        const payload1 = Object.assign({}, payload, {id: "1"});

        const expectedAction = {
            type: types.EDIT_CONTACT,
            payload: payload1
        }
        expect(actions.editContactSuccess(payload1)).toEqual(expectedAction)
    });

    it('should create an action to delete contact', () => {
        const id = "1";

        const expectedAction = {
            type: types.DELETE_CONTACT,
            payload: {
                id
            }

        }
        expect(actions.deleteContactSuccess(id)).toEqual(expectedAction)
    });


    it('should create an action to fetch contacts', () => {
        const payload1 = Object.assign({}, payload, {id: "1"});
        const contacts = [
            payload1

        ]
        const expectedAction = {
            type: types.FETCH_CONTACTS,
            contacts

        }
        expect(actions.fetchContacts(contacts)).toEqual(expectedAction)
    });

    it('should create an action to sort contacts', () => {
        const payload1 = Object.assign({}, payload, {id: "1"});
        const contacts = [
            payload1
        ]
        const expectedAction = {
            type: types.SORT_CONTACTS,
            contacts

        }
        expect(actions.sortContacts(contacts)).toEqual(expectedAction)
    });
})