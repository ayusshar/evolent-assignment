import React, { Component } from 'react';
import Modal from './modal';
import { find } from 'lodash';
import { VALIDATION_MSG, DROPDOWN_VALUES } from '../constants';

export default class AddContact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: props.form,
            formErrors: {
                firstName: null,
                lastName: null,
                email: null,
                phone: null,
                status: null,
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.validateField = this.validateField.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        const { form, formErrors } = this.state;
        let formObj = {
            ...form,
            [name]: value
        };
        this.setState({ form: formObj }, () => {
            if (!Object.keys(formErrors).includes(name)) return;
            let formErrorsObj = {};
            const errorMsg = this.validateField(
                name,
                name === "status" ? this.state.form["status"] : value
            );
            formErrorsObj = { ...formErrors, [name]: errorMsg };
            this.setState({ formErrors: formErrorsObj });
        });
    }

    validateNumber = evt => {
        var theEvent = evt || window.event;
        var key;
        if (theEvent.type === "paste") {
            key = theEvent.clipboardData.getData("text/plain");
        } else {
            key = theEvent.keyCode || theEvent.which;
            key = String.fromCharCode(key);
        }
        var regex = /[0-9]|\./;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    };

    validateField(name, value) {
        let errorMsg = null;
        switch (name) {
            case "firstName":
                if (!value) errorMsg = VALIDATION_MSG.firstName;
                break;
            case "lastName":
                if (!value) errorMsg = VALIDATION_MSG.lastName;
                break;
            case "email":
                if (!value) errorMsg = VALIDATION_MSG.email;
                else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value))
                    errorMsg = VALIDATION_MSG.validEmail;
                break;
            case "phone":
                if (!value) errorMsg = VALIDATION_MSG.phone;
                else if (value.length < 10)
                    errorMsg = VALIDATION_MSG.validPhone;
                break;
            case "status":
                if (!value) errorMsg = VALIDATION_MSG.status;
                else if (!find(DROPDOWN_VALUES, ['value', value]))
                    errorMsg = VALIDATION_MSG.validStatus;
                break;
            default:
                break;
        }
        return errorMsg;
    };

    validateForm(form, formErrors, validateFunc) {
        const errorObj = {};
        Object.keys(formErrors).forEach(x => {
            let refValue = null;
            const msg = validateFunc(x, form[x], refValue);
            if (msg) errorObj[x] = msg;
        });
        return errorObj;
    };

    handleSubmit() {
        const { form, formErrors } = this.state;
        const errorObj = this.validateForm(form, formErrors, this.validateField);
        if (Object.keys(errorObj).length === 0) {
            this.props.handleAddEditContact(form);
        } else {
            this.setState({
                formErrors: errorObj
            })
        }
    };


    render() {
        const { modalTitle } = this.props;
        return (
            <Modal
                form={this.state.form}
                formErrors={this.state.formErrors}
                handleModalClose={this.props.handleModalClose}
                validateNumber={this.validateNumber}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                modalTitle={modalTitle}
            />
        )
    }

}
