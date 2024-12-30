import React from 'react'

import styled from 'styled-components';

const StyledCom = styled.div`
    padding: 50px;

    h3{font-weight: 700; margin-bottom: 30px}
    .items-holder{display: grid; grid-template-columns: 1fr 1fr; gap: 50px}
    .items-holder .item{flex: 0 50%}
`;
function formatDateTime(date) {
    const newDate = new Date(date);
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
    const formattedDate = `${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`;
    return `${formattedDate}, ${formattedTime}`;
}
function ChatFormSubmited({ mainTitle, form }) {
  return (
    <StyledCom >
        <h3>{mainTitle}</h3>
        <div className='items-holder'>
            <div className='item'>
                <h5>Name</h5>
                <p>{form.firstName} {form.lastName}</p>
            </div>
            <div className='item'>
                <h5>Email</h5>
                <p>{form.email}</p>
            </div>
            <div className='item'>
                <h5>Number</h5>
                <p>{form.phoneNumber}</p>
            </div>
            <div className='item'>
                <h5>Date</h5>
                <p>{formatDateTime(form.createdAt)}</p>
            </div>
            {
                form.message && (
                    <div className='item'>
                        <h5>Message</h5>
                        <p>{form.message}</p>
                    </div>
                )
            }
        </div>
    </StyledCom>
  )
}

export default ChatFormSubmited;