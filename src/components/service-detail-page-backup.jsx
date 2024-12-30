import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { useMyContext } from '../components/context';
import serviceData from "./service-data";

const StyledCom = styled.div`
	.service-details-main{background: var(--primary-color); margin-bottom: 50px; padding-bottom: 80px; margin-top: 300px; }
	.data-holder{
		background: #f8f8f8; position: relative; min-height: 300px; display: grid; grid-template-columns: auto 1fr; top: -100px;
		&:before{content: ""; position: absolute; top: 20px; left: -20px; height: 100%; width: calc(40px + 100%); border: 1px solid #ccc}

		.title-holder{max-width: 450px; display: flex; align-items: center; padding: 40px}
		.grid-pictures-holder{
			position: relative;
			
			.items-holder{display: grid; grid-template-columns: 1fr 1fr; grid-gap: 30px; position: absolute; width: 100%; right: 0; top: -40px}
			.item{height: 250px}
		}
	}
	.desc-holder{
		margin-top: -50px; color: #fff;

		p:first-child{max-width: 400px; text-align: justify;}
	}
`;


const ServiceDetailPage =() => {
	const { setActiveItem } = useMyContext();
	setActiveItem('services');

	const { id } = useParams(); 
	console.log(id);

	const tService = serviceData.find((serv) => serv.id === id);

	if (!tService) {
		return <div>Service not found</div>;
	}

  return (
    <StyledCom>
		{/* <h2>{tService.title}</h2> */}
		<div className="service-details-main">
			<div className="container">
				<div className="data-holder">
					<div className="title-holder">
						<h1>Home Remodeling</h1>
					</div>
					<div className="grid-pictures-holder">
						<div className="items-holder">
							<div className="image-holder item">
								<LazyLoadImage src='../images/services/additions.jpg' alt='image' />
							</div>
							<div className="image-holder item">
								<LazyLoadImage src='../images/services/carpet.jpg' alt='image' />
							</div>
							<div className="image-holder item">
								<LazyLoadImage src='../images/services/flooring.jpg' alt='image' />
							</div>
							<div className="image-holder item">
								<LazyLoadImage src='../images/services/patios.jpg' alt='image' />
							</div>
						</div>
					</div>
				</div>
				<div className="desc-holder">
					<p>Your kitchen is the heart of your home – it’s where you prepare meals, gather with family and friends, and create lasting memories. At DMV, we understand the importance of having a space that’s not only functional, but also reflects your personal style.</p>
					<p>Our team of expert designers and contractors will work with you to create the kitchen of your dreams. From custom cabinetry and countertops to lighting and flooring, we’ll transform your space into a welcoming, functional and stylish oasis.</p>
				</div>
			</div>
		</div>
      
    </StyledCom>
  );
}

export default ServiceDetailPage;