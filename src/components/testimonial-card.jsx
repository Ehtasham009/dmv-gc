import React from 'react'
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ReactSVG } from 'react-svg';
import { LinkBtn } from './global/button';
import { Link } from 'react-router-dom';

const StyledCom = styled.div`
    min-height: 360px; border: 1px solid #B1B1B1; border-radius: 12px; padding: 20px; font-size: 16px; display: flex; flex-direction: column;

    .desc-wrapper{align-content: start; flex-grow: 2}
    .client-picture{--size: 60px; width: var(--size); background: #ededed}
    .rev-stars-holder{max-width: 200px; margin-bottom: 40px}
    .rev-stars{height: 33px; background: url(../../images/rev-stars.svg); background-size: contain; background-repeat: repeat-x;}
`;

function TestimonialCard({image, title, description, name, adress}) {
  return (
    <StyledCom >
        <div className='rev-stars-holder'>
            <div className='h-list rev-stars' style={{'width': '100%'}}></div>
        </div>
        <div className='grid desc-wrapper' data-gap="10">
            <h4 className='font-weight-bold'>{title}</h4>
            <p>{description}</p>
        </div>
        <div className='h-list ' data-gap="10">
            <div className='icon-rounded image-holder client-picture'>
                <LazyLoadImage src={image} alt={name} />
            </div>
            <div >
                {/* <h5>{name}</h5> */}
                <span className='font-size-14'>{adress}</span>
            </div>
        </div>
    </StyledCom>
  )
}

export default TestimonialCard;