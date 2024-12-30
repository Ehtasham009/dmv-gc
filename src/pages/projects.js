import React, { useEffect } from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useMyContext } from '../components/context';

import StartJourney from '../components/start-journey';
import ProjectsList from '../components/projects-list';



const StyledCom = styled.div`
    .banner-holder{
		height: 400px; display: flex; align-items: center; justify-content: center;
		
		.image-holder{height: 400px; position: absolute; top: 0; left: 0}
		.content-data{position: relative; z-index: 1; text-align: center; padding-top: 100px}
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

	.cards-holder{display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); grid-gap: 30px; grid-row-gap: 40px}

    
`;

function ProjectsPage() {

	const { setActiveItem } = useMyContext();

	setActiveItem('projects');

	useEffect(() => {
		window.scrollTo(0, 0)
	  }, [])

	return (
		<StyledCom>
			<div className='banner-holder'>
				<div className="image-holder">
					<LazyLoadImage src={'./images/blogs-page-bg.jpg'} alt={'blogs image'} />
				</div>
				<div className='container'>
					<div className='content-data'>
						<div className='h-list justify-content-center'>
							<h1>Our Project Stories</h1>
						</div>
						<h4 className='color-white mt-3'>Transforming Spaces, Enhancing Lives</h4>
						<p className='font-weight-600 mt-3'>Every project tells a story, and every story begins with a vision. At DMV-GC, we don’t just remodel spaces; we craft experiences tailored to our clients’ dreams. Here’s a glimpse into the transformations we’ve created for our valued clients:</p>
					</div>
				</div>
			</div>
			<section className='section section-bg-light '>
				<div className='container'>
					<div className='grid cards-holder'>
						<ProjectsList  />
					</div>
				</div>
			</section>
			<StartJourney />
		</StyledCom>
	)
}

export default ProjectsPage;