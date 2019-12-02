import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addContact, deleteContact, editContact, fetchAllContacts, sortContacts } from '../actions';
import AddEditContact from './add-edit-contact';
import Spinner from './spinner';
import Toaster from './toaster';
import { orderBy } from 'lodash';
import {SUCCESS_TEXT, ERROR_TEXT, COLUMN_HEADER} from '../constants';


class ContactList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAddEditContact: false,
      currentRowValues: {},
      modalTitle: "",
    }
    this.renderContacts = this.renderContacts.bind(this);
    this.addEditContact = this.addEditContact.bind(this);
    this.addEditContactModalClose = this.addEditContactModalClose.bind(this);
    this.showAddEditContactModal = this.showAddEditContactModal.bind(this);
    this.sortByName = this.sortByName.bind(this);
    this.showToaster = this.showToaster.bind(this);
    this.currentSortValue = "";
  }

  componentDidMount() {
    this.props.fetchAllContacts();
  }

  render() {
    const { start } = this.props.request;
    return (
      <div className="contact-list">
        <button type="button" title="ADD CONTACT" className="glyphicon glyphicon-plus add col-xs-1 text-success" onClick={() => this.showAddEditContactModal()} />
        <ul className="">
          <li className="contacts-header row">
            <span className="col-xs-2 sortable-column" onClick={() => this.sortByName('firstName')}>{COLUMN_HEADER.firstName}</span>
            <span className="col-xs-2 sortable-column" onClick={() => this.sortByName('lastName')}>{COLUMN_HEADER.lastName}</span>
            <span className="col-xs-2 sortable-column" onClick={() => this.sortByName('email')}>{COLUMN_HEADER.email}</span>
            <span className="col-xs-2 sortable-column" onClick={() => this.sortByName('phone')}>{COLUMN_HEADER.phone}</span>
            <span className="col-xs-2 sortable-column" onClick={() => this.sortByName('status')} >{COLUMN_HEADER.status}</span>
            <span className="col-xs-2">{COLUMN_HEADER.actionButtons}</span>
          </li>
          {this.renderContacts()}
        </ul>
        {this.state.showAddEditContact &&
          <AddEditContact
            handleAddEditContact={this.addEditContact}
            handleModalClose={this.addEditContactModalClose}
            form={this.state.currentRowValues}
            modalTitle={this.state.modalTitle} />
        }
        {start && <Spinner />}
        {
          this.showToaster()
        }

      </div>
    );
  }

  showToaster() {
    const { success, fail, text } = this.props.request;
    let message, classname = "";
    if (success) {
      message = `${SUCCESS_TEXT} ${text}`;
      classname = "show success";
    } else if (fail) {
      message = ERROR_TEXT;
      classname = "show error";
    } else {
      classname = "";
    }
    return (
      <Toaster message={message} classname={classname} />
    )
  }

  sortByName(value) {
    let order = 'asc';
    if (this.currentSortValue === value) {
      order = 'desc';
      this.currentSortValue = '';
    } else {
      this.currentSortValue = value;
    }   
    const sortedContacts = orderBy(this.props.contacts, [value], [order])
    this.props.sortContacts(sortedContacts);
  }

  showAddEditContactModal(rowValues) {
    if (rowValues) {
      this.setState({
        currentRowValues: rowValues,
        modalTitle: "Edit",
        showAddEditContact: true
      })
    } else {
      this.setState({
        modalTitle: "Add",
        currentRowValues: {},
        showAddEditContact: true,
      })
    }


  }

  addEditContact(form) {
    if (this.state.modalTitle === "Add") {
      this.props.addContact(form);
    } else {
      this.props.editContact(form);
    }
    this.addEditContactModalClose();
  }

  addEditContactModalClose() {
    this.setState({
      showAddEditContact: false
    });
  }

  deleteContact(id) {
    this.props.deleteContact(id);
  }

  renderContacts() {
    const { contacts } = this.props;
    return contacts.map((obj, index) => {
      return <li key={`detail-${index}`} className="contacts-row row">
        <span className="col-xs-2" title={obj.firstName}>{obj.firstName}</span>
        <span className="col-xs-2" title={obj.lastName}>{obj.lastName}</span>
        <span className="col-xs-2" title={obj.email}>{obj.email}</span>
        <span className="col-xs-2" title={obj.phone}>{obj.phone}</span>
        <span className="col-xs-2" title={obj.status}>{obj.status}</span>
        <button type="button" title="EDIT CONTACT" className="glyphicon glyphicon-edit col-xs-1 text-info" onClick={() => this.showAddEditContactModal(obj)} />
        <button type="button" title="DELETE CONTACT" className="glyphicon glyphicon-remove col-xs-1 text-danger" onClick={() => this.deleteContact(obj.id)} />
      </li>
    })
  }
}


function mapStateToProps(state) {
  return {
    contacts: state.contacts,
    request: state.request
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addContact: (data) => dispatch(addContact(data)),
    deleteContact: (index) => dispatch(deleteContact(index)),
    editContact: (data) => dispatch(editContact(data)),
    fetchAllContacts: (data) => dispatch(fetchAllContacts(data)),
    sortContacts: (data) => dispatch(sortContacts(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactList)
