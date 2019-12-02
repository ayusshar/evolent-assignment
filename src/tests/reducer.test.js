import reducer from '../reducers';
import * as types from '../actions/types';
import {SAMPLE_PAYLOAD as payload} from '../constants';

describe('reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                contacts: [],
                request: {}
            }
        )
    });

    it('should handle ADD_CONTACT', () => {
        expect(
            reducer({}, {
                type: types.ADD_CONTACT,
                payload,
            })
        ).toEqual({
            contacts: [
                payload
            ],
            request: {}
        });
    });

    it('should handle EDIT_CONTACT', () => {
        const payload1 = Object.assign({}, payload, { id: "1" });
        expect(
            reducer({},
                {
                    type: types.ADD_CONTACT,
                    payload: payload1,
                }, {
                type: types.EDIT_CONTACT,
                payload: payload1,
            })
        ).toEqual({
            contacts: [
                payload1
            ],
            request: {}
        });
    });

    it('should handle FETCH_CONTACTS', () => {
        const contacts = [Object.assign({}, payload, { id: "1" })];
        expect(
            reducer({},
                {
                    type: types.FETCH_CONTACTS,
                    contacts
                })
        ).toEqual({
            contacts,
            request: {}
        });
    });
})