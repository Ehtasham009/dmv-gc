import React from 'react'
import styled from 'styled-components';

import { LinkBtn } from './global/button';

const StyledCom = styled.div`
    background: var(--primary-color) url(../../images/start-journey-bg.png); color: white; position: relative; background-position: bottom center; background-size: cover;

    .explore-button{background: white; color: var(--primary-color)}
    .container{display: grid; align-content: center; justify-items: center; grid-gap: 20px}

    @media (max-width: 768px){
        h2{font-size: 24px; text-align: center}
    }
`;

function StartJourney() {
  return (
    <StyledCom >
        <section className='section'>
            <div className='container'>
                <h2 className='font-weight-700'>We are Building the Future and Restoring the Past</h2>
                <p className='text-center'>We shape the future with modern design and cutting-edge technology, crafting spaces for today. Simultaneously, we honor the past, restoring historical structures with meticulous care. Our commitment lies in creating a timeless legacy that harmonizes classic craftsmanship with forward-thinking construction practices.</p>
                {/* <div>
                    <LinkBtn className="btn-light btn-c-rounded explore-button" linkto="/" children="Explore Properties" />
                </div> */}
            </div>
        </section>
    </StyledCom>
  )
}

export default StartJourney;