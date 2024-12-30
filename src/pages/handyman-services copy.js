import React, { useEffect } from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useMyContext } from '../components/context';

import { LinkBtn } from '../components/global/button';
import StartJourney from '../components/start-journey';
import ServiceCard from '../components/service-card';


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

	.about-image{height: 500px; margin: 40px 0; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2)}
	@media(max-width: 768px){
		.about-image{height: 250px; margin: 20px -20px; border-radius: 0; margin-right: -20px;  width: calc(100% + 40px);}
	}

    
`;

function HandymanServices() {

	useEffect(() => {
		window.scrollTo(0, 0)
	  }, [])

	const { setActiveItem } = useMyContext();

	setActiveItem('handyman-services');

	const ourServices = [
		{
			image: './images/services/kitchen.webp',
			title: 'Kitchen Remodeling',
			desc: "Your kitchen is the heart of your home - it's where you prepare meals, gather with family and friends, and create lasting memories.",
			price: '550,000',
			path: '0',
			
		},
		{
			image: './images/services/bathroom.webp',
			title: 'Bathroom Remodeling',
			desc: " Our team of experts has years of experience in bathroom remodeling and we can help you design and build the bathroom of your dreams.",
			price: '550,000',
			path: '1',
			
		},
		{
			image: './images/services/basement-remodeling.jpg',
			title: 'Basement Remodeling',
			desc: " At our company, we specialize in transforming unfinished basements into comfortable, functional living spaces that meet our clients' unique needs.",
			price: '550,000',
			path: '2',
			
		},
		{
			image: './images/services/patios.jpg',
			title: 'Patios',
			desc: " Our team of experts has the knowledge, experience, and creativity to design and build patios that are both functional and beautiful. ",
			price: '550,000',
			path: '3',
			
		},
		{
			image: './images/services/decks.jpg',
			title: 'Decks',
			desc: "We offer customized deck remodeling services to enhance your outdoor living space with a variety of materials, including composite decking.",
			price: '550,000',
			path: '4',
			
		},
		{
			image: './images/services/flooring.jpg',
			title: 'Flooring',
			desc: "At DMV, we are also experts in providing top-notch flooring installation services to our valued clients. ",
			price: '550,000',
			path: '5',
			
		},
	];

	return (
		<StyledCom>
			<div className='banner-holder'>
				<div className="image-holder">
					<LazyLoadImage src={'./images/handyman-banner.jpg'} alt={'handyman-banner'} />
				</div>
				<div className='content-data'>
					<h1>Handyman Services</h1>
				</div>
			</div>
			<section className='section section-bg-light '>
				<div className='container'>
					<h3 className='section-title mb-2'>Our Handyman Services</h3>
					<p>Elevate Your Property Maintenance with Our Expert Handyman Services!</p>
					<div className='image-holder about-image'>
						<LazyLoadImage src={'./images/handyman-image.jpg'} alt={'handyman'} />
					</div>
					<p className='mb-3'>Streamline your property management needs with DMV General Contracting Group! We specialize in providing reliable and comprehensive handyman services to ensure your property is maintained at the highest standards.</p>
					<p className='mb-3'>We offer a wide range of services, including plumbing, electrical work, carpentry, painting, roofing, window blinds installation and so much more. Whatever maintenance needs, we’ve got you covered!</p>
					<p className='mb-3'>Call or text Gus at <span className='text-primary'>240.730.1292</span> or reply to this email to get assistance ASAP.</p>
					<p className='mb-3'>We look forward to the opportunity to serve and contribute to your property management efforts.</p>
				</div>
			</section>
			<section className='section'>
				<div className='container'>
					<div className='h-list justify-content-between flex-lg-nowrap mb-4' data-gap="10">
						<div className='grid' data-gap="10">
							<h3 className='section-title'>Featured Services</h3>
							<p>Elevate your  dream projects through our expert - where expertise meets innovation. From concept to completion, we redefine construction standards with precision, creativity, and a dedication to perfection. We blend modern techniques with traditional craftsmanship, ensuring your projects stand out for their quality and ingenuity.</p>
						</div>
						<div className='button-holder'>
							<LinkBtn linkto={'/services'} className={'btn-c-rounded'} children={'View All Services'} />
						</div>
					</div>
					<div className='grid' grid-item-width="1/1" grid-item-width-md="1/2" grid-item-width-lg="1/3" data-gap="30">
						{ourServices.map((item, index) => 
							<ServiceCard image={item.image} title={item.title} description={item.desc} price={item.price} path={index} id={index} />
						)}
					</div>
				</div>
			</section>
			<StartJourney />
		</StyledCom>
	)
}

export default HandymanServices;