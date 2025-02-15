import React, {useEffect, useState} from 'react'
import { useMyContext } from './context';

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ReactSVG } from 'react-svg';
import UseDeviceType from './deviceBreakPoint';

import SupportChatModule from './supportChatModule';

const StyledCom = styled.div`
    position: fixed; top: 0; left: 0; width: 100%; background: rgba(255, 255, 255, 1); min-height: 90px; padding: 10px 50px; z-index: 9; margin-top: 26px;
    &.active_menu{background: rgba(255, 255, 255, 1); box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);}
    .slogan-holder{position: absolute; top: -27px; left: 0; width: 100%; background: var(--primary-color); color: white; display: flex; align-items: center; font-size: 14px; padding: 5px }

    .main-nav a{color: var(--content-color); font-weight: 700; text-decoration: none}
    .main-nav a.active{color: var(--text-light); background: var(--primary-color); border-radius: 5px; padding: 5px 15px}

    .menu-icon{--size: 35px; z-index: 99; padding: 5px 10px; background: var(--primary-color); color: #fff; border-radius: 5px;}

    @media(max-width: 1180px){
        .main-nav{grid-gap: 20px}
        .main-nav a{font-size: 16px}
    }
    @media(max-width: 1024px){ 
        padding: 10px 20px;
        
        .main-nav{ position: fixed; height: 100vh; grid-gap: 0; width: 100%; max-width: 70vw; background: white; left: -200%; top: 0; flex-direction: column; justify-content: flex-start; transition: all 0.2s; animation-delay: 2s; padding: 40px 10px; align-items: flex-start; box-shadow: 10px 0 10px rgba(0, 0, 0, 0.2) }
        .main-nav a{padding: 10px; border-bottom: 1px solid #ccc; width: 100%}
        .main-nav a.active{border-radius: 0}
        .main-nav.active{left: 0}
    }
    @media(max-width: 768px){ 
        min-height: 70px;
        
        .logo-holder{max-width: 120px}    
        .logo-holder img{width: 100%}    
    }

    .chat-support-module-holder{
		position: fixed; bottom: 20px; right: 20px; 

        .chat-support-button{
            --size: 60px; height: var(--size); width: var(--size); border-radius: var(--size); background: var(--secondary-color); box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2); color: white; cursor: pointer; position: relative; display: flex; align-items: center; transition: width 0.3s;  overflow: hidden;
            &.new-message::before{content: ''; height: 13px; width: 13px; border-radius: 15px; background: var(--secondary-color); position: absolute; top: -3px; right: 6px;}
            .arrow-holder{border-radius: 50px; padding: 11px;}
            &:hover{width: 178px}
            .content{color: transparent; white-space: nowrap}
            &:hover .content{color: white}

            .dot {
                fill:var(--secondary-color);
                animation: wave 1.3s linear infinite;

                &:nth-child(3) {
                    animation-delay: -0.9s;
                }
                &:nth-child(4) {
                    animation-delay: -1.1s;
                }

                // &:nth-child(3) {
                //     animation-delay: -0.9s;
                // }
            }
                @keyframes wave {
                0%, 60%, 100% {
                    transform: initial;
                }

                30% {
                    transform: translateY(-7px);
                }
            }
        }
    }   
    
`;

function Header() {
    const [headerClassName, setHeaderClassName] = useState('');
    const [mobileMenuActive, setmobileMenuActive] = useState(false);
    const [isChatModuleActive, setIsChatModuleActive] = useState(false);
    const { activeMenuItem } = useMyContext();
    const {isMobile, isTablet, isDesktop } = UseDeviceType();

    const handleScroll = (headerClassName) => {
        if (headerClassName !== 'active_menu' && window.pageYOffset >= 100) {
            setHeaderClassName('active_menu');
        } else if (headerClassName === 'active_menu' && window.pageYOffset < 100) {
            setHeaderClassName('');
        }
    }

    const mobileMenu = () => {

        setmobileMenuActive(true)

        
        if(mobileMenuActive === true){
            setmobileMenuActive(false)
        }

    }

    React.useEffect(() => {
        window.onscroll = () => handleScroll(headerClassName);
    }, [headerClassName]); 


     useEffect(() => {
        const items = document.querySelectorAll('.main-nav a');
        const handleClick = () => {
            setmobileMenuActive(false)
        };
        items.forEach((item) => {
            item.addEventListener('click', handleClick);
        });
    }, []);

    const chatModulePopupOpen = () => {
        console.log('we are here')
        setIsChatModuleActive(!isChatModuleActive); 
        // const chatModule = document.querySelector('.chat-support-module');

        // chatModule.classList.add('active')
    }
    const closeChatModule = () => {
        setIsChatModuleActive(false); // Close chat module when X is clicked
    }
  return (
    <StyledCom className={`h-list justify-content-between ${headerClassName}`}>
        
        <div className='slogan-holder'>
            <marquee loop>Your Home is Our Passion! &nbsp; &nbsp; Your Home is Our Passion! &nbsp; &nbsp; Your Home is Our Passion! &nbsp; &nbsp; Your Home is Our Passion! &nbsp; &nbsp; Your Home is Our Passion! &nbsp; &nbsp; Your Home is Our Passion! &nbsp; &nbsp; Your Home is Our Passion! &nbsp; &nbsp; Your Home is Our Passion!</marquee>
        </div>
        <Link to={'/'} className='logo-holder'>
            <LazyLoadImage src={'./images/logo.png'} alt={'dmv gc logo'} />
        </Link>
        <nav className={`h-list main-nav ${mobileMenuActive ? 'active' : ''}`} data-gap='40'>
            <Link to="/" className={activeMenuItem === 'home' ? 'active' : ''} >Home</Link>
            <Link to="/about" className={activeMenuItem === 'about' ? 'active' : ''} >About Us</Link>
            <Link to="/services" className={activeMenuItem === 'services' ? 'active' : ''} >Services</Link>
            <Link to="/projects" className={activeMenuItem === 'projects' ? 'active' : ''} >Projects</Link>
            {/* <Link to="/handyman-services" className={activeMenuItem === 'handyman-services' ? 'active' : ''} >Handyman Services</Link> */}
            {/* <Link to="/inhouse-custom-design" className={activeMenuItem === 'inhouse-custom-design' ? 'active' : ''} >Custom Design</Link> */}
            <Link to="/faq" className={activeMenuItem === 'faq' ? 'active' : ''} >FAQs</Link>
            <Link to="/blogs" className={activeMenuItem === 'blogs' ? 'active' : ''} >Blogs</Link>
            <Link to="/contact" className={activeMenuItem === 'contact' ? 'active' : ''} >Contact</Link>
        </nav>
        {isDesktop ? 
            <div>
                <Link to="/contact" className='btn button-primary btn-c-rounded'>Schedule  Free Consultation</Link>
            </div>
        : null}
        <div className='h-list justify-content-center discover-property-btn'>
            <Link to="/contact" className='position-relative'>
                <ReactSVG src='./images/discover-text.svg' />
                <div className='arrow-holder'>
                    <ReactSVG src='./images/arrow.svg' />
                </div>
            </Link>
        </div>
        <div className='chat-support-module-holder'>
        <SupportChatModule isActive={isChatModuleActive} onClose={closeChatModule} />
            <div className='chat-support-button' onClick={chatModulePopupOpen}>
                <div className='arrow-holder'>
                    <ReactSVG src='./images/chat-icon.svg' />
                </div>
                <div className='content'>Chat with us!</div>
            </div>
        </div>
        {isMobile || isTablet ? 
            <div className='icon-rounded menu-icon' onClick={mobileMenu}>
                {!mobileMenuActive ? 
                    <ReactSVG src='./images/humberger-icon.svg' /> :
                    <ReactSVG src='./images/close-icon.svg' />
            }
            </div>
        : null}
        <div style={{position: 'absolute'}}>
            <audio src="./videos/bell-notification-v2.mp3" type="audio/mp3" className='notification-sound'></audio>
        </div>
    </StyledCom>
  )
}

export default Header;