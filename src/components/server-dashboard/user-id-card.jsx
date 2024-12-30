import React from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ReactSVG } from 'react-svg';

const StyledCom = styled.div`
    display: flex; gap: 15px; align-items: center; box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1); padding: 10px; border: 1px solid #f1f1f1; border-radius: 10px; cursor: pointer; position: relative;
    // &.not-read:before{content: ''; --size: 10px; position: absolute; top: -5px; right: -5px; height: var(--size); width: var(--size); border-radius: var(--size); background: var(--primary-color)}

    .icon-rounded { height: 40px; width: 40px; border-radius: 50%; background-color: ${({ bgColor }) => bgColor}; color: #1d1d1d; display: flex; justify-content: center; align-items: center; font-weight: bold; }
    .short-message{font-size: 13px; }
    .message-time{margin-left: auto; font-size: 12px}
`;

function getRandomLightColor() {
    const letters = 'BCDEF'; // Use letters that generate lighter colors
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    return { formattedTime, formattedDate };
};

function UserIdCard({key, name, message, onClick, chatId , date}) {
    const { formattedTime, formattedDate } = formatDateTime(date);
    const bgColor = getRandomLightColor();
    return (
        <StyledCom bgColor={bgColor} className='not-read' onClick={() => onClick(chatId)}>
            <div className='image-holder icon-rounded'>
            {name ? name.charAt(0).toUpperCase() : 'N/A'}
            </div>
            <div className='grid user-details' data-gap="1">
            <h6>{name || `User`}</h6>
                <span className='short-message'>{message || 'Short Message Here'}</span>
            </div>
            <span className='message-time'>
            <div>{formattedTime}</div>
            <div>{formattedDate}</div>
            </span>
        </StyledCom>
    )
}

export default UserIdCard;
