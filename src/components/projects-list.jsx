import React from "react";
import projectsGalaryData from './projects-data'
import ProjectCard from "./project-card";

// const StyledCom = styled.div`
    
// `;

function ProjectsList() {
	const Cards =  projectsGalaryData.map(project => {
		return ( 
			<ProjectCard afterImage={project.images[0].imageUrl2} id={project.id} client={project.client} category={project.category} details={project.details} description={project.description}  />
		)
	});

	return (
		<>{Cards}</>
	)
}

export default ProjectsList;