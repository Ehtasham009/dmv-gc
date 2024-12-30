import React from 'react'
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// import { ReactSVG } from 'react-svg';
import { LinkBtn } from './global/button';
// import { Link } from 'react-router-dom';
import {useParams} from "react-router-dom";
import serviceData from "./service-data";


const StyledCom = styled.div`
    min-height: 400px; height: 100%; background: #FFFFFF; border: 1px solid #B1B1B1; border-radius: 12px; padding: 20px; font-size: 16px; display: flex; flex-direction: column; justify-content: space-between;

    .properties-image{height: 280px; overflow: hidden; border-radius: 10px; margin-bottom: 20px;}
    .bottom-buttons{flex-grow: 1; align-items: flex-end}
`;

function ServiceCard({image, title, description, path, price, id}) {
  return (
    <StyledCom id={id}>
        <div className='image-holder properties-image'>
            <LazyLoadImage src={image} alt={title} />
        </div>
        <div className='grid' data-gap="10" grid-item-width="1/1">
            <h4 className='font-weight-bold'>{title}</h4>
            <p>
                {`${description.slice(0, 250)}...`}
                {/* {description} */}
                {/* <Link to={path} className='text-content font-weight-600'>Read More</Link> */}
            </p>
        </div>
        {/* <div className='h-list mb-4' data-gap="10">
            <div className='badge badge-secondary'>
                <ReactSVG src='' />
                <span>4-Bedroom</span>
            </div>
            <div className='badge badge-secondary'>
                <ReactSVG src='' />
                <span>4-Bedroom</span>
            </div>
            <div className='badge badge-secondary'>
                <ReactSVG src='' />
                <span>4-Bedroom</span>
            </div>
        </div> */}
        <div className='h-list justify-content-between bottom-buttons' data-gap="10">
            {/* <div className='grid' data-gap="0">
                <label>Price</label>
                <h5>${price}</h5>
            </div> */}
            <div>
                <LinkBtn linkto={`/services/${id}`} className={'button-primary btn-c-rounded'} children="View Details" />
            </div>
        </div>
    </StyledCom>
  )
}

export default ServiceCard;