import React from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from "react-router-dom";

const StyledCom = styled(Link)`
    box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.15);
    border: 1px solid #B1B1B1;
    border-radius: 12px;
    cursor: pointer;
    position: relative;
    padding: 20px 20px 0;
    display: flex;
    flex-direction: column;
    height: 100%; 
    color: var(--text-color);
    text-decoration: none;

    .card-image {
        height: 200px;
    }

    .card-details {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        padding: 20px 0;
        gap: 10px;

        .description-holder {
            flex-grow: 1;
        }
    }

    .button-primary {
        align-self: flex-end; width: 100%;
    }
`;

function ProjectCard({ client, afterImage, id, category, description }) {
  return (
    <StyledCom id={id} to={`/projects/${id}`}>
        <div className='image-holder card-image'>
            <LazyLoadImage src={afterImage} />
        </div>
        <div className='card-details'>
            <h4 className='mb-2'>{category}</h4>
            <div className='description-holder'>
                <p>{description}</p>
            </div>
            <div to={`/projects/${id}`} className='btn button-primary btn-c-rounded'>View Project</div>
        </div>
    </StyledCom>
  );
}

export default ProjectCard;
