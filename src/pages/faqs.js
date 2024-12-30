import React, { useEffect } from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useMyContext } from '../components/context';
import Accordion from 'react-bootstrap/Accordion';


import StartJourney from '../components/start-journey';

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

function Faqs() {

	useEffect(() => {
		window.scrollTo(0, 0)
	  }, [])
	const { setActiveItem } = useMyContext();

	setActiveItem('faq');

	const faq_data = [
		{
			title: 'What services do you offer for residential properties?',
			desc: 'We offer full-service general contracting solutions, from planning to execution, including home remodeling, renovation, repair, and maintenance.'
		},
		{
			title: 'How do I get started with a residential project?',
			desc: "Contact us to schedule a consultation where we'll discuss your project goals, budget, and timeline. We'll provide an estimate and work with you to develop a plan that meets your needs."
		},
		{
			title: 'What is the timeline for a residential project?',
			desc: "The timeline varies depending on the scope and complexity of the project. We'll provide an estimated timeline during the consultation and keep you updated throughout the process."
		},
		{
			title: 'How do you ensure the quality of your work?',
			desc: 'We have a team of experienced and skilled professionals who are committed to delivering high-quality work. We use top-quality materials and follow industry best practices to ensure a flawless finish.'
		},
		{
			title: "Do you offer financing options?",
			desc: "We can help you explore financing options and work with you to develop a payment plan that meets your budget."
		},
		{
			title: "Are you licensed and insured?",
			desc: "Yes, we are fully licensed and insured to provide general contracting services for residential properties.Can you help with the design process? Yes, we have a team of design professionals who can work with you to develop a custom design that meets your vision and needs."
		},
		{
			title: "Do you handle permits and inspections?",
			desc: "Yes, we will handle all necessary permits and inspections to ensure that your project is up to code and meets all legal requirements."
		},
		{
			title: "What types of materials do you use?",
			desc: "We use top-quality materials from trusted suppliers to ensure a durable and long-lasting result. We can also work with you to find materials that fit your style and budget."
		},
		{
			title: "What is your warranty policy?",
			desc: "We stand behind our work and offer a warranty on all labor and materials. If any issues arise, we'll work with you to resolve them promptly and to your satisfaction."
		},
	]
	return (
		<StyledCom>
			
			<div className='banner-holder'>
				<div className="image-holder">
					<LazyLoadImage src={'./images/faq-banner.jpg'} alt={'faq banner'} />
				</div>
				<div className='content-data'>
					<h1>FAQS</h1>
				</div>
			</div>
			<section className='section'>
				<div className='container'>
					<h3 className='section-title mb-5'>FAQs</h3>
					<Accordion>
						{faq_data.map((item, index) => (
							<Accordion.Item eventKey={index}>
								<Accordion.Header>{item.title}</Accordion.Header>
								<Accordion.Body>
									{item.desc}
								</Accordion.Body>
							</Accordion.Item>
						))}
					</Accordion>
				</div>
			</section>
			
			<StartJourney />
		</StyledCom>
	)
}

export default Faqs;