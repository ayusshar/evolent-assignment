import React from 'react';
import ReactSelect from 'react-select';
import { DROPDOWN_VALUES, COLUMN_HEADER, CANCEL_TEXT } from '../constants';

const Modal = (props) => {
    const { formErrors, form, handleModalClose, validateNumber, handleChange, handleSubmit, modalTitle } = props;
    return (
        <div className="modal open">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={handleModalClose}><span>&times;</span></button>
                        <h4 className="modal-title" id="myModalLabel">{modalTitle} Contact Form</h4>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <label>
                                        {COLUMN_HEADER.firstName} <span className="asterisk">*</span>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="firstName"
                                        value={form.firstName}
                                        onChange={handleChange}
                                        onBlur={handleChange}
                                    />
                                    {formErrors.firstName && <span className="err">{formErrors.firstName}</span>}
                                </div>
                                <div className="form-group">
                                    <label>
                                    {COLUMN_HEADER.lastName} <span className="asterisk">*</span>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="lastName"
                                        value={form.lastName}
                                        onChange={handleChange}
                                        onBlur={handleChange}
                                    />
                                    {formErrors.lastName && <span className="err">{formErrors.lastName}</span>}
                                </div>


                                <div className="form-group">
                                    <label>
                                    {COLUMN_HEADER.email} <span className="asterisk">*</span>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        onBlur={handleChange}
                                    />
                                    {formErrors.email && <span className="err">{formErrors.email}</span>}

                                </div>

                                <div className="form-group">
                                    <label>
                                    {COLUMN_HEADER.phone} <span className="asterisk">*</span>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        onBlur={handleChange}
                                        onKeyPress={validateNumber}
                                        maxLength={10}
                                        minLength={10}
                                    />
                                    {formErrors.phone && <span className="err">{formErrors.phone}</span>}
                                </div>

                                <div className="form-group">
                                    <label>
                                    {COLUMN_HEADER.status} <span className="asterisk">*</span>
                                    </label>
                                    <ReactSelect
                                        name="status"
                                        options={DROPDOWN_VALUES}
                                        value={DROPDOWN_VALUES.find(x => x.value === form.status)}
                                        onChange={e =>
                                            handleChange({
                                                target: {
                                                    name: "status",
                                                    value: e.value
                                                }
                                            })
                                        }
                                    />
                                    {formErrors.status && <span className="err">{formErrors.status}</span>}
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={handleModalClose}>{CANCEL_TEXT}</button>
                        <button type="button" onClick={handleSubmit} className="btn btn-primary">{modalTitle}</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Modal;
