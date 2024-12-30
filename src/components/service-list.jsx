import React from "react";
import {useParams} from "react-router-dom";
import serviceData from "./service-data";
import ServiceCard from "./service-card";

// const StyledCom = styled.div`
    
// `;

function ServiceList() {
	const Cards =  serviceData.map(service => {
		return (
			<ServiceCard image={service.image} title={service.title} description={service.desc} price={service.price} path={service.id} id={service.id} />
		)
	});

	return (
		<>{Cards}</>
	)
}

export default ServiceList;