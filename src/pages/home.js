import React, { useState, useEffect, useRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Slider from "react-slick";
import Modal from 'react-bootstrap/Modal';
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import { useMyContext } from '../components/context';
import UseDeviceType from '../components/deviceBreakPoint';

import HeroBanner from '../components/hero-banner';
import HomeServiceCard from '../components/home-service-card';
import ServiceCard from '../components/service-card';
import TestimonialCard from '../components/testimonial-card';
import { Button, LinkBtn } from '../components/global/button';
import StartJourney from '../components/start-journey';

import projectsGalaryData from '../components/projects-data'

import 'react-before-after-slider-component/dist/build.css';
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import '../sass/home.scss';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';
import ContactForm from '../components/contact-form';

const Home = () => {
	
	const servicesCard = [
		{
			image: './images/consulting.png',
			title: 'Free In-Home Consultation',
			path: '1'
		},
		{
			image: './images/repair-expert.png',
			title: 'Expert Installation',
			path: '2'
		},
		{
			image: './images/warranty-period.png',
			title: '1 Year Warranty',
			path: '3'
		}
	];

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

	let FIRST_IMAGE_ = {
		imageUrl: './images/projects-galary/kitchen-after.jpg'
	};
	const SECOND_IMAGE_ = {
		imageUrl: './images/projects-galary/kitchen-before.jpg'
	};

	const TestimonialsData = [
		{
			image: './images/clients/daine.jpg',
			title: 'Diane Thaler',
			desc: "This guy is excellent at what he does! You can't go wrong. He is professional, he knows what he is doing and I highly recommend him. Mr. Placeres is confident in his abilities as he should be.",
			adress: 'Bethesda, MD',
			
		},
		{
			image: './images/clients/jeff.jpg',
			title: 'Jeff van Leuven',
			desc: "Gustavo was very understanding of our situation / goal (to sell quickly / get the highest price) and aggressively pursued it.Gus was Extremely knowledgeable and professional. We would recommend him to all. A+++",
			adress: 'Munich Germany',
			
		},
		{
			image: './images/clients/nick.jpg',
			title: 'Nick K',
			desc: "Gustavo has been EXTREMELY helpful in guiding us through the whole buying process A to Z. Our friends recommended him to us and we are very thankful for their advice. Gus led us all the way explaining, answering numerous questions and making suggestions. The house we bought is amazing and we're very happy first-time buyers! Thanks Gus,",
			adress: 'Gaithersburg',
			
		},
		{
			image: './images/clients/gail.jpg',
			title: 'Gail Araya',
			desc: "Gustavo Placeres was easy to work with. He made some excellent recommendations to improve the property prior to sale of home. Was always quick to respond when I had questions or concerns. I would highly recommend Gustavo for anyone looking to buy or sell their home.",
			adress: 'Silver Spring',
			
		}
	];

<<<<<<< HEAD
=======
	const imageGalaryData = [
		{
			imageUrl1 : './images/projects-galary/kitchen-before.jpg',
			imageUrl2 : './images/projects-galary/kitchen-after.jpg',
		},
		{
			imageUrl1 : './images/projects-galary/bathroom-before.webp',
			imageUrl2 : './images/projects-galary/bathroom-after.webp',
		},
		{
			imageUrl1 : './images/projects-galary/bohlman-before.jpg',
			imageUrl2 : './images/projects-galary/bohlman-after.jpg',
		},
		{
			imageUrl1 : './images/projects-galary/flooring-before.jpg',
			imageUrl2 : './images/projects-galary/flooring-after.jpg',
		},
		{
			imageUrl1 : './images/projects-galary/basement-before.png',
			imageUrl2 : './images/projects-galary/basement-after.png',
		},
		
		
	];
>>>>>>> parent of 940df69 (adding projects)

	const FeaturedPropertiesSlider ={
		infinite: true,
		speed: 500,
		autoplay: true,
  		autoplaySpeed: 2000,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		nextArrow: <div>
			<svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fillRule="evenodd" clipRule="evenodd" d="M0.5 9C0.5 8.37868 1.00368 7.875 1.625 7.875L17.5819 7.875L11.3453 1.93593C10.8974 1.50529 10.8834 0.793119 11.3141 0.345249C11.7447 -0.102618 12.4569 -0.116583 12.9047 0.31406L21.1547 8.18906C21.3753 8.40116 21.5 8.69398 21.5 9C21.5 9.30602 21.3753 9.59883 21.1547 9.81093L12.9047 17.6859C12.4569 18.1166 11.7447 18.1026 11.3141 17.6547C10.8834 17.2069 10.8974 16.4947 11.3453 16.0641L17.5819 10.125L1.625 10.125C1.00368 10.125 0.5 9.62132 0.5 9Z" fill="currentcolor"/>
			</svg>
		</div>,
		prevArrow: <div>
			<svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fillRule="evenodd" clipRule="evenodd" d="M21.5 9C21.5 9.62132 20.9963 10.125 20.375 10.125L4.41812 10.125L10.6547 16.0641C11.1026 16.4947 11.1166 17.2069 10.6859 17.6548C10.2553 18.1026 9.54312 18.1166 9.09525 17.6859L0.845253 9.81094C0.624665 9.59883 0.5 9.30602 0.5 9C0.5 8.69398 0.624665 8.40117 0.845253 8.18906L9.09525 0.314064C9.54312 -0.116579 10.2553 -0.102615 10.6859 0.345254C11.1166 0.793122 11.1026 1.5053 10.6547 1.93594L4.41812 7.875L20.375 7.875C20.9963 7.875 21.5 8.37868 21.5 9Z" fill="currentcolor"/>
			</svg>
		</div>,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
				}
			},
		]
	};

	const TestimonialsSlider ={
		infinite: true,
		speed: 500,
		autoplay: true,
  		autoplaySpeed: 2000,
		slidesToShow: 2,
		slidesToScroll: 1,
		arrows: true,
		nextArrow: <div>
			<svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fillRule="evenodd" clipRule="evenodd" d="M0.5 9C0.5 8.37868 1.00368 7.875 1.625 7.875L17.5819 7.875L11.3453 1.93593C10.8974 1.50529 10.8834 0.793119 11.3141 0.345249C11.7447 -0.102618 12.4569 -0.116583 12.9047 0.31406L21.1547 8.18906C21.3753 8.40116 21.5 8.69398 21.5 9C21.5 9.30602 21.3753 9.59883 21.1547 9.81093L12.9047 17.6859C12.4569 18.1166 11.7447 18.1026 11.3141 17.6547C10.8834 17.2069 10.8974 16.4947 11.3453 16.0641L17.5819 10.125L1.625 10.125C1.00368 10.125 0.5 9.62132 0.5 9Z" fill="currentcolor"/>
			</svg>
		</div>,
		prevArrow: <div>
			<svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fillRule="evenodd" clipRule="evenodd" d="M21.5 9C21.5 9.62132 20.9963 10.125 20.375 10.125L4.41812 10.125L10.6547 16.0641C11.1026 16.4947 11.1166 17.2069 10.6859 17.6548C10.2553 18.1026 9.54312 18.1166 9.09525 17.6859L0.845253 9.81094C0.624665 9.59883 0.5 9.30602 0.5 9C0.5 8.69398 0.624665 8.40117 0.845253 8.18906L9.09525 0.314064C9.54312 -0.116579 10.2553 -0.102615 10.6859 0.345254C11.1166 0.793122 11.1026 1.5053 10.6547 1.93594L4.41812 7.875L20.375 7.875C20.9963 7.875 21.5 8.37868 21.5 9Z" fill="currentcolor"/>
			</svg>
		</div>,
		responsive: [
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
				}
			},
		]
	};

	const imageGalaryThumbs = {
		slidesToShow: 6,
		slidesToScroll: 1,
		asNavFor: '.slider-for',
		dots: false,
		centerMode: true,
		focusOnSelect: true,
		centerPadding: '10px'
	};

	
	const [nav1, setNav1] = useState(null);
	const [nav2, setNav2] = useState(null);
	const [slider1, setSlider1] = useState(null);
	const [slider2, setSlider2] = useState(null);
	const [show, setShow] = useState(false);
	const [EmailModal, setEmailModal] = useState(false);
	const { setActiveItem } = useMyContext();

	const [galaryFirstImage, setgalaryFirstImage] = useState(
		{imageUrl: './images/projects-galary/kitchen-before.jpg'}
	);
	const [galarySecondImage, setgalarySecondImage] = useState(
		{imageUrl: './images/projects-galary/kitchen-after.jpg'}
	);
	
	setActiveItem('home');

	useEffect(() => {
		setNav1(slider1);
		setNav2(slider2);
		window.scrollTo(0, 0)
	});
	
	const GalaryModalHide = () => setShow(false);
	const GalaryModalShow = () => setShow(true);

		
		const emailformTimerref = useRef();

		useEffect(() => {
		  emailformTimerref.current = setTimeout(() => {
			setEmailModal(false)
		  }, 3000);
	  
		  return () => {
			clearTimeout(emailformTimerref.current);
		  };
		}, []);
	
	const galary_image_change = (e) => {
		setgalaryFirstImage(galaryFirstImage => ({
			imageUrl: e.target.getAttribute("data-first")
		}));

		setgalarySecondImage(galarySecondImage => ({
			imageUrl: e.target.getAttribute("data-second")
		}));
	 };
	 const {isMobile, isTablet} = UseDeviceType();
	
	
	return (
		<>
			<Modal show={EmailModal}  className='email-submition-modal' dialogClassName="modal-lg">
				<Modal.Body>
					<div onClick={() => setEmailModal(false)}  className='icon-rounded close-modal'>
						<svg x="0px" y="0px" width="20px" height="20px" viewBox="0 0 121.31 122.876">
							<path fillRule="evenodd" clipRule="evenodd" fill='currentcolor' d="M90.914,5.296c6.927-7.034,18.188-7.065,25.154-0.068 c6.961,6.995,6.991,18.369,0.068,25.397L85.743,61.452l30.425,30.855c6.866,6.978,6.773,18.28-0.208,25.247 c-6.983,6.964-18.21,6.946-25.074-0.031L60.669,86.881L30.395,117.58c-6.927,7.034-18.188,7.065-25.154,0.068 c-6.961-6.995-6.992-18.369-0.068-25.397l30.393-30.827L5.142,30.568c-6.867-6.978-6.773-18.28,0.208-25.247 c6.983-6.963,18.21-6.946,25.074,0.031l30.217,30.643L90.914,5.296L90.914,5.296z"/>
						</svg>
					</div>
					<div className="slider-wrapper">
						<div className="email-submition-modal-form-wrap">
							<LazyLoadImage src='../images/email-icon.png' width={`${isMobile || isTablet ? '60px' : 'auto' } `} />
							<h3 className='modal-title'>BECOME A SUBSCRIBER </h3>
							<p className='modal-desc'>Subscribe To Get The Notification Of <br /> Latest <span className='text-primary'>POSTS</span></p>
							<div className='primary-input-holder'>
							<form action="https://formspree.io/f/mbjnoawe" method="POST">
								<svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M23.9167 7.08333H25.5001V8.66667C25.5001 9.08659 25.6669 9.48932 25.9638 9.78625C26.2608 10.0832 26.6635 10.25 27.0834 10.25C27.5033 10.25 27.9061 10.0832 28.203 9.78625C28.4999 9.48932 28.6667 9.08659 28.6667 8.66667V7.08333H30.2501C30.67 7.08333 31.0727 6.91652 31.3697 6.61959C31.6666 6.32265 31.8334 5.91993 31.8334 5.5C31.8334 5.08007 31.6666 4.67735 31.3697 4.38041C31.0727 4.08348 30.67 3.91667 30.2501 3.91667H28.6667V2.33333C28.6667 1.91341 28.4999 1.51068 28.203 1.21375C27.9061 0.916815 27.5033 0.75 27.0834 0.75C26.6635 0.75 26.2608 0.916815 25.9638 1.21375C25.6669 1.51068 25.5001 1.91341 25.5001 2.33333V3.91667H23.9167C23.4968 3.91667 23.0941 4.08348 22.7972 4.38041C22.5002 4.67735 22.3334 5.08007 22.3334 5.5C22.3334 5.91993 22.5002 6.32265 22.7972 6.61959C23.0941 6.91652 23.4968 7.08333 23.9167 7.08333ZM30.2501 13.4167C29.8302 13.4167 29.4274 13.5835 29.1305 13.8804C28.8336 14.1773 28.6667 14.5801 28.6667 15V24.5C28.6667 24.9199 28.4999 25.3227 28.203 25.6196C27.9061 25.9165 27.5033 26.0833 27.0834 26.0833H4.91675C4.49682 26.0833 4.0941 25.9165 3.79716 25.6196C3.50023 25.3227 3.33341 24.9199 3.33341 24.5V9.31583L12.6434 18.6417C13.534 19.5312 14.7413 20.0308 16.0001 20.0308C17.2588 20.0308 18.4661 19.5312 19.3567 18.6417L23.2676 14.7308C23.5657 14.4327 23.7332 14.0283 23.7332 13.6067C23.7332 13.185 23.5657 12.7806 23.2676 12.4825C22.9694 12.1844 22.5651 12.0169 22.1434 12.0169C21.7218 12.0169 21.3174 12.1844 21.0192 12.4825L17.1084 16.3933C16.8124 16.6834 16.4145 16.8459 16.0001 16.8459C15.5856 16.8459 15.1877 16.6834 14.8917 16.3933L5.56591 7.08333H17.5834C18.0033 7.08333 18.4061 6.91652 18.703 6.61959C18.9999 6.32265 19.1667 5.91993 19.1667 5.5C19.1667 5.08007 18.9999 4.67735 18.703 4.38041C18.4061 4.08348 18.0033 3.91667 17.5834 3.91667H4.91675C3.65697 3.91667 2.44879 4.41711 1.55799 5.30791C0.667193 6.19871 0.166748 7.40689 0.166748 8.66667V24.5C0.166748 25.7598 0.667193 26.968 1.55799 27.8588C2.44879 28.7496 3.65697 29.25 4.91675 29.25H27.0834C28.3432 29.25 29.5514 28.7496 30.4422 27.8588C31.333 26.968 31.8334 25.7598 31.8334 24.5V15C31.8334 14.5801 31.6666 14.1773 31.3697 13.8804C31.0727 13.5835 30.67 13.4167 30.2501 13.4167Z" fill="#333333"/>
								</svg>
								<input className="form-control" name='Newsletter Email' placeholder='Enter Your Email' />
								<Button className='submit-email' type="submit">
									<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M24.7843 1.22287C24.1593 0.584123 23.2343 0.347873 22.3718 0.597873L2.25928 6.40912C1.34928 6.66162 0.704275 7.38287 0.530525 8.29787C0.353025 9.23037 0.973025 10.4154 1.78303 10.9104L8.07178 14.7504C8.71677 15.1454 9.54928 15.0466 10.083 14.5116L17.2843 7.31037C17.6468 6.93412 18.2468 6.93412 18.6093 7.31037C18.9718 7.67162 18.9718 8.26037 18.6093 8.63537L11.3955 15.8366C10.8605 16.3716 10.7605 17.2016 11.1543 17.8479L14.9968 24.1604C15.4468 24.9091 16.2218 25.3354 17.0718 25.3354C17.1718 25.3354 17.2843 25.3354 17.3843 25.3216C18.3593 25.1979 19.1343 24.5341 19.4218 23.5966L25.3843 3.63537C25.6468 2.78537 25.4093 1.86037 24.7843 1.22287Z" fill="#333333"/>
										<path d="M9.81424 21.928C10.1792 22.2942 10.1792 22.888 9.81424 23.2542L8.10674 24.9605C7.92424 25.1442 7.68424 25.2355 7.44424 25.2355C7.20424 25.2355 6.96424 25.1442 6.78174 24.9605C6.41549 24.5942 6.41549 24.0017 6.78174 23.6355L8.48799 21.928C8.85424 21.563 9.44799 21.563 9.81424 21.928ZM8.83462 17.193C9.19962 17.5592 9.19962 18.153 8.83462 18.5192L7.12712 20.2255C6.94461 20.4092 6.70461 20.5005 6.46461 20.5005C6.22461 20.5005 5.98462 20.4092 5.80212 20.2255C5.43587 19.8592 5.43587 19.2667 5.80212 18.9005L7.50836 17.193C7.87461 16.828 8.46837 16.828 8.83462 17.193ZM4.13312 15.7025C4.49812 16.0687 4.49812 16.6625 4.13312 17.0287L2.42562 18.735C2.24312 18.9187 2.00312 19.01 1.76312 19.01C1.52312 19.01 1.28312 18.9187 1.10062 18.735C0.734365 18.3687 0.734365 17.7762 1.10062 17.41L2.80687 15.7025C3.17312 15.3375 3.76687 15.3375 4.13312 15.7025Z" fill="#333333"/>
									</svg>
								</Button>
							</form>
                    </div>
						</div>
					</div>
				</Modal.Body>
			</Modal>
			<HeroBanner />
			<div className='services-cards-main'>
				<div className='items-holder'>
					{servicesCard.map((item, index) => (
						<HomeServiceCard title={item.title} image={item.image} Link={item.path} key={index} />
					))}
				</div>
			</div>
			<section className='section section-bg-light featured-services'>
				<div className='button-holder animated-primary-button'>
					<Link to={'/services'} className={'btn button-primary btn-c-rounded '} >
						View All Services
						<ReactSVG src='../images/hand-cursor-icon.svg' />
					</Link>
				</div>
				<div className='container'>
					<div className='h-list justify-content-between flex-lg-nowrap mb-4 ' data-gap="0" data-gap-lg="40">
						<div className='grid' data-gap="10">
							<h3 className='section-title'>Featured Services</h3>
							<p>Elevate your  dream projects through our expert - where expertise meets innovation. From concept to completion, we redefine construction standards with precision, creativity, and a dedication to perfection. We blend modern techniques with traditional craftsmanship, ensuring your projects stand out for their quality and ingenuity.</p>
						</div>
						
					</div>
					<Slider {...FeaturedPropertiesSlider}>
						{ourServices.map((item, index) => 
							<ServiceCard image={item.image} title={item.title} description={item.desc} price={item.price} path={index} id={index} />
						)}
					</Slider>
				</div>
			</section>
			<section className='section projects-section'>
				<div className='button-holder animated-primary-button'>
					<Link to={`projects`} onClick={GalaryModalShow} className={'btn button-primary btn-c-rounded '} >
						View All Projects
						<ReactSVG src='../images/hand-cursor-icon.svg' />
					</Link>
					{/* <button onClick={GalaryModalShow} className={'btn button-primary btn-c-rounded '} >
						View All Projects
						<ReactSVG src='../images/hand-cursor-icon.svg' />
					</button> */}
				</div>
				<div className='container'>
					<div className='h-list justify-content-between flex-lg-nowrap mb-4 ' data-gap="0" data-gap-lg="40">
						<div className='grid' data-gap="10">
							<h3 className='section-title'>Featured Projects</h3>
							<p>Explore our "Projects" section to witness the evolution of ideas into landmarks. From concept to completion, our portfolio reflects a legacy of excellence in construction. Every space we create tells a story of innovation, functionality, and aesthetic appeal.</p>
						</div>
						
					</div>
					<div className='home-before-after-holder'>
						<ReactBeforeSliderComponent firstImage={FIRST_IMAGE_} secondImage={SECOND_IMAGE_}/>
					</div>
					<Modal show={show} onHide={GalaryModalHide} className='projects-galary-modal' dialogClassName="modal-fullscreen">
						<Modal.Body>
							<div onClick={GalaryModalHide} className='icon-rounded close-modal'>
								<svg x="0px" y="0px" width="20px" height="20px" viewBox="0 0 121.31 122.876">
									<path fillRule="evenodd" clipRule="evenodd" fill='currentcolor' d="M90.914,5.296c6.927-7.034,18.188-7.065,25.154-0.068 c6.961,6.995,6.991,18.369,0.068,25.397L85.743,61.452l30.425,30.855c6.866,6.978,6.773,18.28-0.208,25.247 c-6.983,6.964-18.21,6.946-25.074-0.031L60.669,86.881L30.395,117.58c-6.927,7.034-18.188,7.065-25.154,0.068 c-6.961-6.995-6.992-18.369-0.068-25.397l30.393-30.827L5.142,30.568c-6.867-6.978-6.773-18.28,0.208-25.247 c6.983-6.963,18.21-6.946,25.074,0.031l30.217,30.643L90.914,5.296L90.914,5.296z"/>
								</svg>
							</div>
							<div className="slider-wrapper">
								
								<ReactBeforeSliderComponent firstImage={galaryFirstImage} secondImage={galarySecondImage} />
								
								<div className="thumbnail-slider-wrap">
									<Slider {...imageGalaryThumbs} asNavFor={nav1} ref={slider => (setSlider2(slider))}>
										{projectsGalaryData.map((slide, index) =>
											<div className="slick-slide image-holder galary-thumb" key={slide.id}>
												<img className="slick-slide-image" onClick={galary_image_change} src={slide.imageUrl2} data-first={slide.imageUrl2} data-second={slide.imageUrl1}  />
											</div>
										)}
									</Slider>
								</div>
							</div>
						</Modal.Body>
					</Modal>
				</div>
			</section>
			<section className='section section-bg-light about-us-section'>
				<div className='container'>
					<div className='grid align-items-center' grid-item-width-md="1/2" grid-item-width="1/1" data-gap="20" data-gap-md="50">
						<div className='grid' grid-item-width="1/1" data-gap="10">
							<h3 className='section-title'>About Us</h3>
							<div>
								<p>We specialize in providing high-quality construction services to individuals and businesses alike. With years of experience in the industry, we are committed to delivering exceptional results and exceeding our client's expectations.</p>
								<p>Our team consists of skilled and experienced professionals who are passionate about what they do. From project planning and design to construction and post-construction services, we work closely with our clients to ensure that their vision is brought to life. </p>
							</div>
							<div>
								<LinkBtn linkto='/about' className={'button-primary btn-c-rounded'} children={'Read More'} />
							</div>
						</div>
						<div className='image-holder'>
							<LazyLoadImage src='../images/about-us-image.jpg' />
						</div>
					</div>
				</div>
			</section>
			<section className='section our-values'>
				<div className='container'>
					<div className='content-data-holder'>
						<div className='grid' data-gap="10">
							<h3 className='section-title'>Our Values</h3>
							<h5 className='text-primary font-weight-700'>Our Values at DMV-GC Group</h5>
							<p className='mb-1'>At DMV-GC Group, we are guided by a set of fundamental values that underscore our commitment to excellence.</p>
							<p> In essence, these values serve as the guiding principles steering our decisions, actions, and aspirations, defining the essence of DMV-GC Group and reinforcing our dedication to delivering excellence in every project we undertake.</p>
						</div>
						<div className='grid cards-holder' grid-item-width="1/1" grid-item-width-md="1/2" data-gap="0">
							<div className='card-item'>
								<div className='h-list' data-gap="20">
									<div className='icon-rounded'>
										<svg width="30" height="28" viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path fillRule="evenodd" clipRule="evenodd" d="M13.2831 1.54864C13.9182 0.0215481 16.0815 0.0215472 16.7167 1.54864L19.6661 8.64007L27.3219 9.25383C28.9706 9.386 29.6391 11.4434 28.383 12.5194L22.5501 17.5159L24.3321 24.9866C24.7159 26.5954 22.9657 27.867 21.5543 27.0048L14.9999 23.0014L8.44543 27.0048C7.03398 27.867 5.28384 26.5954 5.66759 24.9866L7.44964 17.5159L1.61673 12.5194C0.36066 11.4434 1.02915 9.386 2.67777 9.25383L10.3336 8.64007L13.2831 1.54864Z" fill="#C63940"/>
										</svg>
									</div>
									<h4>Trust</h4>
								</div>
								<p>Trust is the bedrock of DMV-GC Group. We prioritize transparent communication, unwavering integrity, and reliability, cultivating enduring relationships with clients, partners, and team members.</p>
							</div>
							<div className='card-item'>
								<div className='h-list' data-gap="20">
									<div className='icon-rounded'>
										<svg width="33" height="28" viewBox="0 0 33 28" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M16.0746 0.974129C16.3458 0.855629 16.6542 0.855629 16.9254 0.974129C22.1937 3.27596 27.1868 6.08983 31.8417 9.35268C32.1786 9.5888 32.3489 9.99817 32.2789 10.4036C32.2089 10.8089 31.9111 11.1375 31.5146 11.2469C30.5443 11.5148 29.5823 11.8032 28.6291 12.1106C24.7601 13.3584 21.0357 14.9284 17.4875 16.7891L17.4829 16.7915C17.322 16.8759 17.1615 16.9609 17.0013 17.0464C16.6885 17.2136 16.3128 17.2136 15.9999 17.0464C15.8382 16.96 15.6762 16.8742 15.5138 16.7891C13.7593 15.869 11.9617 15.0201 10.1249 14.246V13.9291C10.1249 13.743 10.2204 13.5779 10.3682 13.4883C12.5004 12.1966 14.6998 11.0046 16.9599 9.91906C17.4889 9.66499 17.7117 9.03023 17.4576 8.50128C17.2036 7.97234 16.5688 7.7495 16.0398 8.00357C13.7176 9.11902 11.4578 10.3437 9.26708 11.6709C8.62479 12.06 8.193 12.6968 8.05098 13.4103C6.83984 12.9444 5.61278 12.5105 4.37079 12.11C3.41762 11.8026 2.45567 11.5147 1.4854 11.2469C1.08885 11.1375 0.791114 10.8089 0.721101 10.4035C0.651088 9.99815 0.821378 9.58879 1.15825 9.35266C5.81319 6.08981 10.8063 3.27596 16.0746 0.974129Z" fill="#C63940"/>
											<path d="M18.0028 18.9207C21.4578 17.0746 25.0878 15.5139 28.8614 14.27C29.0516 16.2743 29.173 18.2985 29.2233 20.3402C29.2341 20.7783 28.9749 21.1781 28.5705 21.3469C24.5314 23.0332 20.6895 25.0982 17.0891 27.4975C16.7323 27.7353 16.2675 27.7353 15.9107 27.4975C12.3103 25.0982 8.46841 23.0332 4.42931 21.3469C4.02494 21.1781 3.76569 20.7783 3.77648 20.3402C3.82679 18.2984 3.94823 16.274 4.13843 14.2695C5.44318 14.6996 6.73076 15.1675 7.99988 15.672V17.4718C7.36471 17.8392 6.93738 18.5259 6.93738 19.3125C6.93738 20.0142 7.27749 20.6364 7.80186 21.0234C7.67504 21.5626 7.48736 22.0903 7.2388 22.5956C7.88012 22.8983 8.51595 23.2107 9.1461 23.5326C9.50499 22.8027 9.76522 22.0366 9.92675 21.2543C10.6696 20.9232 11.1874 20.1783 11.1874 19.3125C11.1874 18.5259 10.76 17.8392 10.1249 17.4718V16.5583C11.7844 17.2834 13.4099 18.0719 14.9985 18.9207C15.9371 19.4222 17.0641 19.4222 18.0028 18.9207Z" fill="#C63940"/>
											<path d="M5.82136 24.5716C6.41513 23.9778 6.88783 23.309 7.2388 22.5956C7.88012 22.8983 8.51595 23.2107 9.1461 23.5326C8.69482 24.4504 8.0872 25.3109 7.32396 26.0742C6.90903 26.4891 6.23629 26.4891 5.82136 26.0742C5.40643 25.6592 5.40643 24.9865 5.82136 24.5716Z" fill="#C63940"/>
										</svg>
									</div>
									<h4>Excellence</h4>
								</div>
								<p>Committed to excellence in all aspects, DMV-GC Group strives for the highest standards—from meticulous planning to flawless execution. We ensure that every project reflects our relentless pursuit of quality.</p>
							</div>
							<div className='card-item'>
								<div className='h-list' data-gap="20">
									<div className='icon-rounded'>
										<svg width="30" height="27" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path fillRule="evenodd" clipRule="evenodd" d="M9.6875 5.5625C9.6875 2.62849 12.066 0.25 15 0.25C17.934 0.25 20.3125 2.62849 20.3125 5.5625C20.3125 8.49651 17.934 10.875 15 10.875C12.066 10.875 9.6875 8.49651 9.6875 5.5625Z" fill="#C63940"/>
											<path fillRule="evenodd" clipRule="evenodd" d="M20.3125 9.8125C20.3125 7.46529 22.2153 5.5625 24.5625 5.5625C26.9097 5.5625 28.8125 7.46529 28.8125 9.8125C28.8125 12.1597 26.9097 14.0625 24.5625 14.0625C22.2153 14.0625 20.3125 12.1597 20.3125 9.8125Z" fill="#C63940"/>
											<path fillRule="evenodd" clipRule="evenodd" d="M1.1875 9.8125C1.1875 7.46529 3.09029 5.5625 5.4375 5.5625C7.78471 5.5625 9.6875 7.46529 9.6875 9.8125C9.6875 12.1597 7.78471 14.0625 5.4375 14.0625C3.09029 14.0625 1.1875 12.1597 1.1875 9.8125Z" fill="#C63940"/>
											<path fillRule="evenodd" clipRule="evenodd" d="M6.93897 17.4165C8.6361 14.7629 11.6118 13 15 13C18.3886 13 21.3646 14.7633 23.0617 17.4175C24.2349 19.2524 24.7425 21.4649 24.5044 23.6221C24.4672 23.9592 24.2712 24.2583 23.9771 24.4271C21.3317 25.945 18.2655 26.8125 15 26.8125C11.7345 26.8125 8.66833 25.945 6.02293 24.4271C5.72875 24.2583 5.53284 23.9592 5.49563 23.6221C5.25749 21.4645 5.76533 19.2516 6.93897 17.4165Z" fill="#C63940"/>
											<path d="M5.1999 16.1927C5.18284 16.2189 5.16589 16.2452 5.14903 16.2716C3.7813 18.4101 3.15536 20.957 3.34751 23.4678C2.48611 23.3369 1.65032 23.1265 0.848106 22.8439L0.685249 22.7866C0.388158 22.682 0.180572 22.4122 0.155587 22.0982L0.141891 21.9261C0.130691 21.7853 0.125 21.6432 0.125 21.5C0.125 18.6456 2.37615 16.317 5.1999 16.1927Z" fill="#C63940"/>
											<path d="M26.653 23.4677C26.8451 20.9574 26.2195 18.4111 24.8522 16.2728C24.8351 16.246 24.8179 16.2193 24.8006 16.1927C27.6241 16.3173 29.875 18.6458 29.875 21.5C29.875 21.6432 29.8693 21.7853 29.8581 21.9261L29.8444 22.0982C29.8194 22.4122 29.6118 22.682 29.3148 22.7866L29.1519 22.8439C28.3498 23.1264 27.5142 23.3368 26.653 23.4677Z" fill="#C63940"/>
										</svg>
									</div>
									<h4>Client-Centric</h4>
								</div>
								<p>Putting our clients first is embedded in our ethos at DMV-GC Group. We are devoted to understanding and surpassing client expectations, tailoring our services to provide bespoke solutions aligned with their unique vision.</p>
							</div>
							<div className='card-item'>
								<div className='h-list' data-gap="20">
									<div className='icon-rounded'>
										<svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path fillRule="evenodd" clipRule="evenodd" d="M12.7831 1.54864C13.4182 0.0215481 15.5815 0.0215472 16.2167 1.54864L19.1661 8.64007L26.8219 9.25383C28.4706 9.386 29.1391 11.4434 27.883 12.5194L22.0501 17.5159L23.8321 24.9866C24.2159 26.5954 22.4657 27.867 21.0543 27.0048L14.4999 23.0014L7.94543 27.0048C6.53398 27.867 4.78384 26.5954 5.16759 24.9866L6.94964 17.5159L1.11673 12.5194C-0.13934 11.4434 0.529147 9.386 2.17777 9.25383L9.83357 8.64007L12.7831 1.54864Z" fill="#C63940"/>
										</svg>
									</div>
									<h4>Our Commitment</h4>
								</div>
								<p>Our commitment extends beyond project completion. At DMV-GC Group, we embrace sustainability, innovation, and positive community impact. We stand by our promises, ensuring that our influence endures long after the final brick is laid.</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className='section section-bg-light testimonials-main'>
				<div className='container'>
					<div className='h-list justify-content-between flex-nowrap mb-4' data-gap="10">
						<div className='grid' data-gap="10">
							<h3 className='section-title'>What Our Clients Say</h3>
							<p>At DMV-GC Group, our clients' satisfaction is at the core of our mission. Here's a glimpse into what clients have consistently highlighted about their experiences partnering with us:</p>
						</div>
					</div>
					<Slider {...TestimonialsSlider}>
						{TestimonialsData.map((item, index) => 
							<TestimonialCard image={item.image} title={item.title} description={item.desc} name={item.name} adress={item.adress} />
						)}
					</Slider>
				</div>
			</section>
			<StartJourney />
		</>
	)
}

export default Home
