import React from 'react'
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ReactSVG } from 'react-svg';
import {Link, useParams} from "react-router-dom";


const StyledCom = styled.div`
    box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.15); border: 1px solid #B1B1B1; border-radius: 12px; overflow: hidden; height: 300px; cursor: pointer; position: relative;

    .card-image{height: 100%}
    .card-details{
        height: 65px; width: 100%; background: rgba(0, 0, 0, 0.7); position: absolute; bottom: 0; left: 0; color: white; display: grid; grid-gap: 10px; align-content: center; justify-items: center; transition: 0.2s all;
        
        .icon-rounded{
            --size: 50px; display: none; background: #fff; 
            svg{
                path{stroke: #000; stroke-width: 3;}
            }
        }
    }
    
    &:hover{
        .card-details{
            height: 100%; 
            
            .icon-rounded{
               display: flex;
            }
        }
    }
`;

function projectCard({client, afterImage, id, category}) {
  return (
    <StyledCom id={id}>
        <div className='image-holder card-image'>
            <LazyLoadImage src={afterImage} />
        </div>
        <div className='card-details'>
            <div className='text-center'>
                <h4>{category}</h4>
                <h5>{client}</h5>
            </div>
            <Link to={`/projects/${id}`} className='icon-rounded'>
                <ReactSVG src='../images/arrow.svg' />
            </Link>
        </div>
    </StyledCom>
  )
}

export default projectCard;