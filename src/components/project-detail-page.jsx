import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import BeforeAfterSlider from "react-before-after-slider";


import { useMyContext } from "../components/context";
import projectsData from "./projects-data";
import StartJourney from "./start-journey";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const StyledCom = styled.div`
    margin-top: 30px;
        
    .page-content{padding-top: 0}
    .top-banner{
        background-color: var(--primary-color); color: #fff; text-align: center; padding: 40px 20px; margin-bottom: 50px; min-height: calc(100vh - 100px); display: flex; align-items: center; justify-content: center; background-size: cover; background-position: center; position: relative;

        h1{font-size: 48px; margin-top: 20px; position: relative; font-weight: 800; text-align: center; text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.70); color: var(--text-light); z-index: 1}
        h1::after{content: ""; position: absolute;  height: 40%; width: 100%; background: var(--primary-color); bottom: 0; left: 50%; transform: translateX(-50%); z-index: -1}

    }
	.images-holder {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 30px;
	}

	.image-item {
		border: 1px solid #ccc;
		padding: 10px;
		border-radius: 8px;

        .before-after-slider{height: 250px}
	    .before-after-slider__first-photo-container, .before-after-slider__second-photo-container{height: 250px}
        .before-after-slider__first-photo-container img, .before-after-slider__second-photo-container img{object-fit: cover; }
	}
	.before-after-slider{height: 100%}
	.before-after-slider__first-photo-container, .before-after-slider__second-photo-container{height: 100%}
	.before-after-slider__first-photo-container img, .before-after-slider__second-photo-container img{height: 100%}
	.before-after-slider__delimiter{animation: none}
	.before-after-slider__delimiter-icon{--size: 50px; background: url('data:image/svg+xml,<svg className="arrow" width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.875 27.625L28.125 6.375M28.125 6.375L12.1875 6.375M28.125 6.375V22.3125" stroke="%23262626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>'); background-repeat: no-repeat; background-position: center;}
`;

const ProjectDetailPage = () => {
  const [open, setOpen] = React.useState(false);
  const [clickedIndex, setClickedIndex] = React.useState(null);

  const { setActiveItem } = useMyContext();
  setActiveItem("projects");

  const { id } = useParams();
  const tService = projectsData.find((serv) => serv.id === id);

  if (!tService) {
    return <div>Service not found</div>;
  }

  // Prepare the slides with individual ReactBeforeSliderComponent for each image pair
  const slides = tService.images.map((imageItem, index) => {
        const beforeImage = imageItem.imageUrl1 ;
        const afterImage = imageItem.imageUrl2;

        return {
            type: "before-after-slider",
            component: (
                <BeforeAfterSlider key={index} width={1240} height={600} before={afterImage} after={ beforeImage} />
            ),
        };
    });

    return (
        <StyledCom>
            <section className="section page-content">
                <div className="top-banner" style={{ backgroundImage: `url(${tService.images[0].imageUrl2})` }}>
                    <h1>Project Journey</h1>
                </div>
                <div className="container">
                    <h3 className='section-title mb-3'>{tService.client}</h3>
                    <p>{tService.description}</p>
                    {tService.titles.map((title, index) => (
                        <div key={index} className="mb-3">
                        <h4 className="mb-2">{title}</h4>
                            <div className="description-holder mb-4">
                                <ul className="ps-4">
                                    {tService.details[index].map((item, detailIndex) => (
                                            <li key={detailIndex} className="mb-1 font-size-16"><strong className="text-primary">{item.point_title}</strong> {item.point_desc}</li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                    <div className="images-holder" data-gap="20">
                        {tService.images.map((imageItem, index) => {
                            const beforeImage = { imageUrl: imageItem.imageUrl1 };
                            const afterImage = { imageUrl: imageItem.imageUrl2 };

                            return (
                                <div className="image-item" onClick={() => { setClickedIndex(index); setOpen(true); }} key={index} >
                                    <ReactBeforeSliderComponent firstImage={afterImage} secondImage={beforeImage} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={slides}
                drag={false}
                arrows={true}
                swipe={false}
                index={clickedIndex}  
                controller={{ ref: null, focus: false, aria: false, touchAction: "none" | "pan-x"}}
                animation={{ swipe: 1}}
                render={{
                slide: ({ slide }) =>
                    slide.type === "before-after-slider" ? (
                    <div className="image-item">
                        {slide.component}
                    </div>
                    ) : undefined,
                }}
            />
            <StartJourney />
        </StyledCom>
    );
};

export default ProjectDetailPage;
