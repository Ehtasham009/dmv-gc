import React from "react";
import blogsData from "./blogs-data";
import BlogsCard from "./blogs-card";

// const StyledCom = styled.div`
    
// `;

function BlogsList() {
	const Cards =  blogsData.map(service => {
		return (
			<BlogsCard image={service.image} title={service.title} description={service.desc} price={service.price} path={service.id} id={service.id} />
		)
	});

	return (
		<>{Cards}</>
	)
}

export default BlogsList;