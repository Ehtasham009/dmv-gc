import React, {useEffect, useState} from 'react'
import { useMyContext } from './context';

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ReactSVG } from 'react-svg';
import UseDeviceType from './deviceBreakPoint';

import SupportChatModule from './supportChatModule';

const StyledCom = styled.div`
    position: fixed; top: 0; left: 0; width: 100%; background: rgba(255, 255, 255, 0.5); min-height: 90px; padding: 10px 50px; z-index: 9;
    &.active_menu{background: rgba(255, 255, 255, 1); box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1)}

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
            --size: 60px; height: var(--size); width: var(--size); border-radius: var(--size); background: var(--primary-color); box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2); color: white; cursor: pointer;
            .arrow-holder{position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); border-radius: 50px; padding: 11px;}
        }
    }   
    
`;

function Header() {
    const [headerClassName, setHeaderClassName] = useState('');
    const [mobileMenuActive, setmobileMenuActive] = useState(false);
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
        const chatModule = document.querySelector('.chat-support-module');

        chatModule.classList.add('active')
    }
  return (
    <StyledCom className={`h-list justify-content-between ${headerClassName}`}>
        <Link to={'/'} className='logo-holder'>
            <LazyLoadImage src={'./images/logo.png'} alt={'dmv gc logo'} />
        </Link>
        <nav className={`h-list main-nav ${mobileMenuActive ? 'active' : ''}`} data-gap='40'>
            <Link to="/" className={activeMenuItem === 'home' ? 'active' : ''} >Home</Link>
            <Link to="/about" className={activeMenuItem === 'about' ? 'active' : ''} >About Us</Link>
            <Link to="/services" className={activeMenuItem === 'services' ? 'active' : ''} >Services</Link>
            <Link to="/handyman-services" className={activeMenuItem === 'handyman-services' ? 'active' : ''} >Handyman Services</Link>
            <Link to="/faq" className={activeMenuItem === 'faq' ? 'active' : ''} >FAQs</Link>
            <Link to="/blogs" className={activeMenuItem === 'blogs' ? 'active' : ''} >Blogs</Link>
            <Link to="/contact" className={activeMenuItem === 'contact' ? 'active' : ''} >Contact</Link>
        </nav>
        {isDesktop ? 
            <div>
                <Link to="/contact" className='btn button-primary btn-c-rounded'>Contact Us</Link>
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
            <SupportChatModule />
            <div className='h-list justify-content-center chat-support-button' onClick={chatModulePopupOpen}>
                <div className='arrow-holder'>
                    <ReactSVG src='./images/chat-icon.svg' />
                </div>
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
    </StyledCom>
  )
}

export default Header;