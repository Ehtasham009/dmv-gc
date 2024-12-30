import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const StyledCom = styled.div`
    min-width: 200px;
    a{
        min-height: 200px; display: grid; background: #fbfbfb; border: 1px solid #B1B1B1; border-radius: 10px; position: relative; align-content: center; gap: 15px; padding: 10px; justify-content: center; text-align: center; text-decoration: none; transition: 0.2s all;
        
        .image-holder{color: var(--primary-color)}
        .title{color: var(--content-color);  font-weight: 700}
        .arrow-holder{position: absolute; right: 15px; top: 15px}

        &:hover{scale: 1.05; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2)}
    }
    .icon-rounded.image-holder{--size: 80px; border: 2px solid var(--primary-color); width: var(--size); margin: auto; padding: 13px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2)}
`;

function HomeServiceCard(cardData) {
  return (
    <StyledCom >
        <Link to={`/`}>
            <div className='icon-rounded image-holder'>
                <LazyLoadImage src={cardData.image} width='64px'  />
            </div>
            <span className='title'>{cardData.title}</span>
            {/* <div className='arrow-holder'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M1.375 22.625L22.625 1.375M22.625 1.375L6.6875 1.375M22.625 1.375V17.3125" stroke="#4D4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div> */}
        </Link>
    </StyledCom>
  )
}

export default HomeServiceCard;