import React, { useEffect } from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useMyContext } from '../components/context';

import StartJourney from '../components/start-journey';
import BlogsList from '../components/blogs-list';



const StyledCom = styled.div`
    .banner-holder{
		height: 400px; display: flex; align-items: center; justify-content: center;
		
		.image-holder{height: 400px; position: absolute; top: 0; left: 0}
		.content-data{position: relative; z-index: 1; text-align: center}
		.content-data h1{font-size: 48px; margin-top: 20px; position: relative; font-weight: 800; text-align: center; text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.70); color: var(--text-light); }
		.content-data h1::after{content: ""; position: absolute;  height: 40%; width: 100%; background: var(--primary-color); bottom: 0; left: 50%; transform: translateX(-50%); z-index: -1}
		.sub-title{background: var(--primary-color); color: #ffffff; font-size: 18px; letter-spacing: 2px; padding: 2px 10px; font-weight: 700; margin-bottom: 20px}
		@media(max-width: 1024px){
			.content-data h1{font-size: 32px; }
		}
		@media(max-width: 768px){
			height: 250px; 
			.image-holder{height: 250px; }
		}

	}

    
`;

function Blogs() {

	const { setActiveItem } = useMyContext();

	setActiveItem('blogs');

	useEffect(() => {
		window.scrollTo(0, 0)
	  }, [])

	return (
		<StyledCom>
			<div className='banner-holder'>
				<div className="image-holder">
					<LazyLoadImage src={'./images/blogs-page-bg.jpg'} alt={'blogs image'} />
				</div>
				<div className='content-data'>
					<h1>Blogs</h1>
				</div>
			</div>
			<section className='section section-bg-light '>
				<div className='container'>
					{/* <h3 className='section-title mb-5'>Our Features Services</h3> */}
					<div className='grid' grid-item-width="1/1" data-gap="40">
						<BlogsList  />
					</div>
				</div>
			</section>
			<StartJourney />
		</StyledCom>
	)
}

export default Blogs;