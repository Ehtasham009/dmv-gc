import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Slider from 'react-slick';
import styled from 'styled-components';
// import { LazyLoadImage } from 'react-lazy-load-image-component';

const StyledCom = styled.div`
    min-height: 100vh; display: flex; align-items: center; justify-content: center; position: relative;
    &::before{content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(ellipse at top, var(--primary-color), transparent), radial-gradient(ellipse at bottom, var(--secondary-color), transparent); z-index: 1; opacity: 0.2}
    
    // .image-holder{height: 100vh; position: absolute; top: 0; left: 0}
    .slider-image-holder{height: 100vh;}
    .sliderimages-holder{height: 100vh; position: absolute; top: 0; left: 0; width: 100%}
    .video-holder{height: 100vh; position: absolute; width: 100%; top: 0; left: 0}
    .content-data{position: relative; z-index: 1; text-align: center}
    .content-data h1{font-size: 74px; margin-top: 20px; position: relative; font-weight: 800; text-align: center; text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.70); color: var(--text-light); }
    .content-data h1::after{content: ""; position: absolute;  height: 40%; width: 100%; background: var(--primary-color); bottom: 0; left: 50%; transform: translateX(-50%); z-index: -1}
    .sub-title{background: var(--primary-color); color: #ffffff; font-size: 28px; padding: 2px 10px; font-weight: 700; margin-bottom: 20px}
    .slick-track{display: block}
    @media(max-width: 1024px){
        .content-data h1{font-size: 48px; }
    }
    
    @media(max-width: 768px){
        min-height: 300px;
        
        .video-holder{height: 300px; }

        .slider-image-holder{height: 300px;}
        .sliderimages-holder{height: 300px; position: absolute; top: 0; left: 0; width: 100%}

    }
`;

function HeroBanner() {
    const BannerSlider ={
		infinite: true,
		speed: 500,
		autoplay: true,
  		autoplaySpeed: 2000,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
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
	};

    const BannerSliderImages = [
        {image: './images/hero-banner.jpg'},
        {image: './images/kitchen-after.jpg'},
        {image: './images/services-banner.jpg'}
    ]

    return (
    <StyledCom>
        {/* <div className="image-holder">
            <LazyLoadImage src={'./images/hero-banner.jpg'} alt={'banner'} />
        </div> */}
        <div className='sliderimages-holder'>
            <Slider {...BannerSlider}>
                {BannerSliderImages.map((item, index) => 
                    <div id={index} className='image-holder slider-image-holder'>
                        <LazyLoadImage src={item.image} />
                    </div>
                )}
            </Slider>
        </div>
        {/* <div className='video-holder'> */}
            {/* <video id="banner-video" autoPlay muted loop>
                <source src={'./videos/hero-banner.mp4'} />
            </video> */}
            {/* <video id="banner-video" src="./videos/hero-banner.mp4" type="video/mp4" loop autoPlay ></video> */}
        {/* </div> */}
        {/* <div className='content-data'>
            <span className='sub-title'>RESIDENTIAL AND COMMERCIAL</span>
            <h1>REMODELING SPECIALISTS</h1>
        </div> */}
    </StyledCom>
  )
}

export default HeroBanner;