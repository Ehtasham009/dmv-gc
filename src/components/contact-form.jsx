import React, { useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Form = styled.form`
    .input-item{
        position: relative; margin-bottom: 30px;

        label{position: absolute; top: 15px;  color: #838383; left: 5px; padding: 2px 10px;  z-index: 3; transition: 0.1s all; pointer-events: none}
        .border_{position: absolute; height: 1px; bottom: -1px; left: -1px; width: calc(100% + 2px); border-bottom: 1px solid #838383; transition: 0.1s all;}

        .form-control{
            background: var(--section-bg); border-radius: 0; min-height: 50px; z-index: 2; position: relative; 
            &::-webkit-inner-spin-button{-webkit-appearance: none;}
    
            &:focus + .border_, &:focus ~ .border_{height: calc(100% + 2px); border: 1px solid #838383}
            &:focus + label, &:focus ~ label{top: -13px; background: var(--section-bg); left: 10px; font-size: 14px}
    
            &.active ~ .border_{height: calc(100% + 2px); border: 1px solid #838383}
            &.active ~ label{top: -13px; background: var(--section-bg); left: 10px; font-size: 14px}
        }
        
    }

`;

function ContactForm() {

    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        message: ''
    });
    const [inputActive, setInputActive] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await axios.post('https://api.dmv-gc.com/api/auth/contact-form', formData);
            const response = await axios.post('https://api.dmv-gc.com/api/auth/contact-form', formData);
            if (response.status === 200) {
                toast.success('Form submitted successfully!',{ position: 'top-right' });
                setFormData({
                    name: '',
                    phoneNumber: '',
                    email: '',
                    message: ''
                });
            }
        } catch (error) {
            toast.error('Error submitting form. Please try again.', { position: 'top-right' });
            console.error('Error submitting form:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setInputActive(value !== '' ? true : false);
    };

  return (
    <Form onSubmit={handleSubmit}>
            <div className={`input-item ${inputActive ? 'active' : ''}`}>
                <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <label>Name</label>
                <div className="border_"></div>
            </div>
            <div className={`input-item ${inputActive ? 'active' : ''}`}>
                <input
                    type="number"
                    name="phoneNumber"
                    className="form-control"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                />
                <label>Phone</label>
                <div className="border_"></div>
            </div>
            <div className={`input-item ${inputActive ? 'active' : ''}`}>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <label>Email</label>
                <div className="border_"></div>
            </div>
            <div className={`input-item ${inputActive ? 'active' : ''}`}>
                <textarea
                    name="message"
                    className="form-control"
                    value={formData.message}
                    onChange={handleInputChange}
                />
                <label>Message</label>
                <div className="border_"></div>
            </div>
            <div className="form-button-holder">
                <button className="btn button-primary btn-c-rounded" type="submit">Submit</button>
            </div>
            <ToastContainer />
        </Form>
  )
}

export default ContactForm;