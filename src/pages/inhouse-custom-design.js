import React, { useEffect } from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useMyContext } from '../components/context';

import { LinkBtn } from '../components/global/button';
import StartJourney from '../components/start-journey';
import ServiceCard from '../components/service-card';


const StyledCom = styled.div`
	margin-top: 120px;

	.container.team-member-about{display: grid; grid-template-columns: 3fr 2fr; grid-gap: 30px; margin-bottom: 20px}
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

	.about-image{height: 500px; margin: 40px 0; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2)}
	@media(max-width: 768px){
		.about-image{height: 250px; margin: 20px -20px; border-radius: 0; margin-right: -20px;  width: calc(100% + 40px);}
	}

	.team-member-blog-section{
		background: white;
		
	}

	.dummy-text{height: calc(100vh - 130px); display: flex; align-items: center; justify-content: center}
    
`;

function InHouseCustomDesign() {

	useEffect(() => {
		window.scrollTo(0, 0)
	  }, [])

	const { setActiveItem } = useMyContext();

	setActiveItem('inhouse-custom-design');

	

	return (
		<StyledCom>
			<div className='dummy-text'>
				<h3 style={{textAlign: 'center', fontWeight: '700'}}>In-House Custom Design Will Be Live Soon!</h3>
			</div>
			{/* <section className='section section-bg-light '>
				<div className='container team-member-about'>
					<div>
						<h3 className='section-title mb-2'>Our Handyman Services</h3>
						<p>Elevate Your Property Maintenance with Our Expert Handyman Services!</p>
						<p className='mb-3'>Streamline your property management needs with DMV General Contracting Group! We specialize in providing reliable and comprehensive handyman services to ensure your property is maintained at the highest standards.</p>
					<p className='mb-3'>We offer a wide range of services, including plumbing, electrical work, carpentry, painting, roofing, window blinds installation and so much more. Whatever maintenance needs, we’ve got you covered!</p>
					<p className='mb-3'>Call or text Gus at <span className='text-primary'>240.730.1292</span> or reply to this email to get assistance ASAP.</p>
					<p className='mb-3'>We look forward to the opportunity to serve and contribute to your property management efforts.</p>
					</div>
					<div className='image-holder about-image'>
						<LazyLoadImage src={'./images/handyman-image.jpg'} alt={'handyman'} />
					</div>
					
				</div>
			</section>
			<section className='section team-member-blog-section'>
				<div className='container team-member-blog'>
					<div>
						<h3 className='mb-2 font-weight-700'>Blog</h3>
						<p>Elevate Your Property Maintenance with Our Expert Handyman Services!</p>
						<p className='mb-3'>Streamline your property management needs with DMV General Contracting Group! We specialize in providing reliable and comprehensive handyman services to ensure your property is maintained at the highest standards.</p>
					<p className='mb-3'>We offer a wide range of services, including plumbing, electrical work, carpentry, painting, roofing, window blinds installation and so much more. Whatever maintenance needs, we’ve got you covered!</p>
					<p className='mb-3'>Call or text Gus at <span className='text-primary'>240.730.1292</span> or reply to this email to get assistance ASAP.</p>
					<p className='mb-3'>We look forward to the opportunity to serve and contribute to your property management efforts.</p>
					</div>
					<div className='image-holder about-image'>
						<LazyLoadImage src={'./images/handyman-image.jpg'} alt={'handyman'} />
					</div>
					
				</div>
			</section> */}
			<StartJourney />
		</StyledCom>
	)
}

export default InHouseCustomDesign;