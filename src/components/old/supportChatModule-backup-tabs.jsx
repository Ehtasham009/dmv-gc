import React, {useEffect, useState} from 'react'
import { useMyContext } from './context';

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ReactSVG } from 'react-svg';
import UseDeviceType from './deviceBreakPoint';
import { Tab, Tabs, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const StyledCom = styled.div`

    .chat-support-module-holder{
		position: fixed; bottom: 20px; right: 20px; 

		.chat-support-module{
			position: absolute; bottom: 70px; right: 0; background-color: white; border-radius: 10px; overflow: hidden; width: 350px; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3); transition: 0.4s all ; opacity: 0; pointer-events: none;
            &.active{opacity: 1; pointer-events: initial}
			.chat-support{
			
				.support-header{justify-content: space-between; gap: 20px; background-color: var(--primary-color); color: white; padding: 5px 10px; font-weight: 700}
                .chat-module-body{
                    background: white; height: 250px; 
                    

                    &::before{content:""; background: url('./images/chat-module-bg.svg'); height: 100%; width: 100%; background-repeat: repeat; position: absolute; opacity: 0.07; pointer-events: none}
                    .chat-items-holder{
                        display: flex; flex-direction: column-reverse; gap: 10px; position: relative; z-index: 9; justify-items: flex-end; height: 250px; overflow-y: auto; padding: 10px;

                        

                        .item{background: var(--primary-color); border-radius: 20px 20px 0 20px; padding: 3px 10px; display: flex; align-self: flex-end; color: white; font-size: 14px}
                        .item.left{border-radius: 20px 20px 20px 0px; align-self: flex-start; background: #E5E3EE; color: #1d1d1d}
                    }
                    .default-questions-screen{
                        .support-button{text-align: right; color: #1d1d1d; padding: 0 15px; font-weight: 700; font-size: 14px}    
                        }
                    .default-questions-holder{padding-top: 30px}
                    .default-q-answers-holder{display: none; position: relative}
                    .default-q-answers-holder .default-q-answers-back{--size: 30px ; color: #fff; padding-right: 4px; padding-bottom: 4px; background: var(--primary-color); margin: 10px 0 0 10px}
                }
                &.questions-screen-active{
                    .write-message{display: none}
                    .chat-module-body{
                        height: 311px;
                    }
                } 
                .write-message{
                    padding:  10px; background: #f7f7f7; position: relative; z-index: 9; flex-wrap: nowrap; border-top: 1px solid #ccc;
                    
                    .input-holder{width: 100%}
                    .input-holder .form-control{width: 100%; font-size: 14px; min-height: 40px; border-radius: 50px; background: #efefef; border: 1px solid #ccc}
                    .send-message-button{--size: 40px; background: var(--primary-color); color: white; align-items: center; padding-bottom: 4px;}  
                }
                .bottom-tabs-nav-holder{padding: 10px; background: #E5E3EE;}
                .bottom-tabs-nav{
                    position: relative; z-index: 9;  display: grid; grid-template-columns: 1fr 1fr 1fr; grid-gap: 10px;

                    .nav-item .nav-link{color: var(--primary-color); border-radius: 10px ; text-align: center; background: white; font-size: 14px; font-weight: 700}
                    .nav-item .nav-link.active{background: #9b3439; color: white; width: 100%}
                }
			}
		
		}
        .chat-support-button{
            --size: 60px; height: var(--size); width: var(--size); border-radius: var(--size); background: var(--primary-color); box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2); color: white; cursor: pointer;
            .arrow-holder{position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); border-radius: 50px; padding: 11px;}
        }
    }   
    
`;

function SupportChatModule() {
    const chatModulePopup = () => {
        const chatModule = document.querySelector('.chat-support-module');

        chatModule.classList.toggle('active')
    }

    const defaultQuestions = document.querySelectorAll('.chat-items-holder.default-questions .item');
    const defaultQAnswers = document.querySelectorAll('.chat-items-holder.default-q-answers ');
    let defaultQAnswerItem = null;
    defaultQAnswers.forEach(element => {
        defaultQAnswerItem = element
    });
    defaultQuestions.forEach(element => {
        element.addEventListener('click', function(){
            document.querySelector('.default-questions-holder').style.display = 'none';
            document.querySelector('.default-q-answers-holder').style.display = 'block';
            defaultQAnswerItem.innerHTML += `
            <div class='item'>Answer Should Be here</div>
            `;
        });
    });
    const closeQ_AnswersSc = () =>{
        document.querySelector('.default-questions-holder').style.display = 'block';
        document.querySelector('.default-q-answers-holder').style.display = 'none';
    };
    document.querySelectorAll('.chat-support-module .bottom-tabs-nav-holder .bottom-tabs-nav').forEach(navItem => {
        navItem.addEventListener('click', function() {
            setTimeout(() => {
                let hasActiveQuestionScreen = false;
    
                document.querySelectorAll('.chat-module-body .tab-pane').forEach(element => {
                    if (element.classList.contains('default-questions-screen') && element.classList.contains('active')) {
                        hasActiveQuestionScreen = true;
                    }
                });
    
                if (hasActiveQuestionScreen) {
                    document.querySelector('.chat-support').classList.add('questions-screen-active');
                } else {
                    document.querySelector('.chat-support').classList.remove('questions-screen-active');
                }
            }, 100);
        });
    });
    
    
    
  return (
    <StyledCom className='chat-support-module active'>
        <div className='chat-support questions-screen-active'>
            <div className='h-list support-header'>
                <span>Let's Chat</span>
                <div className="icon-rounded" onClick={chatModulePopup}>
                    X
                </div>
            </div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Tab.Content className='chat-module-body'>
                    <Tab.Pane eventKey="first" className='default-questions-screen'>
                        <div className='default-questions-holder'>
                            <div className='chat-items-holder default-questions'>
                                <div className='item left'>Lorem Ipsum is simply dummy text of the printing and typesetting industry?</div>
                                <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                            </div>
                        </div>
                        <div className='default-q-answers-holder'>
                            <div className='icon-rounded default-q-answers-back' onClick={closeQ_AnswersSc}>
                                <ReactSVG src='./images/back-arrow.svg' />
                            </div>
                            <div className='chat-items-holder default-q-answers'>
                                <div className='item'>Lorem Ipsum is simply dummy text of the printing and typesetting industry?</div>
                            </div>
                        </div>
                        <div className='support-button'>Support?</div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second" className=''>
                    <div className='chat-items-holder '>
                            <div className='item'>item 1</div>
                            <div className='item left'>item 2</div>
                            <div className='item'>item 3</div>
                            <div className='item'>item 3</div>
                            <div className='item left'>item 3</div>
                            <div className='item'>item 3</div>
                        </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third" className=''>
                        <div className='chat-items-holder '>
                            <div className='item'>item 1</div>
                            <div className='item left'>item 2</div>
                            <div className='item'>item 3</div>
                            <div className='item'>item 3</div>
                            <div className='item'>item 3</div>
                            <div className='item'>item 3</div>
                            <div className='item'>item 3</div>
                            <div className='item'>item 3</div>
                            <div className='item'>item 3</div>
                            <div className='item'>item 3</div>
                            <div className='item'>item 3</div>
                            <div className='item'>item 3</div>
                            <div className='item'>item 3</div>
                            <div className='item'>item 3</div>
                            <div className='item'>item 3</div>
                            <div className='item'>item 3</div>
                            <div className='item'>item 3</div>
                            <div className='item'>item 3</div>
                            <div className='item'>item 3</div>
                            <div className='item'>item 3</div>
                            <div className='item'>item 3</div>
                        </div>
                    </Tab.Pane>
                </Tab.Content>
                <div className='h-list write-message' data-gap="10">
                    <div className="input-holder">
                        <input type="text" placeholder='Write...' className="form-control" />
                    </div>
                    <div className='h-list icon-rounded send-message-button'>
                        <ReactSVG src='./images/send-icon.svg' /> 
                    </div>
                </div>
                <div className='bottom-tabs-nav-holder'>
                    <Nav className='h-list items-holder bottom-tabs-nav'>
                        <Nav.Item>
                            <Nav.Link eventKey="first">Tab 1</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">Tab 2</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="third">Tab 3</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
            </Tab.Container>
        </div>
    </StyledCom>
  )
}

export default SupportChatModule;