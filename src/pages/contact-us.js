import React, { useEffect } from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useMyContext } from '../components/context';

import StartJourney from '../components/start-journey';
import ServiceCard from '../components/service-card';
import { LinkBtn } from '../components/global/button';

import ContactForm from '../components/contact-form';

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

function ContactUs() {

	useEffect(() => {
		window.scrollTo(0, 0)
	  }, [])

	const ourServices = [
		{
			image: './images/services/kitchen.webp',
			title: 'Kitchen Remodeling',
			desc: "Your kitchen is the heart of your home - it's where you prepare meals, gather with family and friends, and create lasting memories.",
			price: '550,000',
			path: '1',
			
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
			path: '1',
			
		},
		{
			image: './images/services/patios.jpg',
			title: 'Patios',
			desc: " Our team of experts has the knowledge, experience, and creativity to design and build patios that are both functional and beautiful. ",
			price: '550,000',
			path: '1',
			
		},
		{
			image: './images/services/decks.jpg',
			title: 'Decks',
			desc: "We offer customized deck remodeling services to enhance your outdoor living space with a variety of materials, including composite decking.",
			price: '550,000',
			path: '1',
			
		},
		{
			image: './images/services/flooring.jpg',
			title: 'Flooring',
			desc: "At DMV, we are also experts in providing top-notch flooring installation services to our valued clients. ",
			price: '550,000',
			path: '1',
			
		},
	];

	const { setActiveItem } = useMyContext();

	setActiveItem('contact');

	return (
		<StyledCom>
			<div className='banner-holder'>
				<div className="image-holder">
					<LazyLoadImage src={'./images/contact-us-banner.jpg'} alt={'contact-us-banner'} />
				</div>
				<div className='content-data'>
					{/* <span className='sub-title'>Specializing in Home remodeling</span> */}
					<h1>Contact Us</h1>
				</div>
			</div>
			<section className='section section-bg-light page-content'>
				<div className='container'>
					<h3 className='section-title'>Drop Us a Line!</h3>
					<div className='grid mt-4' grid-item-width="1/1" grid-item-width-md="1/2" data-gap="40">
						<ContactForm />
						<div>
							<div className='mb-3'>
								<h4 className='mb-2'>Better Yet, See Us in Person!</h4>
								<p>We love our customers, DMV General Contracting Group LLC is committed to providing exceptional construction services to our valued clients. For inquiries, project collaborations, or any questions you may have, please feel free to contact us.</p>
							</div>
							<div className='mb-3'>
								<h4>Call us</h4>
								<p>240.730.1292</p>
							</div>
							<div className='mb-3'>
								<h4>Email us</h4>
								<p>support@dmv-gc.com </p>
							</div>
							<div className='mb-3'>
								<h4>Office Address</h4>
								<p>11810 Grand Park Ave. Suite 500 North Bethesda, MD 20852</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<StartJourney />
		</StyledCom>
	)
}

export default ContactUs;