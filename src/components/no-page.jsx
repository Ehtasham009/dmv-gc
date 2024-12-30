import React from 'react';
import {  LazyLoadImage } from 'react-lazy-load-image-component';
import styled from 'styled-components';

const StyledCom = styled.div`
    min-height: 50vh; padding-top: 100px;

`;
const NoPage = () => {
  
  return (
    <StyledCom className='h-list justify-content-center'>
      <LazyLoadImage src="./images/no-page.png" />
    </StyledCom>
  );
};

export default NoPage;
