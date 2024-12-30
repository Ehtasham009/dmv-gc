import React, {useEffect, useState} from 'react';
import { useMyContext } from './context';

import styled from 'styled-components';
import { ReactSVG } from 'react-svg';


const StyledCom = styled.div`
    position: absolute; bottom: 70px; right: 0; background-color: white; border-radius: 10px; overflow: hidden; width: 350px; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3); transition: 0.4s all ; opacity: 0; pointer-events: none;

    &.active{opacity: 1; pointer-events: initial}
    
    .chat-support{
        .support-header{justify-content: space-between; gap: 20px; background-color: var(--primary-color); color: white; padding: 5px 10px; font-weight: 700}
    
        .chat-module-body{
            background: white;  
            

            &::before{content:""; background: url('./images/chat-module-bg.svg'); height: 100%; width: 100%; background-repeat: repeat; position: absolute; opacity: 0.07; pointer-events: none}
            .chat-items-holder{
                display: flex; flex-direction: column-reverse; gap: 5px; position: relative; z-index: 9; justify-items: flex-end; height: 100%; overflow-y: auto; padding: 10px;

                

                .item{background: var(--primary-color); border-radius: 15px 15px 0 15px; padding: 5px 15px; display: flex; align-self: flex-end; color: white; font-size: 14px}
                .item.left{border-radius: 15px 15px 15px 0px; align-self: flex-start; background: #E5E3EE; color: #1d1d1d}
            }
            .chat-module-screen{
                height: 350px; position: relative;

                .scrollable{height: 100%}
                &.default-questions-screen{
                    .scrollable{height: calc(100% - 41px);}
                    .scrollable.default-q-answers-holder{padding-top: 45px}

                    .support-button-holder{justify-content: center; padding: 10px 15px; }
                    .support-button{text-align: right; color: var(--primary-color); font-weight: 700; font-size: 16px; cursor: pointer; text-decoration: underline}
                    .default-q-answers-holder{position: relative}
                    .default-questions-holder .chat-items-holder .item{cursor: pointer}
                }
                &.choose-chat{
                    .buttons-holder{display: flex; flex-direction: column; justify-content: center; height: 100%; padding: 40px 40px 10px; gap: 20px}
                }
                &.ai-chat, &.live-chat{
                    .scrollable{height: calc(100% - 61px); padding-top: 45px}
                }
                &.live-chat{
                    .form-holder{display: grid; align-content: center; height: 100%; padding: 10px 20px; grid-gap: 10px}
                    .form-control{border: 1px solid #ccc; height: 40px}
                }
            } 
            .back-button{--size: 30px ; color: #fff; padding-right: 4px; padding-bottom: 4px; background: var(--primary-color); position: absolute; top: 10px; left: 10px; z-index: 15}
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
    
`;

function SupportChatModule() {

    const [showScreen, setShowScreen] = useState('QuestionsAnsScreen');
    const [chatScreen, setChatScreen] = useState('questionsScreen');
    const [answers, setAnswers] = useState([]);

    const chatModulePopupClose = () => {
        const chatModule = document.querySelector('.chat-support-module');

        chatModule.classList.remove('active')
    }

    useEffect(() => {
        const handleClick = () => {
            setChatScreen('answersScreen');
            setAnswers(prevAnswers => [
                ...prevAnswers, 
                'Answer Should Be here'
            ]);
        };

        const defaultQuestions = document.querySelectorAll('.default-questions-screen .chat-items-holder .item');
        defaultQuestions.forEach(element => {
            element.addEventListener('click', handleClick);
        });

        // Cleanup function to remove event listeners
        return () => {
            defaultQuestions.forEach(element => {
                element.removeEventListener('click', handleClick);
            });
        };
    }, [chatScreen, answers]);


    
  return (
    <StyledCom className='chat-support-module '>
        <div className='chat-support questions-screen-active'>
            <div className='h-list support-header'>
                <span>Let's Chat</span>
                <div className="icon-rounded" onClick={chatModulePopupClose}>
                    X
                </div>
            </div>
            <div className='chat-module-body'>
                {showScreen == 'QuestionsAnsScreen'  ? 
                    <div className='chat-module-screen default-questions-screen'>
                        {chatScreen == 'questionsScreen' ? 
                            <div className='scrollable default-questions-holder'>
                                <div className='chat-items-holder '>
                                    <div className='item left'>Lorem Ipsum is simply dummy text of the printing and typesetting industry?</div>
                                    <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                                    <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                                    <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                                    <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                                    <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                                    <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                                    <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                                    <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                                </div>
                            </div>
                            :null
                        }
                        {chatScreen == 'answersScreen' ? 
                            <div className='scrollable default-q-answers-holder'>
                                <div className='icon-rounded back-button default-q-answers-back' onClick={() => setChatScreen('questionsScreen')}>
                                    <ReactSVG src='./images/back-arrow.svg' />
                                </div>
                                <div className='chat-items-holder default-q-answers'>
                                    {answers.map((answer, index) => (
                                        <div key={index} className='item'>{answer}</div>
                                    ))}
                                </div>
                            </div>
                            :null
                        }
                        <div className='h-list support-button-holder' data-gap="5">
                            <span>Live Chat With Us </span>
                            <div className='support-button' onClick={() => setShowScreen('chooseChat')}>Chat...</div>
                        </div>
                    </div>
                    : null
                }
                {showScreen == 'chooseChat'  ? 
                    <div className='chat-module-screen choose-chat'>
                        <div className='scrollable'>
                            <div className='icon-rounded back-button' onClick={() => setShowScreen('QuestionsAnsScreen')}>
                                <ReactSVG src='./images/back-arrow.svg' />
                            </div>
                            <div className='buttons-holder'>
                                <button className='btn button-primary btn-c-rounded' onClick={() => setShowScreen('aiChat')}>Chat With AI</button>
                                <button className='btn button-primary btn-c-rounded' onClick={() => setShowScreen('liveChatLogin')}>Customer Support</button>
                            </div>
                        </div>
                    </div>
                    : null
                }
                {showScreen == 'aiChat'  ? 
                    <div className='chat-module-screen ai-chat'>
                        <div className='scrollable'>
                            <div className='icon-rounded back-button ' onClick={() => setShowScreen('chooseChat')}>
                                <ReactSVG src='./images/back-arrow.svg' />
                            </div>
                            <div className='chat-items-holder'>
                                <div className='item left'>Lorem Ipsum is simply dummy text of the printing and typesetting industry?</div>
                                <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                                <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                                <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                                <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                                <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                                <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                                <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                                <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                                <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                                <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                                <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                                <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                                <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                            </div>
                        </div>
                        <div className='h-list write-message' data-gap="10">
                            <div className="input-holder">
                                <input type="text" placeholder='Write...' className="form-control" />
                            </div>
                            <div className='h-list icon-rounded send-message-button'>
                                <ReactSVG src='./images/send-icon.svg' /> 
                            </div>
                        </div>
                    </div>
                    : null
                }
                {showScreen == 'liveChatLogin'  ? 
                    <div className='chat-module-screen live-chat'>
                        <div className='scrollable'>
                            <div className='icon-rounded back-button' onClick={() => setShowScreen('chooseChat')}>
                                <ReactSVG src='./images/back-arrow.svg' />
                            </div>
                            <div className='form-holder'>
                                <div className='fr-fr' data-gap="5">
                                    <div className="input-holder">
                                        <input className='form-control' type="text" placeholder='First Name' />
                                    </div>
                                    <div className="input-holder">
                                        <input className='form-control' type="text" placeholder='Last Name' />
                                    </div>
                                </div>
                                <div className="input-holder">
                                    <input className='form-control' type="text" placeholder='Phone Number' />
                                </div>
                                <div className="input-holder">
                                    <input className='form-control' type="text" placeholder='Email Adress' />
                                </div>
                                <button className='btn button-primary btn-c-rounded' onClick={() => setShowScreen('liveChat')}>Continue</button>
                            </div>
                        </div>
                        <div className='h-list write-message' data-gap="10">
                            <div className="input-holder">
                                <input type="text" placeholder='Write...' className="form-control" />
                            </div>
                            <div className='h-list icon-rounded send-message-button'>
                                <ReactSVG src='./images/send-icon.svg' /> 
                            </div>
                        </div>
                    </div>
                : null
                }
                {showScreen == 'liveChat'  ? 
                    <div className='chat-module-screen live-chat'>
                        <div className='scrollable'>
                            <div className='icon-rounded back-button' onClick={() => setShowScreen('chooseChat')}>
                                <ReactSVG src='./images/back-arrow.svg' />
                            </div>
                            <div className='chat-items-holder'>
                                <div className='item left'>Lorem Ipsum is simply dummy text of the printing and typesetting industry?</div>
                                <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                                <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                                <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                                <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                                <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                                <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                                <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                                <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                                <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                                <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                                <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                                <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                                <div className='item left'>Lorem Ipsum is simply dummy text of the printing?</div>
                            </div>
                        </div>
                        <div className='h-list write-message' data-gap="10">
                            <div className="input-holder">
                                <input type="text" placeholder='Write...' className="form-control" />
                            </div>
                            <div className='h-list icon-rounded send-message-button'>
                                <ReactSVG src='./images/send-icon.svg' /> 
                            </div>
                        </div>
                    </div>
                : null
                }
            </div>
            
        </div>
    </StyledCom>
  )
}

export default SupportChatModule;